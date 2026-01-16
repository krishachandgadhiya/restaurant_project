from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from adminpanel.models import FoodItem
from .models import CartItem, WishlistItem


@login_required
def add_to_cart(request):
    food_id = request.POST.get('food_id')
    food = get_object_or_404(FoodItem, id=food_id)

    cart_item, created = CartItem.objects.get_or_create(
        user=request.user,
        food_item=food
    )

    if not created:
        cart_item.quantity += 1
        cart_item.save()

    return JsonResponse({'status': 'success'})

@login_required
def toggle_wishlist(request):
    food_id = request.POST.get('food_id')
    food = get_object_or_404(FoodItem, id=food_id)

    wishlist_item = WishlistItem.objects.filter(
        user=request.user,
        food_item=food
    )

    if wishlist_item.exists():
        wishlist_item.delete()
        return JsonResponse({'status': 'removed'})
    else:
        WishlistItem.objects.create(
            user=request.user,
            food_item=food
        )
        return JsonResponse({'status': 'added'})
