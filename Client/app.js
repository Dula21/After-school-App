new Vue({
    el: '#app',
    data: {
        sitename: 'After School App ',
        showLessons: true,
        lessons: lessons, // Use the lessons array from lessons.js
        order: {
            firstName: '',
            lastName: '',
            address: ''
        },
        cart: [] // Array to hold cart items
    },
    computed: {
        cartItemCount() {
            return this.cart.reduce((total, item) => total + item.quantity, 0);
        },
        sortedLessons() {
            return this.lessons.sort((a, b) => a.title.localeCompare(b.title));
        }
    },
    methods: {
        toggleCheckout() {
            this.showLessons = !this.showLessons;
        },
        addToCart(lesson) {
            const existingItem = this.cart.find(item => item.id === lesson.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.cart.push ({ ...lesson, quantity: 1 });
            }
        },
        canAddToCart(lesson) {
            return lesson.availableInventory > this.cartCount(lesson.id);
        },
        submitOrder() {
            // Check if any of the fields are empty
            if (!this.order.firstName || !this.order.lastName || !this.order.address) {
                alert("Please fill out all fields before submitting the order.");
                return; // Exit the method if validation fails
            }
            
            // Logic to submit the order
            console.log('Order submitted:', this.order);
            
            // Show an alert with the order details
            alert(`Order submitted!\nName: ${this.order.firstName} ${this.order.lastName}\nAddress: ${this.order.address}`);
            
            // Clear the order fields
            this.order.firstName = '';
            this.order.lastName = '';
            this.order.address = '';
            
            // Optionally, toggle back to show lessons
            this.showLessons = true; // Go back to showing lessons after placing an order
        },
        cartCount(lessonId) {
            const item = this.cart.find(item => item.id === lessonId);
            return item ? item.quantity : 0;
        }
    }
});