class CheckoutManager {
  constructor() {
    this.cart = cartManager.getCart();
    this.selectedPaymentMethod = 'card';
    this.init();
  }

  init() {
    this.renderCart();
    this.bindEvents();
    this.setupPaymentMethods();
  }

  bindEvents() {
    // Listen for cart updates
    document.addEventListener('cartUpdated', () => {
      this.cart = cartManager.getCart();
      this.renderCart();
    });

    // Payment method selection
    document.querySelectorAll('.payment-method').forEach(method => {
      method.addEventListener('click', (e) => {
        this.selectPaymentMethod(e.target.dataset.method);
      });
    });

    // Checkout form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.processCheckout();
      });
    }
  }

  renderCart() {
    const cartContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTax = document.getElementById('cartTax');

    if (!cartContainer) return;

    if (this.cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-cart text-6xl text-gray-400 mb-4"></i>
          <p class="text-gray-400 text-lg mb-4">Your cart is empty</p>
          <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
        </div>
      `;
      if (cartTotal) cartTotal.textContent = '$0.00';
      return;
    }

    cartContainer.innerHTML = '';
    let subtotal = 0;

    this.cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item-details">
          <h4>${item.title}</h4>
          <p class="cart-item-options">
            Size: ${item.size} | Color: <span class="color-indicator" style="background-color: ${item.color}"></span>
          </p>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item-quantity">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.size}', '${item.color}', ${item.quantity - 1})">
            <i class="fas fa-minus"></i>
          </button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.size}', '${item.color}', ${item.quantity + 1})">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
        <button class="remove-item" onclick="removeFromCart(${item.id}, '${item.size}', '${item.color}')">
          <i class="fas fa-trash"></i>
        </button>
      `;

      cartContainer.appendChild(cartItem);
    });

    // Calculate totals
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTax) cartTax.textContent = `$${tax.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  selectPaymentMethod(method) {
    this.selectedPaymentMethod = method;
    
    document.querySelectorAll('.payment-method').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.method === method);
    });

    // Show/hide payment forms
    document.querySelectorAll('.payment-form').forEach(form => {
      form.style.display = form.id === `${method}Form` ? 'block' : 'none';
    });
  }

  setupPaymentMethods() {
    // Credit card form validation
    const cardForm = document.getElementById('cardForm');
    if (cardForm) {
      this.setupCardValidation(cardForm);
    }

    // PayPal integration (mock)
    const paypalBtn = document.getElementById('paypalBtn');
    if (paypalBtn) {
      paypalBtn.addEventListener('click', () => {
        this.processPayPalPayment();
      });
    }

    // Mobile money form
    const mobileForm = document.getElementById('mobileForm');
    if (mobileForm) {
      this.setupMobileMoneyValidation(mobileForm);
    }
  }

  setupCardValidation(form) {
    const cardNumber = form.querySelector('#cardNumber');
    const expiryDate = form.querySelector('#expiryDate');
    const cvv = form.querySelector('#cvv');

    if (cardNumber) {
      cardNumber.addEventListener('input', (e) => {
        // Format card number
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
      });
    }

    if (expiryDate) {
      expiryDate.addEventListener('input', (e) => {
        // Format expiry date
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
          value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
      });
    }

    if (cvv) {
      cvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
      });
    }
  }

  setupMobileMoneyValidation(form) {
    const phoneNumber = form.querySelector('#phoneNumber');
    if (phoneNumber) {
      phoneNumber.addEventListener('input', (e) => {
        // Format phone number
        let value = e.target.value.replace(/[^0-9+]/g, '');
        e.target.value = value;
      });
    }
  }

  async processCheckout() {
    if (this.cart.length === 0) {
      this.showNotification('Your cart is empty!', 'error');
      return;
    }

    // Show loading
    const checkoutBtn = document.querySelector('.checkout-btn');
    const originalText = checkoutBtn.innerHTML;
    checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    checkoutBtn.disabled = true;

    try {
      // Simulate payment processing
      await this.simulatePayment();
      
      // Clear cart
      cartManager.clearCart();
      
      // Show success message
      this.showOrderSuccess();
      
    } catch (error) {
      this.showNotification('Payment failed. Please try again.', 'error');
    } finally {
      // Reset button
      checkoutBtn.innerHTML = originalText;
      checkoutBtn.disabled = false;
    }
  }

  async simulatePayment() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Payment failed'));
        }
      }, 2000);
    });
  }

  processPayPalPayment() {
    this.showNotification('Redirecting to PayPal...', 'info');
    // In a real app, this would integrate with PayPal SDK
    setTimeout(() => {
      this.processCheckout();
    }, 1000);
  }

  showOrderSuccess() {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h2>Order Successful!</h2>
        <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
        <button class="btn btn-primary" onclick="window.location.href='index.html'">
          Continue Shopping
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  }
}

// Initialize checkout manager
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cartItems')) {
    new CheckoutManager();
  }
});