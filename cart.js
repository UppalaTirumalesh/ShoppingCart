let cartContainer = document.getElementById('cartContainer');
let subTotalValue = document.getElementById('subTotalValue');
let taxValue = document.getElementById('taxValue');
let grandTotalValue = document.getElementById('grandTotalValue');
let checkoutButton = document.getElementById('checkoutButton');
let goBackButton = document.getElementById('goBackButton');

let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

function renderCartItems() {
  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<h1 class="no-data">Your cart is empty</h1>';
  } else {
    cartContainer.innerHTML = '';

    cartItems.forEach((product) => {
      const productElement = document.createElement('div');
      productElement.classList.add('cart-product');

      const thumbnailElement = document.createElement('img');
      thumbnailElement.classList.add('cart-product-thumbnail');
      thumbnailElement.src = product.thumbnail;
      thumbnailElement.alt = 'Image failed to load';

      const detailsElement = document.createElement('div');
      detailsElement.classList.add('cart-product-details');

      const titleElement = document.createElement('h2');
      titleElement.innerText = product.title;

      const descriptionElement = document.createElement('p');
      descriptionElement.classList.add('cart-product-description');
      descriptionElement.innerText = product.description;

      const priceElement = document.createElement('h4');
      priceElement.classList.add('cart-product-price');
      priceElement.innerText = `Price: $${product.price}`;

      const quantityElement = document.createElement('div');
      quantityElement.classList.add('cart-product-quantity');

      const quantityLabelElement = document.createElement('label');
      quantityLabelElement.setAttribute('for', `quantity-${product.id}`);
      quantityLabelElement.innerText = 'Quantity: ';

      const quantityInput = document.createElement('input');
      quantityInput.setAttribute('type', 'number');
      quantityInput.setAttribute('min', '1');
      quantityInput.setAttribute('value', product.quantity);
      quantityInput.setAttribute('id', `quantity-${product.id}`);
      quantityInput.style.width = '50px';
      quantityInput.addEventListener('input', (e) => {
        const newQuantity = parseInt(e.target.value);
        updateCart(product.id, newQuantity);
      });

      const removeButton = document.createElement('button');
      removeButton.classList.add('cart-product-remove');
      removeButton.innerText = 'Remove';
      removeButton.addEventListener('click', () => {
        removeFromCart(product.id);
      });

      quantityElement.appendChild(quantityLabelElement);
      quantityElement.appendChild(quantityInput);

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
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderCartItems();

  goBackButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  checkoutButton.addEventListener('click', () => {
    window.location.href = 'billing.html';
  });
});

function updateCart(productId, quantity) {
  const updatedItems = cartItems.map((item) => {
    if (item.id === productId) {
      item.quantity = quantity;
    }
    return item;
  });
  cartItems = updatedItems;
  sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  calculateCartTotal();
  renderCartItems();
}

function removeFromCart(productId) {
  cartItems = cartItems.filter((item) => item.id !== productId);
  sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<h1 class="no-data">Your cart is empty</h1>';
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


