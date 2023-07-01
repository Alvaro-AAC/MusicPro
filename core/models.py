import datetime
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.contrib.auth.hashers import make_password, identify_hasher
import requests

# Create your models here.

class Region(models.Model):
    id_region = models.IntegerField(primary_key=True, null=False, blank=False)
    descripcion = models.CharField(max_length=120, null=False, blank=False)

    def __str__(self):
        return f'Region: {self.descripcion}'

    class Meta:
        verbose_name_plural = 'Regiones'

class Ciudad(models.Model):
    id_ciudad = models.IntegerField(primary_key=True, null=False, blank=False)
    id_region = models.ForeignKey('Region', on_delete=models.CASCADE, null=False, blank=False)
    descripcion = models.CharField(max_length=120, null=False, blank=False)

    def __str__(self):
        return f'Ciudad: {self.descripcion}'

    class Meta:
        verbose_name_plural = 'Ciudades'

    def __unicode__(self):
        return self.id_ciudad

class Usuario(models.Model):
    rut = models.IntegerField(primary_key=True, null=False, blank=False)
    dv = models.CharField(max_length=1, null=False, blank=False)
    email = models.CharField(max_length=200, null=False, blank=False, unique=True)
    password = models.CharField(max_length=800, null=False, blank=False)
    nombre = models.CharField(max_length=40, null=False, blank=False)
    apellido = models.CharField(max_length=40, null=False, blank=False)
    edad = models.IntegerField(null=False, blank=False)
    tel = models.IntegerField(null=True, blank=True)
    ciudad = models.ForeignKey('Ciudad', on_delete=models.CASCADE, null=False, blank=False)
    direccion_calle = models.CharField(max_length=100, null=False, blank=False)
    direccion_numero = models.IntegerField(null=False, blank=False)
    suscripcion = models.BooleanField(null=False, blank=False, default=False)

    class Meta:
        constraints = [
            models.CheckConstraint(check = models.Q(rut__range=(1000000, 40000000)), name='check_usuario_rut'),
            models.CheckConstraint(check = models.Q(dv__in='0123456789K'), name='check_usuario_dv'),
            models.CheckConstraint(check = models.Q(edad__gte=0), name='check_usuario_edad'),
        ]
    
    def save(self, *args, **kwargs):
        try:
            identify_hasher(self.password)
        except ValueError:
            self.password = make_password(self.password)
        super(Usuario, self).save(*args, **kwargs)

    def __str__(self):
        return f'Usuario: {self.rut}-{self.dv} -- {self.nombre}'

    def __enter__(self):
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        del self

class Macro_Categoria(models.Model):
    descripcion = models.CharField(null=False, blank=False, max_length=200)

    class Meta:
        verbose_name_plural = 'Macro categorias'

    def __str__(self):
        return self.descripcion
    
class Mid_Categoria(models.Model):
    descripcion = models.CharField(null=False, blank=False, max_length=200)
    macro_categoria = models.ForeignKey('Macro_Categoria', on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Mid categorias'

    def __str__(self):
        return self.descripcion
    
class Micro_Categoria(models.Model):
    descripcion = models.CharField(null=False, blank=False, max_length=200)
    mid_categoria = models.ForeignKey('Mid_Categoria', on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Micro categorias'

    def __str__(self):
        return self.descripcion

class Producto(models.Model):
    id_producto = models.BigAutoField(primary_key=True)
    nombre = models.CharField(null=False, blank=False, max_length=50)
    precio = models.PositiveIntegerField(null=False, blank=False, )
    desc = models.CharField(null=False, blank=False, max_length=130, verbose_name="Descripcion del producto")
    stock = models.PositiveIntegerField(null=False, blank=False, )
    extra_desc = models.CharField(null=True, blank=True, max_length=500)
    imagen = models.ImageField(upload_to="galeria",null=True,blank=True)
    macro = models.ForeignKey('Macro_Categoria', on_delete=models.CASCADE, blank=True, null=True)
    mid = models.ForeignKey('Mid_Categoria', on_delete=models.CASCADE, blank=True, null=True)
    micro = models.ForeignKey('Micro_Categoria', on_delete=models.CASCADE, blank=True, null=True)
    
    class Meta:
        verbose_name_plural = 'Productos'
    
    def __str__(self):
        return self.nombre

class Boleta(models.Model):
    ESTADO_CHOICES = [
        ('procesando', 'Procesando pedido'),
        ('preparando', 'Preparando pedido'),
        ('enviando', 'Enviando pedido'),
        ('camino', 'Pedido en camino'),
        ('recibido', 'Su pedido ha llegado al destino'),
    ]

    id_boleta = models.BigAutoField(primary_key=True)
    total = models.BigIntegerField()
    fecha_compra = models.DateTimeField(blank=False, null=False, default = datetime.datetime.now)
    fecha_despacho = models.DateTimeField(blank=True, null=True)
    fecha_entrega = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(choices=ESTADO_CHOICES, default='procesando', max_length=200)

    class Meta:
        constraints = [
            models.CheckConstraint(check = models.Q(total__gte=0), name='check_boleta_total'),
            models.CheckConstraint(check = models.Q(fecha_despacho__gte=models.F('fecha_compra')), name='check_boleta_fecha_despacho'),
            models.CheckConstraint(check = models.Q(fecha_entrega__gte=models.F('fecha_despacho')), name='check_boleta_fecha_entrega'),
        ]

    def __str__(self):
        return str(self.id_boleta)

class detalle_boleta(models.Model):
    id_detalle_boleta = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey('Usuario', on_delete=models.CASCADE)
    id_boleta = models.ForeignKey('Boleta', on_delete=models.CASCADE)
    id_producto = models.ForeignKey('Producto', on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    subtotal = models.BigIntegerField()

    class Meta:
        verbose_name_plural = 'Detalle Boletas'

    def __str__(self):
        return str(self.id_detalle_boleta)

class descuento(models.Model):
    codigo = models.CharField(unique=True, max_length=40)
    porcentaje = models.IntegerField()

    def __str__(self):
        return str(self.codigo)

def pre_save_entregar_pedido(sender, instance, **kwargs):
    if instance.estado == 'enviando':
        instance.fecha_despacho = datetime.datetime.now()
    if instance.estado == 'recibido' and instance.fecha_entrega is None:
        instance.fecha_entrega = datetime.datetime.now()
    elif instance.estado != 'recibido':
        instance.fecha_entrega = None

def post_save_fundacion(sender, instance, **kwargs):
    post_data = {'rut': instance.rut, 'dv': instance.dv, 'suscripcion': instance.suscripcion}
    response = requests.post('http://127.0.0.1:8000/fundacion/v1/insertar-dato/', data=post_data)
    if '<Response [415]>' in str(response):
        response = requests.put(f'http://127.0.0.1:8000/fundacion/v1/personas/{instance.rut}/', data=post_data)

post_save.connect(post_save_fundacion, sender = Usuario)
pre_save.connect(pre_save_entregar_pedido, sender = Boleta)