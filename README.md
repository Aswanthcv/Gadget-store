# Gadget Store (JS E-commerce)

A simple frontend e-commerce project built with vanilla HTML, CSS, and JavaScript.

## Features
- Product listing on home page
- Add to cart with quantity controls
- Checkout with basic form validation
- Login/Signup in a single page
- User data stored in `localStorage`
- Order placement flow with success page
- Consistent navbar and footer across pages

## Auth Rules
- Username: `3-20` characters (`a-z`, `A-Z`, `0-9`, `_`)
- Password: minimum `8` characters, must include:
  - at least one letter
  - at least one number
  - at least one special character

## Project Structure
- `index.html` - home + products
- `cart.html` / `cart.js` - cart page and logic
- `checkout.html` / `checkout.js` - checkout and order logic
- `login.html` / `login.js` - login/signup logic
- `order-success.html` - order confirmation
- `style.css` - shared styling

## Run
1. Open `index.html` in your browser.
2. Browse products, add to cart, and proceed to checkout.
3. Login/Signup is required while placing the order.

## Notes
- This project uses browser `localStorage` (no backend/database).
- Cart is cleared on logout.
