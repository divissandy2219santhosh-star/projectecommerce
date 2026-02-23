from django.shortcuts import render
#from django.http import JsonResponse
#from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializer import ProductSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.hashers import make_password
from rest_framework import status
from .serializer import UserSerializer,UserSerializerWithToken
from django.contrib.auth.models import User




@api_view(['GET'])
def getRoutes(request):
   myapis=[
       {
           "products": "http://127.0.0.1:8000/api/products/",
           "product": "http://127.0.0.1:8000/api/products/1",
           "login": "http://127.0.0.1:8000/api/users/login/",
           "register": "http://127.0.0.1:8000/api/users/register/",
       }
   ]
   return Response(myapis)

@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getproduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)
#         data['username'] = self.user.username
#         data['email'] = self.user.email
#         return data
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializer(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.
#

@api_view(['POST'])
def registerUser(request):
    data = request.data
    
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

        
        print(orderItems)
        for i in orderitems:
            product=Product.objects.get(_id=i['product'])
            item=OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )
            product.countInStock-=item.qty
            product.save()
        serializer=OrderSerializer(order,many=False)
        return Response(serializer.data)
    
    
    
    
@api_view(['POST'])
def addorderitems(request):
    user=request.user
    data=request.data
    orderItems=data['orderItems']
    if orderItems and len(orderItems)==0:
        return Response({'detail':'No Order Items'},status=status.HTTP_400_BAD_REQUEST)
    else:
        order=Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )
        shipping=ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
        for i in orderItems:
            product=Product.objects.get(_id=i['product'])
            item=OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )
            product.countInStock-=item.qty
            product.save()
        
        
        
        
@api_view(['GET'])
def getOrders(request):
    orders=Order.objects.all()
    serializer=OrderSerializer(orders,many=True)
    return Response(serializer.data)
@api_view(['GET'])
def getmyOrders(request):
    user=request.user
    orders=user.order_set.all()    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user=request.user
    
    try:
        order=Order.objects.get(_id=pk)
        if user.order_set.filter(paid=True).exists():
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
    except:
        return Response({'detail':'Order does not exist'},status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user=request.user
    product=Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    data=request.data
    product=Product.objects.get(_id=pk)
    product.name=data['name']
    product.price=data['price']
    product.brand=data['brand']
    product.countInStock=data['countInStock']
    product.category=data['category']
    product.description=data['description']
    product.save()
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product=Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')

@api_view(['POST'])
def uploadImage(request):
    data=request.data
    product_id=data['product_id']
    product=Product.objects.get(_id=product_id)
    product.image=request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')


    
    
    
    