new Vue({
    el: '#app',
    data() {
        return {
            sitename: 'After School App',
            showLessons: true,
            lessons: lessons, // Use the lessons array from lessons.js
            order: {
                firstName: '',
                lastName: '',
                address: '',
                city: '',
                zip: '',
                state: '',
                type: '' // New property for order type
            },
            cart: [], // Array to hold cart items
            sortOption: 'title', // New property for sorting
            searchQuery: '', // New property for search query
            states: [ // List of states for dropdown
                'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
                'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
                'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
                'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
                'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
                'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
                'West Virginia', 'Wisconsin', 'Wyoming'
            ]
        };
    },
    computed: {
        cartItemCount() {
            return this.cart.reduce((total, item) => total + item.quantity, 0);
        },
        filteredLessons() {
            if (!this.searchQuery) {
                return this.sortedLessons; // Return all lessons if no search query
            }
            const query = this.searchQuery.toLowerCase();
            return this.sortedLessons.filter(lesson => {
                return (
                    lesson.title.toLowerCase().includes(query) ||
                    lesson.description.toLowerCase().includes(query)
                );
            });
        },
        sortedLessons() {
            const sorted = [...this.lessons]; // Create a copy of the lessons array
            if (this.sortOption === 'price') {
                return sorted.sort((a, b) => a.price - b.price); // Sort by price ascending
            } else if (this.sortOption === 'title') {
                return sorted.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title
            }
            return sorted; // Default return
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
                this.cart.push({ ...lesson, quantity: 1 });
            }
        },
        canAddToCart(lesson) {
            return lesson.availableInventory > this.cartCount(lesson.id);
        },
        submitOrder() {
            // Check if any of the fields are empty
            if (!this.order.firstName || !this.order.lastName || !this.order.address || 
                !this.order.city || !this.order.zip || !this.order.state || !this.order.type) {
                alert("Please fill out all fields before submitting the order.");
                return; // Exit the method if validation fails
            }
            
            // Logic to submit the order
            console.log('Order submitted:', this.order);
            
            // Show an alert with the order details
            alert(`Order submitted!\nName: ${this.order.firstName} ${this.order.lastName}\nAddress: ${this.order.address}\nCity: ${this.order.city}\nZip: ${this.order.zip}\nState: ${this.order.state}\nType: ${this.order.type}`);
            
            // Clear the order fields
            this.order.firstName = '';
            this.order.lastName = '';
            this.order.address = '';
            this.order.city = '';
            this.order.zip = '';
            this.order.state = '';
            this.order.type = ''; // Reset the type
            
            // Optionally, toggle back to show lessons
            this.showLessons = true; // Go back to showing lessons after placing an order
        },
        cartCount(lessonId) {
            const item = this.cart.find(item => item.id === lessonId);
            return item ? item.quantity : 0;
        },
        setSortOption(option) {
            this.sortOption = option; // Method to set sorting option
        }
    }
});