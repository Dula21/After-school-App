let webstore = new Vue({
    el: '#app',
    data: {
        sitename: "After School Program",
        showLessons: true,
        lessons: lessons,
        cart: [],
        order: {
            firstName: '',
            lastName: '',
            address: ''
        }
    },
    methods: {
        addToCart(lesson) {
            if (lesson.availableInventory > this.cartCount(lesson.id)) {
                this.cart.push(lesson.id);
            }
        },
        cartCount(id) {
            return this.cart.filter(itemId => itemId === id).length;
        },
        canAddToCart(lesson) {
            return lesson.availableInventory > this.cartCount(lesson.id);
        },
        toggleCheckout() {
            this.showLessons = !this.showLessons;
        },
        submitOrder() {
            if (this.order.firstName && this.order.lastName && this.order.address) {
                alert("Order submitted successfully!");
                this.cart = [];
                this.order = { firstName: '', lastName: '', address: '' };
                this.showLessons = true;
            } else {
                alert("Please complete the form.");
            }
        }
    },
    computed: {
        cartItemCount() {
            return this.cart.length || "";
        },
        sortedLessons() {
            return this.lessons.sort((a, b) => a.price - b.price);
        }
    }
});
