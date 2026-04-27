let isSignupMode = false;
const AUTH_STORAGE_VERSION = "2";

// One-time reset to clear old users and auth state
if (localStorage.getItem("authStorageVersion") !== AUTH_STORAGE_VERSION) {
  localStorage.removeItem("users");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  localStorage.setItem("authStorageVersion", AUTH_STORAGE_VERSION);
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getRedirectUrl() {
  let params = new URLSearchParams(window.location.search);
  return params.get("redirect") || "index.html";
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

function isValidPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
}

function toggleMode() {
  isSignupMode = !isSignupMode;

  let title = document.getElementById("auth-title");
  let subtitle = document.getElementById("auth-subtitle");
  let confirmPassword = document.getElementById("confirm-password");
  let authBtn = document.getElementById("auth-btn");
  let switchText = document.getElementById("auth-switch-text");
  let switchBtn = document.querySelector(".link-btn");
  let error = document.getElementById("error");

  error.innerText = "";

  if (isSignupMode) {
    title.innerText = "Create Account";
    subtitle.innerText = "Signup to place orders";
    confirmPassword.style.display = "block";
    authBtn.innerText = "Signup";
    switchText.innerText = "Already have account?";
    switchBtn.innerText = "Login here";
  } else {
    title.innerText = "Welcome Back";
    subtitle.innerText = "Login to continue";
    confirmPassword.style.display = "none";
    authBtn.innerText = "Login";
    switchText.innerText = "New user?";
    switchBtn.innerText = "Create account";
  }
}

function signup(username, password, confirmPassword) {
  let error = document.getElementById("error");
  let users = getUsers();

  if (!isValidUsername(username)) {
    error.innerText = "Username must be 3-20 chars (letters, numbers, underscore)";
    return;
  }

  if (!isValidPassword(password)) {
    error.innerText = "Password must be 8+ chars with letter, number, and special character";
    return;
  }

  if (!confirmPassword) {
    error.innerText = "Please confirm password";
    return;
  }

  if (password !== confirmPassword) {
    error.innerText = "Password does not match";
    return;
  }

  let alreadyExists = users.find(user => user.username === username);

  if (alreadyExists) {
    error.innerText = "Username already exists";
    return;
  }

  users.push({ username, password });
  saveUsers(users);

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", username);
  window.location.href = getRedirectUrl();
}

function login(username, password) {
  let error = document.getElementById("error");
  let users = getUsers();

  if (!isValidUsername(username)) {
    error.innerText = "Enter a valid username";
    return;
  }

  let existingUser = users.find(user => user.username === username && user.password === password);

  if (!existingUser) {
    error.innerText = "Invalid username or password";
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", username);
  window.location.href = getRedirectUrl();
}

function handleAuth() {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document.getElementById("confirm-password").value.trim();
  let error = document.getElementById("error");

  if (!username || !password) {
    error.innerText = "Please fill all fields";
    return;
  }

  if (isSignupMode) {
    signup(username, password, confirmPassword);
  } else {
    login(username, password);
  }
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
  let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
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

updateCartCount();
toggleAuthLinks();
initMobileNav();
