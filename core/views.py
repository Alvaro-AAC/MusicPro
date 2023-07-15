from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.forms.models import model_to_dict
from django.contrib.auth.hashers import check_password, identify_hasher
from django.contrib.auth.decorators import login_required
from .models import *
from .forms import *
from carrito.carro import Carro
import json
import requests
from transbank.webpay.webpay_plus.transaction import Transaction

# Create your views here.

def index(request):
    ctx = {}
    user = None
    try:
        usuario = request.session['usuario']
        ctx['is_loged'] = True
    except KeyError:
        ctx['is_loged'] = False
    if ctx['is_loged']:
        checker = Usuario.objects.filter(rut = usuario['rut'], email = usuario['email']).exists()
        ctx['is_loged'] = False
        if checker:
            user = Usuario.objects.get(rut = usuario['rut'])
            ctx['is_loged'] = True
    ctx['user'] = user
    return render(request, 'index.html', ctx)

    
def about(request):
    ctx = {}
    user = None
    try:
        usuario = request.session['usuario']
        ctx['is_loged'] = True
    except KeyError:
        ctx['is_loged'] = False
    if ctx['is_loged']:
        checker = Usuario.objects.filter(rut = usuario['rut'], email = usuario['email']).exists()
        ctx['is_loged'] = False
        if checker:
            user = Usuario.objects.get(rut = usuario['rut'])
            ctx['is_loged'] = True
    ctx['user'] = user
    return render(request, 'about.html', ctx)
    
def gallery(request):
    productos = Producto.objects.all().order_by('pk')
    ctx = {}
    user = None
    is_uno = 'uno' in request.GET
    is_dos = 'dos' in request.GET
    is_tres = 'tres' in request.GET
    try:
        usuario = request.session['usuario']
        ctx['is_loged'] = True
    except KeyError:
        ctx['is_loged'] = False
    if ctx['is_loged']:
        checker = Usuario.objects.filter(rut = usuario['rut'], email = usuario['email']).exists()
        ctx['is_loged'] = False
        if checker:
            user = Usuario.objects.get(rut = usuario['rut'])
            ctx['is_loged'] = True
    ctx['user'] = user
    try:
        if is_uno:
            productos = productos.filter(macro = Macro_Categoria.objects.get(descripcion = request.GET['uno']))
            if is_dos:
                productos = productos.filter(mid = Mid_Categoria.objects.get(descripcion = request.GET['dos']))
                if is_tres:
                    productos = productos.filter(micro = Micro_Categoria.objects.get(descripcion = request.GET['tres']))
    except:
        productos = []
    ctx['productos'] = productos

    # data = requests.get('http://data.fixer.io/api/latest?access_key=551171b4decc4dc37811626c096d714b')
    # json_resp = data.json()

    with open('currencies.json') as obj:
        json_resp = json.load(obj)

    all_currencies = dict(json_resp['rates'])

    clp_val = all_currencies['CLP']

    converted_currencies = {}

    for key, value in all_currencies.items():
        converted_currencies[key] = value/clp_val
    ctx['currencies'] = converted_currencies
    if 'currency' in request.GET:
        currency = request.GET['currency']
    else:
        currency = 'CLP'

    ctx['currency'] = 'CLP'
    try:
        ctx['valor'] = converted_currencies[currency]
        ctx['currency'] = currency
        for prod in ctx['productos']:
            prod.precio = prod.precio*converted_currencies[currency]
    except KeyError:
        ...
    return render(request, 'gallery.html', ctx) 

    
def signup(request):
    ctx = {}
    user = None
    try:
        usuario = request.session['usuario']
        ctx['is_loged'] = True
    except KeyError:
        ctx['is_loged'] = False
    if ctx['is_loged']:
        checker = Usuario.objects.filter(rut = usuario['rut'], email = usuario['email']).exists()
        ctx['is_loged'] = False
        if checker:
            user = Usuario.objects.get(rut = usuario['rut'])
            ctx['is_loged'] = True
    ctx['user'] = user
    if not ctx['is_loged']:
        return render(request, 'signup.html', ctx)
    else:
        return HttpResponseRedirect('/')


def formascota(request):
    ctx = {}
    user = None
    try:
        usuario = request.session['usuario']
        ctx['is_loged'] = True
    except KeyError:
        ctx['is_loged'] = False
    if ctx['is_loged']:
        checker = Usuario.objects.filter(rut = usuario['rut'], email = usuario['email']).exists()
        ctx['is_loged'] = False
        if checker:
            user = Usuario.objects.get(rut = usuario['rut'])
            ctx['is_loged'] = True
    ctx['user'] = user
    return render(request, 'formascota.html', ctx)

    
def login(request):
    ctx = {}
    if request.method == 'GET':
        ctx['error'] = False
        user = None
        try:
            usuario = request.session['usuario']
            ctx['is_loged'] = True
        except KeyError:
            ctx['is_loged'] = False
        if ctx['is_loged']:
            checker = Usuario.objects.filter(rut = usuario['rut'], email = usuario['email']).exists()
            ctx['is_loged'] = False
            if checker:
                user = Usuario.objects.get(rut = usuario['rut'])
                ctx['is_loged'] = True
        ctx['user'] = user
        return render(request, 'login.html', ctx)
    elif request.method == 'POST':
        ctx['error'] = False
        email = request.POST.get('email')
        password = request.POST.get('password')
        print(email, password)
        print(Usuario.objects.filter(email = email).exists())
        if Usuario.objects.filter(email = email).exists():
            with Usuario.objects.get(email = email) as user:
                if check_password(password, user.password):
                    request.session['usuario'] = model_to_dict(user)
                    return HttpResponseRedirect('/')
                else:
                    ctx['error'] = True
                    return render(request, 'login.html', ctx)
        else:
            ctx['error'] = True
            return render(request, 'login.html', ctx)

def registrar_usuario(request):
    ctx = {}
    user = None
    try:
        usuario = request.session['usuario']
        ctx['is_loged'] = True
    except KeyError:
        ctx['is_loged'] = False
    if ctx['is_loged']:
        checker = Usuario.objects.filter(rut = usuario['rut'], email = usuario['email']).exists()
        ctx['is_loged'] = False
        if checker:
            user = Usuario.objects.get(rut = usuario['rut'])
            ctx['is_loged'] = True
    ctx['user'] = user
    if request.method == 'POST':
        try:
            print(request.POST)
            cleaned_data = {}
            data = dict(request.POST)
            cleaned_data['rut'] = int(data['id'][0][:-2])
            cleaned_data['dv'] = data['id'][0][-1]
            cleaned_data['email'] = data['mail'][0]
            cleaned_data['password'] = data['pwd'][0]
            cleaned_data['nombre'] = data['nombre'][0]
            cleaned_data['apellido'] = data['apellido'][0]
            cleaned_data['edad'] = data['edad'][0]
            if data['tel'][0] == '' or data['tel'][0] == ' ':
                cleaned_data['tel'] = None
            elif data['tel']:
                cleaned_data['tel'] = int(data['tel'][0])
            else:
                cleaned_data['tel'] = None
            cleaned_data['ciudad'] = Ciudad.objects.get(id_ciudad = int(data['ciudad'][0]))
            cleaned_data['direccion_calle'] = data['direccion'][0]
            cleaned_data['direccion_numero'] = int(data['numeracion'][0])
            cleaned_data['suscripcion'] = True if 'donacion' in request.POST else False
            user = Usuario(**cleaned_data)
            if not (Usuario.objects.filter(email = user.email).exists() or Usuario.objects.filter(rut = user.rut).exists()):
                user.save()
            else:
                raise Exception('ORA-00001')
            request.session['usuario'] = model_to_dict(user)
            response = JsonResponse({'sucess': 'Subido correctamente'})
            response.status_code = 200
            return response
        except Exception as e:
            print(str(e))
            if('ORA-00001' in str(e)):
                response = JsonResponse({'error': 'Rut o correo ya registrado'})
                response.status_code = 403
                return response
            else:
                response = JsonResponse({'error': 'Error inesperado'})
                response.status_code = 403
                return response
    else:
        response = JsonResponse({'error': 'Metodo incorrecto'})
        response.status_code = 403
        return response

def logout(request):
    if request.method == 'POST':
        request.session.flush()
        response = JsonResponse({'success': 'Deslogeado correctamente'})
        return response
    else:
        response = JsonResponse({'error': 'Metodo incorrecto'})
        response.status_code = 403
        return response

def perfil_mod(request, id):
    data = {}
    user = None
    try:
        usuario = request.session['usuario']
        data['is_loged'] = True
    except KeyError:
        data['is_loged'] = False
    if data['is_loged']:
        checker = Usuario.objects.filter(rut = usuario['rut'], email = usuario['email']).exists()
        data['is_loged'] = False
        if checker:
            user = Usuario.objects.get(rut = usuario['rut'])
            data['is_loged'] = True
    data['user'] = user
    try:
        u_rut = Usuario.objects.get(rut = id)
    except Usuario.DoesNotExist:
        return HttpResponseRedirect('/login/')
    try:
        s = request.session['usuario'].copy()
    except KeyError:
        return HttpResponseRedirect('/login/')
    s['ciudad'] = Ciudad.objects.get(id_ciudad = s['ciudad'])
    if u_rut == Usuario(**s):
        data['form'] = Mod_perfil_form(instance = u_rut)
        data['rut'] = u_rut
        if request.method=='POST':
            formulario = Mod_perfil_form(data=request.POST,instance = u_rut)
            if formulario.is_valid():
                formulario.save()
                data['form'] = formulario
                request.session['usuario'] = model_to_dict(Usuario.objects.get(rut = u_rut.rut))
                return HttpResponseRedirect('/perfil/{}/'.format(u_rut.rut))
        return render(request,'perfil_mod.html',data)
    else:
        return HttpResponseRedirect('/login/')


def perfil(request, id):
    ctx = {}
    user = None
    try:
        usuario = request.session['usuario']
        ctx['is_loged'] = True
    except KeyError:
        ctx['is_loged'] = False
    if ctx['is_loged']:
        checker = Usuario.objects.filter(rut = usuario['rut'], email = usuario['email']).exists()
        ctx['is_loged'] = False
        if checker:
            user = Usuario.objects.get(rut = usuario['rut'])
            ctx['is_loged'] = True
    ctx['user'] = user
    try:
        u_rut = Usuario.objects.get(rut = id)
        s = request.session['usuario'].copy()
    except (Usuario.DoesNotExist, KeyError):
        return HttpResponseRedirect('/login/')
    s['ciudad'] = Ciudad.objects.get(id_ciudad = s['ciudad'])
    if u_rut == Usuario(**s):
        ctx['datos'] = Perfil_form(instance = u_rut)
        ctx['user'] = u_rut
        ctx['boletas'] = list(set([elem.id_boleta for elem in detalle_boleta.objects.filter(id_usuario = u_rut).all()]))
        if request.method == 'GET':
            return render(request,'perfil.html',ctx)
        elif request.method == 'POST':
            post = request.POST
            u_rut.password = post['changePassword']
            u_rut.save()
            request.session['usuario'] = model_to_dict(Usuario.objects.get(rut = u_rut.rut))
            return render(request, 'perfil.html', ctx)
    else:
        return HttpResponseRedirect('/login/')

def producto(request):
    productos = Producto.objects.all()

    ctx = {
        'productos':productos,
    }
    return render(request, ctx)

def generar_boleta(request):
    resp = (Transaction()).commit(token=request.GET.get('token_ws'))
    print(resp)
    if 'TBK_TOKEN' in request.GET:
        return HttpResponseRedirect('/galeria')
    ctx = {}
    user = None
    try:
        usuario = request.session['usuario']
        ctx['is_loged'] = True
    except KeyError:
        ctx['is_loged'] = False
    if ctx['is_loged']:
        checker = Usuario.objects.filter(rut = usuario['rut'], email = usuario['email']).exists()
        ctx['is_loged'] = False
        if checker:
            user = Usuario.objects.get(rut = usuario['rut'])
            ctx['is_loged'] = True
    ctx['user'] = user
    if ctx['is_loged']:
        precio_total = sum([int(j['precio']) for i, j in request.session['carro'].items()])
        descount = 5 if request.session['usuario']['suscripcion'] else 0
        descount = request.session['descount'] if 'descount' in request.session else 0
        descuento = int(precio_total*(descount/100))
        request.session['descuento'] = descuento
        precio_total = precio_total - descuento
        boleta = Boleta(total = precio_total)
        boleta.save()
        productos = []
        for key, value in request.session['carro'].items():
            producto = Producto.objects.get(id_producto = value['producto_id'])
            cant = value['cantidad']
            producto.stock -= cant
            subtotal = cant * int(value['precioU'])
            detalle = detalle_boleta(id_usuario = user, id_boleta = boleta, id_producto = producto, cantidad = cant, subtotal = subtotal)
            producto.save()
            detalle.save()
            productos.append(model_to_dict(detalle))
        carro = Carro(request)
        carro.limpiar_carro()
        request.session['boleta'] = boleta.id_boleta
        return HttpResponseRedirect('/boleta/')
    else:
        return HttpResponseRedirect('/')

def boletin(request):
    ctx = {}
    user = None
    try:
        usuario = request.session['usuario']
        ctx['is_loged'] = True
    except KeyError:
        ctx['is_loged'] = False
    if ctx['is_loged']:
        checker = Usuario.objects.filter(rut = usuario['rut'], email = usuario['email']).exists()
        ctx['is_loged'] = False
        if checker:
            user = Usuario.objects.get(rut = usuario['rut'])
            ctx['is_loged'] = True
    ctx['user'] = user
    if ctx['is_loged']:
        ctx['descount'] = request.session['descount']
        boleta = Boleta.objects.get(id_boleta = request.session['boleta'])
        ctx['boleta'] = boleta
        productos = detalle_boleta.objects.filter(id_boleta = boleta).all()
        ctx['productos'] = productos
        carro = Carro(request)
        carro.limpiar_carro()
        request.session['descount'] = 0
        return render(request, 'comprar.html', ctx)
    else:
        return HttpResponseRedirect('/')

def seguimiento(request):
    ctx = {}
    user = None
    try:
        usuario = request.session['usuario']
        ctx['is_loged'] = True
    except KeyError:
        ctx['is_loged'] = False
    if ctx['is_loged']:
        checker = Usuario.objects.filter(rut = usuario['rut'], email = usuario['email']).exists()
        ctx['is_loged'] = False
        if checker:
            user = Usuario.objects.get(rut = usuario['rut'])
            ctx['is_loged'] = True
    ctx['user'] = user
    if ctx['is_loged']:
        compras = detalle_boleta.objects.filter(id_usuario = user).all()
        ids = [int(elem.id_boleta.id_boleta) for elem in compras]
        boletas = {}
        for id in ids:
            boletas[id]= Boleta.objects.get(id_boleta = id)
        ctx['boletas'] = boletas
        return render(request, 'seguimiento.html', ctx)
    else:
        return render(request, 'seguimiento.html', ctx)

def get_boleta(request, id):
    boleta = Boleta.objects.get(id_boleta = id)
    compra = boleta.fecha_compra.strftime('%d/%m/%Y %H:%M')
    despacho = boleta.fecha_despacho.strftime('%d/%m/%Y %H:%M') if boleta.fecha_despacho else 'Aún no despachado'
    entrega = boleta.fecha_entrega.strftime('%d/%m/%Y %H:%M') if boleta.fecha_entrega else 'Aún no entregado'
    return JsonResponse({'estado': boleta.get_estado_display(), 
        'fecha': compra,
        'fecha_despacho': despacho,
        'fecha_entrega': entrega})

def get_descuento(request, str):
    if descuento.objects.filter(codigo = str).exists():
        sus = 5 if request.session['usuario']['suscripcion'] else 0
        descount = descuento.objects.get(codigo = str)
        request.session['descount'] = descount.porcentaje + sus
        porce = descount.porcentaje
    else:
        porce = 0
        request.session['descount'] = 0
    return JsonResponse({'porcentaje': porce})

def get_compra(request, id):
    boleta = Boleta.objects.get(id_boleta = id)
    boleta_dict = model_to_dict(boleta)
    compra = boleta.fecha_compra.strftime('%d/%m/%Y %H:%M')
    despacho = boleta.fecha_despacho.strftime('%d/%m/%Y %H:%M') if boleta.fecha_despacho else 'Aún no despachado'
    entrega = boleta.fecha_entrega.strftime('%d/%m/%Y %H:%M') if boleta.fecha_entrega else 'Aún no entregado'
    boleta_dict['estado'] = str(boleta.get_estado_display())
    boleta_dict['fecha_compra'] = compra
    boleta_dict['fecha_despacho'] = despacho
    boleta_dict['fecha_entrega'] = entrega
    detalles = detalle_boleta.objects.filter(id_boleta = boleta).all()
    detalles = list(detalles)
    detallec = [model_to_dict(elem) for elem in list(detalles)]
    for i, elem in enumerate(detallec):
        elem['id_producto'] = str(detalles[i-1].id_producto)
        elem['precioU'] = detalles[i-1].id_producto.precio
    return JsonResponse({'boleta': boleta_dict, 'detalles': detallec})

@login_required
def post_next_status(request, id):
    boleta = Boleta.objects.get(id_boleta = id)
    choices = [elem[0] for elem  in boleta.ESTADO_CHOICES]
    try:
        next = choices[choices.index(boleta.estado)+1]
        boleta.estado = next
        boleta.save()
    except IndexError:
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))