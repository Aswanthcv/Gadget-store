function login() {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();
  let error = document.getElementById("error");

  if (!username || !password) {
    error.innerText = "Please fill all fields";
    return;
  }

  if (username === "admin" && password === "1234") {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
  } else {
    error.innerText = "Invalid username or password";
  }
}