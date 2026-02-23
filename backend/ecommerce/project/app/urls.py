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
    path('orders/<str:pk>/',views.getOrderById,name='order-get'),
    path('orders/<str:pk>/pay/',views.updateOrderToPaid,name='order-pay'),
    path('orders/<str:pk>/deliver/',views.updateOrderToDelivered,name='order-deliver'),
    
    path('products/create/',views.createProduct,name="product-create"),
    path('products/upload/',views.uploadImage,name="image-upload"),
    path('products/top/',views.getTopProducts,name="product-top"),
    path('products/update/<str:pk>/',views.updateProduct,name="product-update"),
    path('products/delete/<str:pk>/',views.deleteProduct,name="product-delete"),
    
    path('contact/',views.contact,name="contact"),
    path('about/',views.about,name="about"),
    path('services/',views.services,name="services"),
    path('blog/',views.blog,name="blog"),

    path('users/profile/update/',views.updateUserProfile,name="user-profile-update"),
    path('users/',views.getUsers,name="users"),
    path('users/<str:pk>/',views.getUserById,name="user-get"),
    path('users/<str:pk>/update/',views.updateUser,name="user-update"),
    path('users/<str:pk>/delete/',views.deleteUser,name="user-delete"),
    
    
    

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)