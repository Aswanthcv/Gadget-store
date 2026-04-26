let cart = JSON.parse(localStorage.getItem("cart")) || [];

let container = document.getElementById("checkout-items");
let totalEl = document.getElementById("checkout-total");
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

let total = 0;

//  Handle empty cart
if (cart.length === 0) {
    window.location.href = "index.html";
} else {

  cart.forEach(item => {
    let li = document.createElement("li");

    li.innerText = `${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toLocaleString("en-IN")}`;

    container.appendChild(li);

    total += item.price * item.quantity;
  });

  totalEl.innerText = total.toLocaleString("en-IN");
}


// 🔹 Place order with validation
function placeOrder() {
  if (!isLoggedIn) {
    window.location.href = "login.html?redirect=checkout.html";
    return;
  }

  let name = document.getElementById("name").value.trim();
  let address = document.getElementById("address").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let pincode = document.getElementById("pincode").value.trim();

  // 🔹 Name validation
  if (!/^[a-zA-Z ]{3,}$/.test(name)) {
    alert("Enter valid name (min 3 letters)");
    return;
  }

  // 🔹 Address validation
  if (address.length < 10) {
    alert("Enter full address (min 10 characters)");
    return;
  }

  // 🔹 Phone validation (Indian format)
  if (!/^[6-9]\d{9}$/.test(phone)) {
    alert("Enter valid phone number");
    return;
  }

  // 🔹 PIN code validation
  if (!/^\d{6}$/.test(pincode)) {
    alert("Enter valid PIN code");
    return;
  }

  // 🔹 Save order
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  let newOrder = {
    id: Date.now(),
    items: cart,
    total: total,
    date: new Date().toLocaleString()
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  // 🔹 Clear cart
  localStorage.removeItem("cart");

  // 🔹 Redirect
  window.location.href = "order-success.html";
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);
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

updateCartCount();
toggleAuthLinks();
