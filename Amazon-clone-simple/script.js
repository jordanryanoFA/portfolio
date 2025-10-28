const products = [
  { name: "Wireless Headphones", price: 49.99, image: "images/wireless.jpg" },
  { name: "Smartwatch", price: 79.99, image: "images/smartwatch.jpg" },
  { name: "Bluetooth Speaker", price: 39.99, image: "images/bluetooth-speaker.jpg" },
  { name: "Gaming Mouse", price: 29.99, image: "images/mouse.png" },
  { name: "Laptop Sleeve", price: 19.99, image: "images/sleeve.jpg" },
  { name: "ASUS Laptop Charger", price: 24.99, image: "images/charger.png" }
];

const container = document.getElementById("productContainer");

function showProducts(list) {
  container.innerHTML = "";
  list.forEach(p => {
    const productHTML = `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price.toFixed(2)}</p>
        <button>Add to Cart</button>
      </div>`;
    container.innerHTML += productHTML;
  });
}

// Search feature
document.getElementById("searchBtn").addEventListener("click", () => {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(search));
  showProducts(filtered);
});

// Load initial products
showProducts(products);
