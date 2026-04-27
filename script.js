// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

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
    image: "images/jbl.png"
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
  let cart = JSON.parse(localStorage.getItem("cart")) || []; //checks empty

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart`);
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
  localStorage.removeItem("currentUser");
  localStorage.removeItem("cart");
  window.location.href = "login.html";
}

function toggleAuthLinks() {
  let navLinks = document.querySelectorAll("nav ul li a");
  let loginLink = null;
  let logoutLink = null;

  navLinks.forEach(link => {
    if (link.textContent.trim() === "Login / Signup") {
      loginLink = link;
    }

    if (link.textContent.trim() === "Logout") {
      logoutLink = link;
    }
  });

  if (loginLink) {
    loginLink.style.display = isLoggedIn ? "none" : "inline-block";
  }

  if (logoutLink) {
    logoutLink.style.display = isLoggedIn ? "inline-block" : "none";
  }
}

function initMobileNav() {
  let nav = document.querySelector("nav");
  let navToggle = document.querySelector(".nav-toggle");
  let navLinks = document.querySelectorAll("nav ul li a");

  if (!nav || !navToggle) {
    return;
  }

  navToggle.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    let isExpanded = nav.classList.contains("nav-open");
    navToggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Run on load
updateCartCount();
toggleAuthLinks();
initMobileNav();
