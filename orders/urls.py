from django.urls import path
from . import views

urlpatterns = [
    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),
    path('toggle-wishlist/', views.toggle_wishlist, name='toggle_wishlist'),
]
