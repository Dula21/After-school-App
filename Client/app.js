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
                    lesson.description.toLowerCase().includes(query)||
                    lesson.location.toLowerCase().includes(query)
                    
                    
                    
                );
            });
        },
        sortedLessons() {
            const sorted = [...this.lessons]; // Create a copy of the lessons array
            if (this.sortOption === 'price') {
                return sorted.sort((a, b) => a.price - b.price); // Sort by price ascending
            } else if (this.sortOption === 'price_desc') {
                return sorted.sort((a, b) => b.price - a.price); // Sort by price descending
            } else if (this.sortOption === 'title') {
                return sorted.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title A-Z
            } else if (this.sortOption === 'title_desc') {
                return sorted.sort((a, b) => b.title.localeCompare(a.title)); // Sort by title Z-A
            } else if (this.sortOption === 'location') {
                return sorted.sort((a, b) => a.location.localeCompare(b.location)); // Sort by location
            } else if (this.sortOption === 'availability') {
                return sorted.sort((a, b) => a.availableInventory - b.availableInventory); // Sort by availability
            }
            return sorted; // Default return
        }
    },
    methods: {
        toggleCheckout() {
            this.showLessons = !this.showLessons;
        },
        addToCart(lesson) {
            if (this.canAddToCart(lesson)) {
                const existingItem = this.cart.find(item => item.id === lesson.id);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    this.cart.push({ ...lesson, quantity: 1 });
                }
                lesson.availableInventory--; // Decrement available inventory
            } else {
                alert("Cannot add more items to the cart. Out of stock!");
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
        
            // Check if the ZIP code is numerical
            if (!/^\d+$/.test(this.order.zip)) {
                alert("Please enter a valid ZIP code (numerical only).");
                return; // Exit the method if ZIP code validation fails
            }
        
            // Proceed with the order submission logic here
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
            
            // Clear the cart
            this.cart = []; // Optionally clear the cart after placing an order
            
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