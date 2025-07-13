
    let cart = [];
    
    function addToCart(product) {
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      updateCart();
    }

    function updateCart() {
      const cartItems = document.getElementById("cartItems");
      const cartTotal = document.getElementById("cartTotal");
      cartItems.innerHTML = "";
      let total = 0;

      cart.forEach(product => {
        const item = document.createElement("div");
        item.className = "flex justify-between items-center";
        item.innerHTML = `
          <span>${product.title}</span>
          <div class="flex items-center gap-2">
            <button onclick='changeQty(${product.id}, -1)' class="px-2 py-1 bg-red-700 rounded">-</button>
            <span>${product.qty}</span>
            <button onclick='changeQty(${product.id}, 1)' class="px-2 py-1 bg-green-700 rounded">+</button>
          </div>
          <span>$${(product.price * product.qty).toFixed(2)}</span>
        `;
        total += product.price * product.qty;
        cartItems.appendChild(item);
      });

      cartTotal.textContent = "$" + total.toFixed(2);
    }

    function changeQty(id, delta) {
      const item = cart.find(p => p.id === id);
      if (item) {
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(p => p.id !== id);
        updateCart();
      }
    }

    // Simulated cart loader (you can replace with localStorage later)
    window.onload = () => {
      // Sample items - replace with actual cart state from localStorage/sessionStorage if used
      cart = [
        { id: 1, title: "Maze Official Logo Tee", price: 25, qty: 2 },
        { id: 2, title: "Unisex Green Maze T-Shirt", price: 30, qty: 1 },
      ];
      updateCart();
    };

    
    function updateCart() {
      cartItems.innerHTML = "";
      let total = 0;
      cart.forEach(product => {
        const item = document.createElement("div");
        item.className = "flex justify-between items-center";
        item.innerHTML = `
          <span>${product.title}</span>
          <div class="flex items-center gap-2">
            <button onclick='changeQty(${product.id}, -1)' class="px-2 py-1 bg-red-700 rounded">-</button>
            <span>${product.qty}</span>
            <button onclick='changeQty(${product.id}, 1)' class="px-2 py-1 bg-green-700 rounded">+</button>
          </div>
          <span>$${(product.price * product.qty).toFixed(2)}</span>
        `;
        total += product.price * product.qty;
        cartItems.appendChild(item);
      });
      cartTotal.textContent = "$" + total.toFixed(2);
    }

    function changeQty(id, delta) {
      const item = cart.find(p => p.id === id);
      if (item) {
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(p => p.id !== id);
        updateCart();
      }
    }

    
    document.getElementById("searchInput").addEventListener("input", renderProducts);
    document.getElementById("categoryFilter").addEventListener("change", renderProducts);
    renderProducts();