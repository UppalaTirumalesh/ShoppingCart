let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
let stateSelect = document.getElementById("states");
let districtSelect = document.getElementById("districts");
let goBackButton = document.getElementById("goBackButton");
let modal = document.getElementById("modal");
let closeModal = document.getElementsByClassName("close")[0];
let goToShoppingButton = document.getElementById("goToShoppingButton");
let placeOrderButton = document.getElementById("placeOrderButton");
let creditCardAndDebitCard = document.getElementById("creditCardAndDebitCard");
let paymentCards = document.getElementById("paymentCards");
let confirmButton1 = document.getElementById("confirm1");
let confirmButton2 = document.getElementById("confirm2");
let confirmButton3 = document.getElementById("confirm3");
let billingContainer = document.getElementById("billingContainer");
let paymentContainer = document.getElementById("paymentContainer");
let confirmationContainer = document.getElementById("confirmationContainer");
let progress = document.querySelector(".progress");
let googlepay = document.getElementById("googlepay");
let phonepay = document.getElementById("phonepay");
let paytm = document.getElementById("paytm");
let cashOnDelivery = document.getElementById("cashOnDelivery");
let checkboxProgressBar = document.getElementById("checkboxProgressBar");

window.addEventListener("DOMContentLoaded", () => {
  if (cartItems.length === 0) {
    window.location.href = "index.html";
  }
});

cashOnDelivery.addEventListener("click", () => {
  if (cashOnDelivery.checked) {
    confirmButton3.style.display = "block";
    paymentCards.style.display = "none";
  } else {
    confirmButton3.style.display = "none";
  }
});

googlepay.addEventListener("click", () => {
  if (googlepay.checked) {
    confirmButton3.style.display = "block";
    paymentCards.style.display = "none";
  } else {
    confirmButton3.style.display = "none";
  }
});

phonepay.addEventListener("click", () => {
  if (phonepay.checked) {
    confirmButton3.style.display = "block";
    paymentCards.style.display = "none";
  } else {
    confirmButton3.style.display = "none";
  }
});

paytm.addEventListener("click", () => {
  if (paytm.checked) {
    confirmButton3.style.display = "block";
    paymentCards.style.display = "none";
  } else {
    confirmButton3.style.display = "none";
  }
});

confirmButton1.addEventListener("click", () => {
  if (validateForm()) {
    billingContainer.style.display = 'none';
    paymentContainer.style.display = 'block';
    updateProgressBar(30);
  } else {
      paymentContainer.style.display = 'none';
      confirmationContainer.style.display = 'block';
    }
});

confirmButton2.addEventListener("click", () => {
  if (validateForm2()) {
    paymentContainer.style.display = 'none';
    confirmationContainer.style.display = "block";
    updateProgressBar(72);
  } else {
    confirmationContainer.style.display = "none";
  }
});

confirmButton3.addEventListener("click", () => {
  paymentContainer.style.display = 'none';
  confirmationContainer.style.display = "block";
  updateProgressBar(72);
});

checkboxProgressBar.addEventListener("change", () => {
  if (checkboxProgressBar.checked) {
    placeOrderButton.style.display = "block";
  } else {
    placeOrderButton.style.display = "none";
  }
});

stateSelect.addEventListener("change", () => {
  let selectedState = stateSelect.value;
  updateDistrictOptions(selectedState);
});

creditCardAndDebitCard.addEventListener("click", () => {
  if (creditCardAndDebitCard.checked) {
    paymentCards.style.display = "block";
  } else {
    paymentCards.style.display = "none";
  }
});

goBackButton.addEventListener("click", () => {
  window.location.href = "cart.html";
});

closeModal.addEventListener("click", () => {
  closeModalFunction();
});

goToShoppingButton.addEventListener("click", () => {
  sessionStorage.removeItem("cartItems");
  closeModalFunction();
  window.location.href = "index.html";
});

history.pushState(null, null, location.href);
window.onpopstate = () => {
  window.location.href = "index.html";
};

placeOrderButton.addEventListener("click", () => {
  if (validateForm()) {
    showModal();
    updateProgressBar(100);
    sessionStorage.removeItem("cartItems");
  }
});

function validateForm() {
  let fname = document.getElementById("fname").value.trim();
  let lname = document.getElementById("lname").value.trim();
  let phone = document.getElementById("mobile").value.trim();
  let alternatemobile = document.getElementById("alternatemobile").value.trim();
  let email = document.getElementById("email").value.trim();
  let address = document.getElementById("adr").value.trim();
  let selectedState = stateSelect.value;
  let selectedDistrict = districtSelect.value;

  let nameRegex = /^[a-zA-Z\s]+$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let phoneRegex = /^\d{10}$/;

  if (
    fname === "" ||
    lname === "" ||
    email === "" ||
    phone === "" ||
    alternatemobile === "" ||
    selectedState === "" ||
    selectedDistrict === ""
  ) {
    alert("Please fill in all the fields in Billing Address.");
    return false;
  }

  if (!fname.match(nameRegex)) {
    document.getElementById("fname").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("fname").style.border = "1px solid #ccc";
  }

  if (!lname.match(nameRegex)) {
    document.getElementById("lname").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("lname").style.border = "1px solid #ccc";
  }

  if (!phone.match(phoneRegex)) {
    document.getElementById("mobile").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("mobile").style.border = "1px solid #ccc";
  }

  if (!alternatemobile.match(phoneRegex)) {
    document.getElementById("alternatemobile").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("alternatemobile").style.border = "1px solid #ccc";
  }

  if (!email.match(emailRegex)) {
    document.getElementById("email").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("email").style.border = "1px solid #ccc";
  }

  if (address === "") {
    alert("Please enter your address.");
    return false;
  }

  if (selectedState === "") {
    alert("Please select a state.");
    return false;
  }

  if (selectedDistrict === "") {
    alert("Please select a district.");
    return false;
  }

  return true;
}

function validateForm2() {
  let cardName = document.getElementById("cname").value.trim();
  let cardNumber = document.getElementById("ccnum").value.trim();
  let cvvNumber = document.getElementById("cvv").value.trim();
  let expmonth = document.getElementById("expmonth").value.trim();

  let creditCardNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  let creditCardNumberRegex = /\b\d{4}-\d{4}-\d{4}-\d{4}\b/;
  let creditCardCVVRegex = /^\d{3}$/;

  if (cardName === "" || cardNumber === "" || cvvNumber === "") {
    alert("Please fill in all the fields in Payment Details.");
    return false;
  }

  if (expmonth === "") {
    alert("Please enter your expected Month and Year.");
    return false;
  }

  if (!cardName.match(creditCardNameRegex)) {
    document.getElementById("cname").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("cname").style.border = "1px solid #ccc";
  }

  if (!cardNumber.match(creditCardNumberRegex)) {
    document.getElementById("ccnum").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("ccnum").style.border = "1px solid #ccc";
  }

  if (!cvvNumber.match(creditCardCVVRegex)) {
    document.getElementById("cvv").style.border = "thick solid red";
    return false;
  } else {
    document.getElementById("cvv").style.border = "1px solid #ccc";
  }

  return true;
}

function updateDistrictOptions(selectedState) {
  districtSelect.innerHTML = "";

  if (selectedState === "Andhra Pradesh") {
    addDistrictOption("East Godavari");
    addDistrictOption("West Godavari");
    addDistrictOption("Chittoor");
    addDistrictOption("Nellore");
  } else if (selectedState === "Telangana") {
    addDistrictOption("Warangal");
    addDistrictOption("Nizamabad");
    addDistrictOption("Hyderabad");
    addDistrictOption("Adilabad");
  } else if (selectedState === "Tamil Nadu") {
    addDistrictOption("Coimbatore");
    addDistrictOption("Madurai");
    addDistrictOption("Kancheepuram");
    addDistrictOption("Kanyakumari");
  } else if (selectedState === "Karnataka") {
    addDistrictOption("Mysuru");
    addDistrictOption("Kolar");
    addDistrictOption("Chikkamagaluru");
    addDistrictOption("Bagalkote");
  }
}

function addDistrictOption(district) {
  let option = document.createElement("option");
  option.value = district;
  option.textContent = district;
  districtSelect.appendChild(option);
}

function updateProgressBar(percentage) {
  progress.style.width = `${percentage}%`;
}

function showModal() {
  modal.style.display = "block";
}

function closeModalFunction() {
  modal.style.display = "none";
  updateProgressBar(72);
}
