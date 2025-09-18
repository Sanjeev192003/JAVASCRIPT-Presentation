document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
  updateBadge();
  displayCart();
});


const products = [
  { id: 1, name: "Shoes", price: 1000, image: "download.jpg" },
  { id: 2, name: "Iphone", price: 1500, image: "download (1).jpg" },
  { id: 3, name: "Head phone", price: 800, image: "download (2).jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function displayProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  products.forEach(product => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card mb-4">
          <img src="${product.image}" class="card-img-top" height="200" />
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">₹${product.price}</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
}


function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1});
  }

  saveCart();
  updateBadge();
  displayCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


function updateBadge() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = total;
}


function displayCart() {
  const section = document.getElementById("cart-section");
  section.innerHTML = "";

  if (cart.length === 0) {
    section.innerHTML = `<p>Your cart is empty.</p>`;
    return;
  }

  cart.forEach(item => {
    section.innerHTML += `
      <div class="card mb-2 p-2">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <strong>${item.name}</strong> <br/>
            ₹${item.price.toFixed(2)} x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}
          </div>
          <div>
            <button class="btn btn-sm btn-success" onclick="changeQty(${item.id}, 1)">+</button>
            <button class="btn btn-sm btn-warning" onclick="changeQty(${item.id}, -1)">-</button>
            <button class="btn btn-sm btn-danger" onclick="removeItem(${item.id})">Delete</button>
          </div>
        </div>
      </div>
    `;
  });
}


function changeQty(id, delta) {
  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  saveCart();
  updateBadge();
  displayCart();
}


function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateBadge();
  displayCart();
  alert("Item removed from cart");
}


function emptyCart() {
  cart = [];
  saveCart();
  updateBadge();
  displayCart();
  alert("Cart Emptied!");
}
