from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from .models import *

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ('rut_completo', 'email', 'nombre_completo', 'edad', 'tel',)
    search_fields = ('rut', 'nombre', 'apellido', 'email',)
    list_filter = ('edad',)

    @admin.display(description='rut')
    def rut_completo(self, obj):
        return ('%s-%s' % (obj.rut, obj.dv))

    @admin.display(description='nombre')
    def nombre_completo(self, obj):
        return ('%s %s' % (obj.nombre, obj.apellido))

class RegionAdmin(admin.ModelAdmin):
    list_display = ('id_region', 'descripcion',)
    search_fields = ('descripcion',)
    
    def get_ordering(self, request):
        return ['id_region']

class CiudadAdmin(admin.ModelAdmin):
    list_display = ('id_ciudad', 'region', 'descripcion',)
    search_fields = ('descripcion',)
    list_filter = ('id_region',)

    def get_ordering(self, request):
        return ['id_ciudad']

    @admin.display(description='region')
    def region(self, obj):
        return ('%s' % (obj.id_region))

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('id_producto', 'nombre')
    search_fields = ('id_producto',)

class BoletaAdmin(admin.ModelAdmin):
    list_display = ('id_boleta', 'total', 'estado', 'siguiente_estado')
    search_fields = ('id_boleta',)

    @admin.display(description='Siguiente estado')
    def siguiente_estado(self, obj):
        style = '''
        padding: 2px;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 0.25rem;
        background-color: #f0f0f0;
        border-color: grey;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        text-decoration: none;
        color: black;
        '''
        return format_html(f'<a href="/post/next_status/{obj.id_boleta}/" style="{style}">Siguiente estado</a>')

class DetalleBoletaAdmin(admin.ModelAdmin):
    list_display = ('id_detalle_boleta', 'cliente', 'boleta', 'id_producto', 'cantidad', 'subtotal', 'ir_boleta')
    search_fields = ('id_usuario', 'id_boleta')
    list_filter = ('id_usuario',)

    @admin.display(description='cliente')
    def cliente(self, obj):
        url = '?id_usuario__rut__exact=%s' % (obj.id_usuario.pk)
        return format_html(f'<a href="{url}">{obj.id_usuario}</a>')

    @admin.display(description='boleta')
    def boleta(self, obj):
        url = '?id_boleta__id_boleta__exact=%s' % (obj.id_boleta.pk)
        return format_html(f'<a href="{url}">{obj.id_boleta}</a>')
    
    @admin.display(description='Ir a boleta')
    def ir_boleta(self, obj):
        style = '''
        padding: 2px;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 0.25rem;
        background-color: #f0f0f0;
        border-color: grey;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        text-decoration: none;
        color: black;
        '''
        url = reverse('admin:%s_%s_change' % (obj.id_boleta._meta.app_label, obj.id_boleta._meta.model_name), args=[obj.id_boleta.pk])
        return format_html(f'<a href="{url}" style="{style}">Ver boleta</a>')

admin.site.register(Usuario, UserAdmin)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Boleta, BoletaAdmin)
admin.site.register(detalle_boleta, DetalleBoletaAdmin)
admin.site.register(descuento)
admin.site.register(Macro_Categoria)
admin.site.register(Mid_Categoria)
admin.site.register(Micro_Categoria)