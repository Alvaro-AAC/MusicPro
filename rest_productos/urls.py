from django.urls import path
from rest_productos.views import *


urlpatterns = [
    path('lista-productos', lista_productos, name="lista_productos"),
    path('detalles-productos/<id>', detalles_productos, name="detalles_productos"),
]