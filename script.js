let content = document.getElementById("mainContainer");
let dropdownsize = document.getElementById("dropdownsize");
let search_bar = document.getElementsByClassName("search_bar")[0];
let paginationList = document.getElementById("pagination-list");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");

let currentPage = 1;
let productsPerPage = parseInt(dropdownsize.value);
let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
let currentProducts = [];
let productsList = [];
let totalPages;
let recordsPerPage;

(async function () {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    productsList = data.products;
    imagesContainer();
  } catch (error) {
    console.log("Error:", error);
  }
  renderProducts(currentProducts);
  renderPagination(totalPages, currentPage);
})();

function imagesContainer() {
  totalPages = Math.ceil(productsList.length / productsPerPage);
  recordsPerPage = dropdownsize.value;
  currentProducts = productsList.slice(0, recordsPerPage);
  renderProducts(currentProducts);
  renderPagination(totalPages, currentPage);
}

function renderProducts(productsList) {
  if (productsList.length === 0) {
    content.innerHTML = '<h1 class="no-data">No Data Found</h1>';
  } else {
    content.innerHTML = "";
    productsList.forEach((product) => {
      let out = `<div class="boxes"> 
          <a class="download-link" href="#" download="product_thumbnail.jpg">
            <i class="fas fa-download" id="fontAwesomeIcon"></i>
          </a>
          <img class="images" src="${product.thumbnail}" alt="Image failed to load"/>
          <h2>${product.title}</h2>
          <p class="tooltip">
            <span class="tooltip-content">${product.description}</span>
            ${product.description.slice(0, 50)}${product.description.length > 50 ? "..." : ""}
          </p>
          <h3>${"$" + product.price}</h3>
          <button class="button" onclick="addToCart('${product.id}', '${product.price}', '${product.thumbnail}', '${product.description.replace("'", "\\'")}', '${product.title.replace("'", "\\'")}')">ADD TO CART</button>
      </div>`;
      content.innerHTML += out;
    });
  }
}

dropdownsize.onchange = function () {
  recordsPerPage = dropdownsize.value;
  productsPerPage = parseInt(recordsPerPage, 10);
  totalPages = Math.ceil(productsList.length / productsPerPage);
  currentProducts = productsList.slice(0, recordsPerPage);
  renderProducts(currentProducts);
  renderPagination(totalPages, currentPage);
}

function performSearch(searchTerm) {
  let filteredProducts = productsList.filter((product) => {
    let title = product.title.toLowerCase();
    let description = product.description.toLowerCase();
    return title.includes(searchTerm) || description.includes(searchTerm);
  });
  return filteredProducts;
}

search_bar.oninput = function (event) {
  let searchTerm = event.target.value.toLowerCase();
  let filteredProducts = performSearch(searchTerm);
  totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  currentProducts = filteredProducts.slice(0, productsPerPage);
  renderProducts(currentProducts);
  renderPagination(totalPages, currentPage);
}

searchButton.onclick = function () {
  let searchTerm = searchInput.value.toLowerCase();
  let filteredProducts = performSearch(searchTerm);
  totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  currentProducts = filteredProducts.slice(0, productsPerPage);
  renderProducts(currentProducts);
  renderPagination(totalPages, currentPage);
}

function renderPagination(totalPages, currentPage) {
  let paginationHTML = "";

  if (totalPages > 0) {
    paginationHTML += `<li class="prev"><a href="#" id="prev">&#139;</a></li>`;

    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        paginationHTML += `<li class="list active"><a href="#" data-page="${i}">${i}</a></li>`;
      } else {
        paginationHTML += `<li class="list"><a href="#" data-page="${i}">${i}</a></li>`;
      }
    }

    paginationHTML += `<li class="next"><a href="#" id="next">&#155;</a></li>`;
  }

  paginationList.innerHTML = paginationHTML;

  let pageLinks = paginationList.querySelectorAll("a[data-page]");
  pageLinks.forEach((link) => {
    link.onclick = function (e) {
      e.preventDefault();
      let clickedPage = parseInt(e.target.getAttribute("data-page"));
      currentPage = clickedPage;
      let startIndex = (currentPage - 1) * productsPerPage;
      let endIndex = startIndex + productsPerPage;
      currentProducts = productsList.slice(startIndex, endIndex);
      renderProducts(currentProducts);
      renderPagination(totalPages, currentPage);
    }
  });

  let prevButton = document.getElementById("prev");
  let nextButton = document.getElementById("next");

  prevButton.onclick = function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      let startIndex = (currentPage - 1) * productsPerPage;
      let endIndex = startIndex + productsPerPage;
      currentProducts = productsList.slice(startIndex, endIndex);
      renderProducts(currentProducts);
      renderPagination(totalPages, currentPage);
    }
  }

  nextButton.onclick = function (e) {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      let startIndex = (currentPage - 1) * productsPerPage;
      let endIndex = startIndex + productsPerPage;
      currentProducts = productsList.slice(startIndex, endIndex);
      renderProducts(currentProducts);
      renderPagination(totalPages, currentPage);
    }
  }
}

function addToCart(id, price, thumbnail, description, title) {
  const existingProduct = cartItems.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    const cartProduct = {
      id: id,
      price: price,
      quantity: 1,
      thumbnail: thumbnail,
      description: description,
      title: title
    };
    cartItems.push(cartProduct);
  }

  sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  console.log('Item added to cart:', cartItems);
  redirectToCart();
}

function redirectToCart() {
  const url = 'cart.html';
  window.location.href = url;
}
