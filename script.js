let content = document.getElementById("mainContainer");
let dropdownsize = document.getElementById("dropdownsize");
let search_bar = document.getElementsByClassName("search_bar")[0];
let paginationList = document.querySelector("#pagination-list");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
let selectedDropdownValue = sessionStorage.getItem("selectedDropdownValue");
let currentPage = parseInt(sessionStorage.getItem("currentPage")) || 1;
let storedCurrentProducts = sessionStorage.getItem("currentProducts");
let productsList = [];
let recordsPerPage = dropdownsize.value;
let currentProducts = storedCurrentProducts
? JSON.parse(storedCurrentProducts)
: [];
let productsPerPage = parseInt(recordsPerPage);
let totalPages = Math.ceil(productsList.length / productsPerPage);

window.addEventListener("DOMContentLoaded", () => {
  window.scrollTo({ top: 0 });
  currentPage = parseInt(sessionStorage.getItem("currentPage")) || 1;
  currentProducts = storedCurrentProducts
    ? JSON.parse(storedCurrentProducts)
    : [];
    renderProducts(currentProducts);
    
});

(async function () {
  try {
    let response = await fetch("https://dummyjson.com/products");
    let data = await response.json();
    productsList = data.products;
    recordsPerPage = dropdownsize.value;
    productsPerPage = parseInt(recordsPerPage);
    totalPages = Math.ceil(productsList.length / productsPerPage);
    currentProducts = storedCurrentProducts
    ? JSON.parse(storedCurrentProducts)
    : [];
  } catch (error) {
    console.log("Error:", error);
  }
  renderProducts(currentProducts);
  renderPagination(totalPages, currentPage);
})();

function imagesContainer() {
  recordsPerPage = dropdownsize.value;
  productsPerPage = parseInt(recordsPerPage);
  totalPages = Math.ceil(productsList.length / productsPerPage);
  currentProducts = productsList.slice(0, recordsPerPage);
  currentProducts = storedCurrentProducts
    ? JSON.parse(storedCurrentProducts)
    : [];
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
          <a class="download-link" href="#" onclick="downloadImage('${
            product.thumbnail
          }', '${product.title}');">
            <i class="fas fa-download" id="fontAwesomeIcon"></i>
          </a>
          <img class="images" src="${
            product.thumbnail
          }" width="250px" height="150px" alt="Image failed to load"/>
          <h2>${product.title}</h2>
          <p class="tooltip">
            <span class="tooltip-content">${product.description}</span>
            ${product.description.slice(0, 25)}${
        product.description.length > 25 ? "..." : ""
      }
          </p>
          <h3>${"$" + product.price}</h3>
          <button class="button" onclick="addToCart('${product.id}', '${
        product.price
      }', '${product.thumbnail}', '${product.description.replace(
        "'",
        "\\'"
      )}', '${product.title.replace("'", "\\'")}')">ADD TO CART</button>
      </div>`;
      content.innerHTML += out;
    });
  }
}

dropdownsize.onchange = function () {
  currentPage = 1;
  recordsPerPage = dropdownsize.value;
  productsPerPage = parseInt(recordsPerPage);
  totalPages = Math.ceil(productsList.length / productsPerPage);
  currentProducts = productsList.slice(0, recordsPerPage);
  renderProducts(currentProducts);
  renderPagination(totalPages, currentPage);
  sessionStorage.setItem("selectedDropdownValue", dropdownsize.value);
};

if (selectedDropdownValue) {
  dropdownsize.value = selectedDropdownValue;
  productsPerPage = parseInt(selectedDropdownValue);
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
};

searchButton.onclick = function () {
  let searchTerm = searchInput.value.toLowerCase();
  let filteredProducts = performSearch(searchTerm);
  totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  currentProducts = filteredProducts.slice(0, productsPerPage);
  renderProducts(currentProducts);
  renderPagination(totalPages, currentPage);
};

function renderPagination(totalPages, currentPage) {
  let paginationHTML = "";

  if (totalPages > 0) {
    paginationHTML += `<li class="prev"><a href="#" id="prev">&#139;</a></li>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      paginationHTML += `<li class="list active"><a href="#" data-page="${i}">${i}</a></li>`;
    } else {
      paginationHTML += `<li class="list"><a href="#" data-page="${i}">${i}</a></li>`;
    }
  }
  paginationHTML += `<li class="next"><a href="#" id="next">&#155;</a></li>`;
  paginationList.innerHTML = paginationHTML;

  let pageLinks = paginationList.querySelectorAll("a[data-page]");
  pageLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0 });

      let clickedPage = parseInt(e.target.getAttribute("data-page"));
      currentPage = clickedPage;
      sessionStorage.setItem("currentPage", currentPage);
      let startIndex = (currentPage - 1) * productsPerPage;
      let endIndex = startIndex + productsPerPage;
      currentProducts = productsList.slice(startIndex, endIndex);
      sessionStorage.setItem(
        "currentProducts",
        JSON.stringify(currentProducts)
      );
      renderProducts(currentProducts);
      renderPagination(totalPages, currentPage);

    });
  });

  let prevButton = document.getElementById("prev");
  let nextButton = document.getElementById("next");

  // if (prevButton) {
    prevButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0 });
      if (currentPage > 1) {
        currentPage--;
        sessionStorage.setItem("currentPage", currentPage);
        let startIndex = (currentPage - 1) * productsPerPage;
        let endIndex = startIndex + productsPerPage;
        currentProducts = productsList.slice(startIndex, endIndex);
        sessionStorage.setItem(
          "currentProducts",
          JSON.stringify(currentProducts)
        );
        renderProducts(currentProducts);
        renderPagination(totalPages, currentPage);
        sessionStorage.setItem("currentPage", currentPage);
      }
    });
  // }

  if (currentPage === 1) {
      prevButton.style.display = "";
  } else {
    prevButton.style.display = "block";
  }

  nextButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0 });
    if (currentPage < totalPages) {
      currentPage++;
      sessionStorage.setItem("currentPage", currentPage);
      let startIndex = (currentPage - 1) * productsPerPage;
      let endIndex = startIndex + productsPerPage;
      currentProducts = productsList.slice(startIndex, endIndex);
      sessionStorage.setItem(
        "currentProducts",
        JSON.stringify(currentProducts)
      );
      renderProducts(currentProducts);
      renderPagination(totalPages, currentPage);

    }
  });

  if (currentPage === totalPages) {
    nextButton.style.display = "none";
  } else {
    nextButton.style.display = "block";
  }
}

function downloadImage(imageUrl, title) {
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      let downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${title}.png`;
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);
    })
    .catch((error) => {
      console.error("Error downloading image:", error);
    });
}

function addToCart(id, price, thumbnail, description, title) {
  let existingProduct = cartItems.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    let cartProduct = {
      id: id,
      price: price,
      quantity: 1,
      thumbnail: thumbnail,
      description: description,
      title: title,
    };
    cartItems.push(cartProduct);
  }

  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  console.log("Item added to cart:", cartItems);
  redirectToCart();
}

function redirectToCart() {
  let url = "cart.html";
  window.location.href = url;
}
