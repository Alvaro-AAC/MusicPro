from django.contrib import admin
from django.urls import path, include
from viewflow.urls import DetailViewMixin, DeleteViewMixin, ModelViewset
from core.models import Boleta, Producto, detalle_boleta
from viewflow.contrib.auth import AuthViewset
from viewflow.urls import Application, Site, ModelViewset


site = Site(title="MusicPro - Vendedor", viewsets=[
    Application(
        title='Ventas',
        icon='receipt',
        app_name='Ventas',
        viewsets=[
            ModelViewset(model=Boleta)
        ]
    ),
    Application(
        title='Bodega',
        icon='inventory',
        app_name='Bodega',
        viewsets=[
            ModelViewset(model=Producto)
        ]
    ),
    Application(
        title='Desglose',
        icon='payment',
        app_name='Desglose',
        viewsets=[
            ModelViewset(model=detalle_boleta)
        ]
    )
])

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
    path('api/', include('rest_productos.urls')),
    path('carro/', include('carrito.urls')),
    path('administracion/', site.urls),
]