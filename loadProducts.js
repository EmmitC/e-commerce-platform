document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("productGrid");
  const categoryParam = new URLSearchParams(window.location.search).get("category");

  fetch("./data/products.json")
    .then((res) => res.json())
    .then((data) => {
      const products = data.products;

      const filteredProducts = categoryParam
        ? products.filter(p => p.category.toLowerCase() === categoryParam.toLowerCase())
        : products;

      filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "bg-[var(--secondary)] rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition";

        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-cover">
          <div class="p-4">
            <h3 class="text-[var(--accent)] text-lg font-semibold mb-2">${product.title}</h3>
            <p class="mb-2">$${product.price.toFixed(2)}</p>
            <div class="flex items-center gap-3 mb-4">
              ${product.colors.map(color => `<button class="w-5 h-5 rounded-full border-2 border-white" style="background-color:${color}"></button>`).join("")}
            </div>
            <button onclick="addToCart(${product.id})" class="bg-[var(--accent)] text-white px-4 py-2 rounded hover:bg-red-700 transition">Add to Cart <span class="ml-2">+</span></button>
          </div>
        `;

        productGrid.appendChild(productCard);
      });
    })
    .catch(err => {
      productGrid.innerHTML = `<p class="text-red-600">Failed to load products. Please try again later.</p>`;
      console.error("Error loading products:", err);
    });
});
