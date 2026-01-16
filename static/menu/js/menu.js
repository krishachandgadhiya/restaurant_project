// ===== CSRF TOKEN =====
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

document.addEventListener('DOMContentLoaded', function () {

    /* ===== ADD TO CART ===== */
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function () {

            fetch('/orders/add-to-cart/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    food_id: this.dataset.id
                })
            })
            .then(res => res.json())
            .then(() => {
                alert('Added to cart 🛒');
            });
        });
    });

    /* ===== WISHLIST ===== */
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function () {

            fetch('/orders/toggle-wishlist/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    food_id: this.dataset.id
                })
            })
            .then(res => res.json())
            .then(() => {
                this.classList.toggle('active');
            });
        });
    });

});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('.wishlist-icon');
            btn.classList.toggle('active');

            if (btn.classList.contains('active')) {
                icon.textContent = '♥';  // filled heart
            } else {
                icon.textContent = '♡';  // empty heart
            }

            // TODO: AJAX backend call
        });
    });
});
