document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Product Data
    const products = [
        {
            id: 1,
            title: "Classic Black jackets",
            price: 120000,
            image: "images/products/jackets.jpg",
            description: "Premium quality jackets for any occasion. Available in mutiple colors."
        },
        {
            id: 2,
            title: "Joggers",
            price: 25000,
            image: "images/products/joggers.jpg",
            description: "Comfortable and stylish Joggers. offered in variety of colors and size."
        },
        {
            id: 3,
            title: "Round Neck",
            price: 20000,
            image: "images/products/roundneck1.jpg",
            description: "Light and breezy summer dress."
        },
        {
            id: 4,
            title: "Round Neck",
            price: 20000,
            image: "images/products/roundneck2.jpg",
            description: "Available in assorted colors."
        },
        {
            id: 5,
            title: "Hoddies",
            price: 30000,
            image: "images/products/hoodie.jpg",
            description: "Elegant hoddie for the winter and cold season, Available in mutiple colors."
        },
        {
            id: 6,
            title: "Trucker Cap",
            price: 20000,
            image: "images/products/trucker-cap.jpg",
            description: "Suits every casual outfits."
        },
        {
            id: 7,
            title: "Face Cap",
            price: 10000,
            image: "images/products/normal-cap.jpg",
            description: "Comfortable everyday face-cap."
        },
        {
            id: 8,
            title: "Up and Down(male) ",
            price: 60000,
            image: "images/products/up and down-male.jpg",
            description: "Perfect casual wears for the guys."
        },
        {
            id: 9,
            title: "Up and Down(female)",
            price: 50000,
            image: "images/products/up and down-female.jpg",
            description: "Stylish complete cloth for the ladies."
        },
         {
            id: 10,
            title: "Up and Down(female)",
            price: 50000,
            image: "images/products/up and down-female2.jpg",
            description: "Stylish complete cloth for the ladies."
        },
        {
            id: 11,
            title: "Crop Top",
            price: 15000,
            image: "images/products/crop-top.jpg",
            description: "Luxurious crop top for any outfit, Comes in ranges of colors and sizes"
        },
        {
            id: 12,
            title: "Tank Top(male)",
            price: 15000,
            image: "images/products/tank-top.jpg",
            description: "Perfect for summer and casual wear."
        },
        {
            id: 13,
            title: "Tank Top(female)",
            price: 15000,
            image: "images/products/female-tank-top.jpg",
            description: "Perfect for summer and casual wear."
        },
        {
            id: 14,
            title: "Skirts",
            price: 20000,
            image: "images/products/skirt.jpg",
            description: "Comfortable and stylish skirt for any occasion."
        },
        {
            id: 15,
            title: "Gym wear (female)",
            price: 40000,
            image: "images/products/gym wear-female.jpg",
            description: "Perfect for the womens workouts and fitness."
        },
        {
            id: 16,
            title: "Gym wear (male)",
            price: 50000,
            image: "images/products/gymwear-male.jpg",
            description: "Perfect for the mens workout sessions"
        },
        {
            id: 17,
            title: "Sweat shirt",
            price: 30000,
            image: "images/products/sweatshirt.jpg",
            description: "Stylish and comfortable sweatshirt for all seasons."
        }
    ];

    // Display Products
    const productGrid = document.getElementById('product-grid');
    
    function displayProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card floating';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">₦${product.price.toLocaleString()}</p>
                    <p class="product-description">${product.description}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(productCard);
            
            // Add floating animation with delay
            const delayClasses = ['delay-1', 'delay-2', 'delay-3'];
            const randomDelay = delayClasses[Math.floor(Math.random() * delayClasses.length)];
            productCard.classList.add(randomDelay);
        });
        
        // Add event listeners to all add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }
    
    displayProducts();

    // Cart Functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';
    document.body.appendChild(cartOverlay);

    // Update cart count
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }

    // Update cart total
    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `₦${total.toLocaleString()}`;
    }

    // Display cart items
    function displayCartItems() {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            checkoutBtn.style.display = 'none';
            return;
        }
        
        checkoutBtn.style.display = 'block';
        cartItems.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p class="cart-item-price">₦${item.price.toLocaleString()}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="remove-item" data-id="${item.id}">&times;</div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    // Add to cart
    function addToCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update UI
        updateCartCount();
        displayCartItems();
        updateCartTotal();
        
        // Show success animation
        const button = e.target;
        button.textContent = 'Added!';
        button.style.backgroundColor = 'var(--success-color)';
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = 'var(--primary-color)';
        }, 1000);
    }

    // Decrease quantity
    function decreaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
        updateCartTotal();
    }

    // Increase quantity
    function increaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        
        item.quantity += 1;
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
        updateCartTotal();
    }

    // Remove item
    function removeItem(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
        updateCartTotal();
    }

    // Toggle cart modal
    function toggleCart() {
        cartModal.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.style.overflow = cartModal.classList.contains('active') ? 'hidden' : 'auto';
        
        if (cartModal.classList.contains('active')) {
            displayCartItems();
            updateCartTotal();
        }
    }

    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // Initialize cart
    updateCartCount();
    displayCartItems();
    updateCartTotal();

    // Checkout Functionality
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckout = document.querySelector('.close-checkout');
    const checkoutForm = document.getElementById('checkout-form');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeConfirmation = document.querySelector('.close-confirmation');

    // Show checkout modal
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        
        toggleCart();
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close checkout modal
    closeCheckout.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Checkout form submit handler:
    checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(checkoutForm);
    const orderData = {
        customer: {
            name: formData.get('fullname'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            notes: formData.get('notes'),
        },
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        paymentProof: "Uploaded file", // (Formspree handles file uploads automatically)
        date: new Date().toLocaleString(),
    };

    try {
        const response = await fetch('https://formspree.io/f/xqalqbbo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            // Show success message
            checkoutModal.classList.remove('active');
            confirmationModal.classList.add('active');
            
            // Clear the cart
            cart = [];
            localStorage.removeItem('cart');
            updateCartCount();
        } else {
            alert('Error submitting order. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit order. Please check your connection.');
    }
});

    // Close confirmation modal
    closeConfirmation.addEventListener('click', () => {
        confirmationModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Simulate sending order notification
    function sendOrderNotification(orderData) {
        // In a real app, this would send an email to the store owner
        console.log('Sending order notification to store owner:', orderData);
        
        // You would typically use a server-side script or email service here
        // For example:
        // fetch('send_notification.php', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(orderData)
        // });
    }

    // Contact Form
    const messageForm = document.getElementById('message-form');
    
    // Replace the message form submit handler with:
    messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(messageForm);
    const messageData = {
        name: formData.get('contact-name'),
        email: formData.get('contact-email'),
        message: formData.get('contact-message'),
        date: new Date().toLocaleString(),
    };

    try {
        const response = await fetch('https://formspree.io/f/xyzpwjjr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
        });

        if (response.ok) {
            alert('Message sent! We’ll reply soon.');
            messageForm.reset();
        } else {
            alert('Error sending message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message. Please check your connection.');
    }
});

    // Simulate sending message notification
    function sendMessageNotification(messageData) {
        // In a real app, this would send an email to the store owner
        console.log('Sending message notification to store owner:', messageData);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#cart') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});