document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = `<p class="text-center text-gray-400">Your cart is empty.</p>`;
      cartTotal.textContent = "$0.00";
      return;
    }

    cart.forEach((product, index) => {
      const item = document.createElement("div");
      item.className = "flex justify-between items-center bg-[var(--bg)] text-white px-4 py-2 rounded";
      item.innerHTML = `
        <div>
          <p class="font-semibold">${product.title}</p>
          <p class="text-sm text-gray-300">$${product.price.toFixed(2)} x ${product.qty}</p>
        </div>
        <div class="flex gap-2 items-center">
          <button onclick="changeQty(${index}, -1)" class="bg-red-600 px-2 py-1 rounded text-white">-</button>
          <span>${product.qty}</span>
          <button onclick="changeQty(${index}, 1)" class="bg-green-600 px-2 py-1 rounded text-white">+</button>
          <button onclick="removeItem(${index})" class="text-sm text-red-400 hover:underline ml-4">Remove</button>
        </div>
      `;

      cartContainer.appendChild(item);
      total += product.price * product.qty;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  window.changeQty = function (index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  window.removeItem = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  renderCart();
});
