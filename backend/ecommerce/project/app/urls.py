from app import views
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('',views.getRoutes,name="getRoutes"),
    path('products/',views.getProducts,name="getProducts"),
    path('products/<int:pk>/',views.getproduct,name="getproduct"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='registerUser'),
    path('add/',views.addorderitems,name='orders-add'),
    path('orders/',views.getOrders,name='orders-get'),
    path('orders/myorders/',views.getmyOrders,name='myorders-get'),
    path('orders/<str:pk>/',views.getOrder,name='order-get'),
    path('orders/<str:pk>/pay/',views.updateOrderToPaid,name='order-pay'),
    path('orders/<str:pk>/deliver/',views.updateOrderToDelivered,name='order-deliver'),
    path('create/',views.createProduct,name="product-create"),
    path('upload/',views.uploadImage,name="image-upload"),
    path('top/',views.getTopProducts,name="product-top"),
    

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)