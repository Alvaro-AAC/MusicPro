from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from core.models import Producto
from core.views import producto
from .serializers import ProductoSerializer

# Create your views here.

@csrf_exempt
@api_view(['GET','POST'])
def lista_productos(request):
    """
    Lista de todos los productos
    """
    if request.method == 'GET':
        producto = Producto.objects.all()
        serializer = ProductoSerializer(producto, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT','DELETE'])
def detalles_productos(request,id):
    """
    Editar o borrar un producto
    """
    try:
        producto = Producto.objects.get(id_producto=id)
    except Producto.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ProductoSerializer(producto)
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = ProductoSerializer(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        producto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)