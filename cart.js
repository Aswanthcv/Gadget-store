let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartItems = document.getElementById("cart-items");
let total = document.getElementById("total");

let checkoutContainer = document.getElementById("checkout-container");  //checkout btn container
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

// Render cart items
function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>";
    total.innerText = 0;

    checkoutContainer.style.display = "none"; //  hide
    return;
  }

  checkoutContainer.style.display = "flex"; //  show

  let sum = 0;

  cart.forEach((item, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <div class="cart-left">
        <img src="${item.image}">
        <div>
          <strong>${item.name}</strong><br>
          ₹${item.price.toLocaleString("en-IN")} × ${item.quantity} = 
          <strong>₹${(item.price * item.quantity).toLocaleString("en-IN")}</strong>
        </div>
      </div>

      <div class="cart-controls">
        <button onclick="decreaseQty(${index})"><i class="fa-solid fa-minus"></i></button>
        <span>${item.quantity}</span>
        <button onclick="increaseQty(${index})"><i class="fa-solid fa-plus"></i></button>
      </div>
    `;

    cartItems.appendChild(li);

    sum += item.price * item.quantity;
  });

  total.innerText = sum.toLocaleString("en-IN");
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}
function increaseQty(index) {
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Update cart count (optional here)
function updateCartCount() {
  let count = cart.reduce((total, item) => total + item.quantity, 0); //total quantity into single value

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

renderCart();
updateCartCount();
toggleAuthLinks();
