let cartContainer = document.getElementById("cartContainer");
let subTotalValue = document.getElementById("subTotalValue");
let taxValue = document.getElementById("taxValue");
let grandTotalValue = document.getElementById("grandTotalValue");
let checkoutButton = document.getElementById("checkoutButton");
let goBackButton = document.getElementById("goBackButton");
let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

// let testTime = setTimeout(()=> {console.log("hello");}, 50000);
// console.log(testTime);
// let testTime2 = setTimeout(()=> {console.log("hello");}, 80000);
// console.log(testTime2);

function renderCartItems() {
  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<h1 class="no-data">Your cart is empty</h1>';
    checkoutButton.style.display = "none";
  } else {
    cartContainer.innerHTML = "";

    cartItems.forEach((product) => {
      let productElement = document.createElement('div');
      productElement.classList.add('cart-product');

      let thumbnailElement = document.createElement('img');
      thumbnailElement.classList.add('cart-product-thumbnail');
      thumbnailElement.src = product.thumbnail;
      thumbnailElement.alt = 'Image failed to load';

      let detailsElement = document.createElement('div');
      detailsElement.classList.add('cart-product-details');

      let titleElement = document.createElement('h2');
      titleElement.innerText = product.title;

      let descriptionElement = document.createElement('p');
      descriptionElement.classList.add('cart-product-description');
      descriptionElement.innerText = product.description;

      let priceElement = document.createElement('h4');
      priceElement.classList.add('cart-product-price');
      priceElement.innerText = `Price: $${product.price}`;

      let quantityElement = document.createElement('div');
      quantityElement.classList.add('cart-product-quantity');

      let quantityLabelElement = document.createElement('label');
      quantityLabelElement.setAttribute('for', `quantity-${product.id}`);
      quantityLabelElement.innerText = 'Quantity: ';

      let decreaseButton = document.createElement('button');
      decreaseButton.innerText = '-';
      decreaseButton.classList.add('cart-product-decrease');
      decreaseButton.addEventListener('click', () => {
        let newQuantity = Math.max(1, product.quantity - 1);
        updateCart(product.id, newQuantity);
      });

      let quantityInput = document.createElement('input');
      quantityInput.setAttribute('type', 'number');
      quantityInput.setAttribute('min', '1');
      quantityInput.setAttribute('value', product.quantity);
      quantityInput.setAttribute('id', `quantity-${product.id}`);
      quantityInput.style.width = '50px';
      quantityInput.addEventListener('input', (e) => {
        let newQuantity = parseInt(e.target.value);
        updateCart(product.id, newQuantity);
      });

      let increaseButton = document.createElement('button');
      increaseButton.innerText = '+';
      increaseButton.classList.add('cart-product-increase');
      increaseButton.addEventListener('click', () => {
        let newQuantity = product.quantity + 1;
        updateCart(product.id, newQuantity);
      });

      let removeButton = document.createElement('button');
      removeButton.classList.add('cart-product-remove');
      removeButton.innerText = 'Remove';
      removeButton.addEventListener('click', () => {
        removeFromCart(product.id);
      });

      quantityElement.appendChild(quantityLabelElement);
      quantityElement.appendChild(decreaseButton);
      quantityElement.appendChild(quantityInput);
      quantityElement.appendChild(increaseButton);

      detailsElement.appendChild(titleElement);
      detailsElement.appendChild(descriptionElement);
      detailsElement.appendChild(priceElement);
      detailsElement.appendChild(quantityElement);
      detailsElement.appendChild(removeButton);

      productElement.appendChild(thumbnailElement);
      productElement.appendChild(detailsElement);

      cartContainer.appendChild(productElement);
    });

    calculateCartTotal();
    checkoutButton.style.display = "block";
  }
}

let inactivityTime;
function clearSessionStorageAndHideCart() {
  sessionStorage.clear();
  cartContainer.innerHTML = '<h1 class="no-data">Your cart is empty</h1>';
  checkoutButton.style.display = "none";
}

// debounce
function resetinactivityTime() {
  clearTimeout(inactivityTime);
  inactivityTime = setTimeout(clearSessionStorageAndHideCart, 50000);
  console.log(inactivityTime);
  calculateCartTotal();
  renderCartItems();
}

window.addEventListener("mousemove",(e) =>{e.preventDefault();}, resetinactivityTime);
window.addEventListener("keydown", resetinactivityTime);
window.addEventListener("click", resetinactivityTime);

// resetinactivityTime();

window.addEventListener("DOMContentLoaded", () => {
  if (cartItems.length === 0) {
    window.location.href = "index.html";
  }

  renderCartItems();

  goBackButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  checkoutButton.addEventListener("click", () => {
    window.location.href = "billing.html";
  });
});

function updateCart(productId, quantity) {
  let updatedItems = cartItems.map((item) => {
    if (item.id === productId) {
      item.quantity = quantity;
    }
    return item;
  });
  cartItems = updatedItems;
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  calculateCartTotal();
  renderCartItems();
}

function removeFromCart(productId) {
  cartItems = cartItems.filter((item) => item.id !== productId);
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<h1 class="no-data">Your cart is empty</h1>';
    checkoutButton.style.display = "none";
  } else {
    renderCartItems();
  }
  calculateCartTotal();
}

function calculateCartTotal() {
  let subTotal = 0;
  cartItems.forEach((product) => {
    subTotal += product.price * product.quantity;
  });

  let tax = subTotal * 0.1;
  let grandTotal = subTotal + tax;

  subTotalValue.innerText = `$${subTotal.toFixed(2)}`;
  taxValue.innerText = `$${tax.toFixed(2)}`;
  grandTotalValue.innerText = `$${grandTotal.toFixed(2)}`;
}
