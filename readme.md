 const products = [
      { id: 1, title: "Red Label Tee", price: 35, category: "unisex", colors: ["red", "black", "blue"], image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=800&q=80" },
      { id: 2, title: "Urban Jacket", price: 89, category: "men", colors: ["black"], image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80" },
      { id: 3, title: "Denim Edge", price: 58, category: "women", colors: ["blue"], image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" }
    ];

    
// Load products from JSON file
   let products = [];

fetch("products.json")
  .then(response => response.json())
  .then(data => {
    products = data;
    renderProducts(); // Call your product rendering function after loading
  })
  .catch(error => console.error("Failed to load products:", error));


    const productList = document.getElementById("productList");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    let cart = [];

    function renderProducts() {
      const filter = document.getElementById("categoryFilter").value;
      const search = document.getElementById("searchInput").value.toLowerCase();
      productList.innerHTML = "";

      const filtered = products.filter(p => (filter === "all" || p.category === filter) && p.title.toLowerCase().includes(search));

      filtered.forEach(product => {
        const div = document.createElement("div");
        div.className = "bg-[var(--secondary)] rounded-xl overflow-hidden shadow-lg";
        div.innerHTML = `
          <img src="${product.image}" class="w-full">
          <div class="p-4">
            <h3 class="text-[var(--accent)] text-lg font-semibold mb-2">${product.title}</h3>
            <p class="mb-2">$${product.price.toFixed(2)}</p>
            <button onclick='addToCart(${JSON.stringify(product)})' class="bg-[var(--accent)] text-white px-4 py-2 rounded hover:bg-red-700 transition">Add to Cart</button>
          </div>`;
        productList.appendChild(div);
      });
    }


    document.getElementById("searchInput").addEventListener("input", renderProducts);
    document.getElementById("categoryFilter").addEventListener("change", renderProducts);
    renderProducts();

    