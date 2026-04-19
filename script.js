// Checks loggined or not
let isLoggedIn = localStorage.getItem("isLoggedIn");

if (!isLoggedIn) {
  window.location.href = "login.html";
}

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Product data
let products = [
  {
    name: "I Phone 17 Pro Max",
    price: 125000,
    image: "images/iphone.png"
  },
  {
    name: "Samsung S25 Ultra",
    price: 128000,
    image: "images/samsung.png"
  },
  {
    name: "Vivo X300",
    price: 120000,
    image: "images/vivo-x300.png"
  },
  {
    name: "Nothing Earphones",
    price: 10000,
    image: "images/nothing-earphone.png"
  },
  {
    name: "Rayban Meta glasses",
    price: 128000,
    image: "images/meta-glass.png"
  },
  {
    name: "JBL Soundbar",
    price: 6000,
    image: "images/samsung.png"
  },
];

// Render products
let container = document.getElementById("product-list");

products.forEach((p) => {
  let card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${p.image}">
    <h3>${p.name}</h3>
    <p><i class="fas fa-indian-rupee-sign"></i>${p.price.toLocaleString("en-IN")}</p>
    <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}')">
      Add to Cart 
    </button>
  `;

  container.appendChild(card);
});

// Add to cart (with quantity system)
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let count = cart.reduce((total, item) => total + item.quantity, 0);

  let countEl = document.getElementById("cart-count");
  if (countEl) {
    countEl.innerText = count;
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

// Run on load
updateCartCount();