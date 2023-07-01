from django.urls import path
from core.views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', index),
    path('nosotros/', about),
    path('galeria/', gallery, name="galeria"),
    path('registrarse/', signup),
    path('mascota/', formascota),
    path('login/', login),
    path('post/register/', registrar_usuario),
    path('post/logout/', logout),
    path('perfil/<id>/', perfil, name="perfil"),
    path('modificar-perfil/<id>/',perfil_mod, name="perfil_mod"),
    path('comprar/', generar_boleta),
    path('seguimiento/', seguimiento),
    path('boleta/', boletin),
    path('get/boleta/<id>/', get_boleta),
    path('get/descuento/<str>/', get_descuento),
    path('get/compras/<id>/', get_compra),
    path('post/next_status/<id>/', post_next_status),
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)