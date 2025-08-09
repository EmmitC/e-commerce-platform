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

    ,

    {
      "id": 13,
      "title": "Product Title",
      "price": 22,
      "category": "category Name",
      "colors": ["#000000", "#ffffff"],
      "colorImages": {
        "#000000": "../Merch and T-Shirts/--.jpg",
        "#ffffff": "../Merch and T-Shirts/--.jpg"
      },

      "sizes": ["One Size"],
      "image": "../Merch and T-Shirts/--.jpg",
      "description": "Description of the product goes here. It should be detailed and informative.",
      "stock": 20,
      "featured": true
    },

    {
      "id": 14,
      "title": "Product Title",
      "price": 22,
      "category": "category Name",
      "colors": ["#000000", "#ffffff"],
      "colorImages": {
        "#000000": "../Merch and T-Shirts/--.jpg",
        "#ffffff": "../Merch and T-Shirts/--.jpg"
      },

      "sizes": ["One Size"],
      "image": "../Merch and T-Shirts/--.jpg",
      "description": "Description of the product goes here. It should be detailed and informative.",
      "stock": 20,
      "featured": true
    }



      <!-- About Section with Parallax Effect -->
<section id="about" class="relative h-[600px] flex items-center justify-center text-center text-white px-6 bg-fixed bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1950&q=80');">
  <div class="bg-black bg-opacity-60 p-10 rounded-lg max-w-3xl">
    <h2 class="text-4xl font-bold mb-6">About Axios</h2>
    <p class="text-lg leading-relaxed">
      <span class="text-[var(--accent)] font-semibold">Axios Apparel</span> is more than a fashion label—it's a statement of confidence and identity.
      We blend storytelling and bold streetwear design to empower individuals to express themselves freely.
      From unisex tees to standout accessories, our mission is to deliver pieces that amplify your voice and style.
      Axios: Designed for the bold, worn with confidence.
    </p>
  </div>
</section>

<!-- Designers Section -->

<section class="bg-white py-16 px-6 md:px-20">
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold text-gray-800">Meet the Minds Behind the Designs</h2>
    <p class="mt-4 text-gray-600 max-w-2xl mx-auto">At Axios, creativity and purpose collide. Get to know the innovative artists shaping bold fashion with a cause.</p>
  </div>

  <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
    <!-- Designer Card -->
    <div class="bg-gray-100 rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition duration-300">
      <div class="h-64 w-full bg-cover bg-center" style="background-image: url('/images/designer1.jpg');"></div>
      <div class="p-6 text-center">
        <h3 class="text-xl font-semibold text-gray-800">Zara Akello</h3>
        <p class="text-sm text-gray-500 mt-2">Lead Streetwear Designer</p>
        <p class="text-gray-600 mt-4">Blending African boldness with modern minimalism, Zara crafts pieces that express power, pride, and personality.</p>
      </div>
    </div>

    <!-- Designer Card -->
    <div class="bg-gray-100 rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition duration-300">
      <div class="h-64 w-full bg-cover bg-center" style="background-image: url('/images/designer2.jpg');"></div>
      <div class="p-6 text-center">
        <h3 class="text-xl font-semibold text-gray-800">Elijah Mensah</h3>
        <p class="text-sm text-gray-500 mt-2">Creative Director</p>
        <p class="text-gray-600 mt-4">Elijah ensures every Axios piece tells a story. His vision fuses culture, confidence, and a touch of rebellion.</p>
      </div>
    </div>

    <!-- Designer Card -->
    <div class="bg-gray-100 rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition duration-300">
      <div class="h-64 w-full bg-cover bg-center" style="background-image: url('/images/designer3.jpg');"></div>
      <div class="p-6 text-center">
        <h3 class="text-xl font-semibold text-gray-800">Joy Kamanzi</h3>
        <p class="text-sm text-gray-500 mt-2">Pattern & Texture Artist</p>
        <p class="text-gray-600 mt-4">With a flair for texture and intricate symbolism, Joy creates unique visuals that elevate Axios beyond fashion.</p>
      </div>
    </div>
  </div>
</section>


<!-- Mission Section -->
<section class="section mission-section">
  <div class="container">
    <h2 class="section-title">Our Mission</h2>
    <p class="section-description">
      Axios is more than just apparel — it's a movement built on style, strength, and soul. 
      We design bold clothing for bold individuals who believe that fashion should inspire confidence 
      and purpose. Through our collections, we strive to empower voices and support the forgotten.
    </p>
  </div>
</section>

<!-- Charity Section -->
<section class="section charity-section">
  <div class="container">
    <h2 class="section-title">Giving Back With Every Purchase</h2>
    <p class="section-description">
      Axios is committed to making a difference. We donate <strong>up to 25% of our profits</strong> 
      to local orphanages and child welfare programs across Uganda. Every purchase you make helps 
      fund essentials like food, education, clothing, and healthcare for children in need.
    </p>
    <div class="charity-impact">
      <div class="impact-item">
        <h3>📚 Education</h3>
        <p>We help fund school supplies and tuition fees for orphaned children.</p>
      </div>
      <div class="impact-item">
        <h3>🍲 Nutrition</h3>
        <p>We contribute towards daily meals and safe drinking water for growing kids.</p>
      </div>
      <div class="impact-item">
        <h3>👕 Clothing</h3>
        <p>Your purchases help us provide warm clothing and essentials to vulnerable children.</p>
      </div>
    </div>
  </div>
</section>

<!-- Featured Causes Section -->
<section class="section causes-section">
  <div class="container">
    <h2 class="section-title">Featured Causes</h2>
    <div class="cause-grid">
      <div class="cause-card">
        <img src="../images/orphanage1.jpg" alt="Orphanage Visit">
        <h3>Hope for Orphans</h3>
        <p>Our support enables orphanages to improve living conditions and provide love and care.</p>
      </div>
      <div class="cause-card">
        <img src="../images/school-supplies.jpg" alt="School Support">
        <h3>Back to School Program</h3>
        <p>We donate books, uniforms, and bags to help children get the education they deserve.</p>
      </div>
    </div>
  </div>
</section>

<!-- Testimonials Section -->
<section class="section testimonials-section">
  <div class="container">
    <h2 class="section-title">What Our Supporters Say</h2>
    <div class="testimonial-grid">
      <div class="testimonial-card">
        <p>"Wearing Axios makes me feel part of something bigger. I'm proud to support a brand that gives back."</p>
        <h4>— Grace A., Kampala</h4>
      </div>
      <div class="testimonial-card">
        <p>"Great quality and an even greater mission. Every shirt tells a story and helps someone in need."</p>
        <h4>— Malik T., Entebbe</h4>
      </div>
    </div>
  </div>
</section>