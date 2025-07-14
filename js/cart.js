class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('axiosCart')) || [];
    this.cartCount = document.getElementById('cartCount');
    this.init();
  }

  init() {
    this.updateCartCount();
    this.bindEvents();
  }

  bindEvents() {
    // Listen for cart updates
    document.addEventListener('cartUpdated', () => {
      this.updateCartCount();
      this.saveCart();
    });
  }

  addToCart(product, selectedSize = 'M', selectedColor = null) {
    const existingItem = this.cart.find(item => 
      item.id === product.id && 
      item.size === selectedSize && 
      item.color === selectedColor
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
        size: selectedSize,
        color: selectedColor || product.colors[0],
        addedAt: new Date().toISOString()
      });
    }

    this.saveCart();
    this.showAddToCartNotification(product.title);
    document.dispatchEvent(new CustomEvent('cartUpdated'));
  }

  removeFromCart(productId, size, color) {
    this.cart = this.cart.filter(item => 
      !(item.id === productId && item.size === size && item.color === color)
    );
    this.saveCart();
    document.dispatchEvent(new CustomEvent('cartUpdated'));
  }

  updateQuantity(productId, size, color, newQuantity) {
    const item = this.cart.find(item => 
      item.id === productId && item.size === size && item.color === color
    );
    
    if (item) {
      if (newQuantity <= 0) {
        this.removeFromCart(productId, size, color);
      } else {
        item.quantity = newQuantity;
        this.saveCart();
        document.dispatchEvent(new CustomEvent('cartUpdated'));
      }
    }
  }

  getCart() {
    return this.cart;
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    document.dispatchEvent(new CustomEvent('cartUpdated'));
  }

  saveCart() {
    localStorage.setItem('axiosCart', JSON.stringify(this.cart));
  }

  updateCartCount() {
    if (this.cartCount) {
      const count = this.getCartItemCount();
      this.cartCount.textContent = count;
      this.cartCount.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }

  showAddToCartNotification(productName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-check-circle"></i>
        <span>Added "${productName}" to cart!</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  }
}

// Initialize cart manager
const cartManager = new CartManager();

// Global functions for backward compatibility
window.addToCart = (productId, size, color) => {
  fetch('./data/products.json')
    .then(response => response.json())
    .then(data => {
      const product = data.products.find(p => p.id === productId);
      if (product) {
        cartManager.addToCart(product, size, color);
      }
    });
};

window.removeFromCart = (productId, size, color) => {
  cartManager.removeFromCart(productId, size, color);
};

window.updateQuantity = (productId, size, color, quantity) => {
  cartManager.updateQuantity(productId, size, color, quantity);
};