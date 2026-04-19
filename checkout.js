let cart = JSON.parse(localStorage.getItem("cart")) || [];

let container = document.getElementById("checkout-items");
let totalEl = document.getElementById("checkout-total");

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