
let stateSelect = document.getElementById("states");
let districtSelect = document.getElementById("districts");
let goBackButton = document.getElementById("goBackButton");
let modal = document.getElementById("modal");
let closeModal = document.getElementsByClassName("close")[0];
let goToShoppingButton = document.getElementById("goToShoppingButton");
let placeOrderButton = document.getElementById("placeOrderButton");


stateSelect.addEventListener("change", () => {
  let selectedState = stateSelect.value;
  updateDistrictOptions(selectedState);
});

goBackButton.addEventListener("click", () => {
  window.location.href = "cart.html";
});

closeModal.addEventListener("click", () => {
  closeModalFunction();
});

goToShoppingButton.addEventListener("click", () => {
  closeModalFunction();
  window.location.href = "index.html";
});

placeOrderButton.addEventListener("click", () => {
  if (validateForm()) {
    showModal();
  }
});

function validateForm() {
  let name = document.getElementById("fname").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("mobile").value.trim();
  let address = document.getElementById("adr").value.trim();
  let selectedState = stateSelect.value;
  let selectedDistrict = districtSelect.value;

  let nameRegex = /^[a-zA-Z\s]+$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let phoneRegex = /^\d{10}$/;

  if (name === "" || email === "" || phone === "" || address === "" || selectedState === "" || selectedDistrict === "") {
    alert("Please fill in all the fields.");
    return false;
  }

  if (!name.match(nameRegex)) {
    alert("Please enter a valid name.");
    return false;
  }

  if (!email.match(emailRegex)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (!phone.match(phoneRegex)) {
    alert("Please enter a valid 10-digit phone number.");
    return false;
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

function updateDistrictOptions(selectedState) {
  districtSelect.innerHTML = ""; // Clear district dropdown

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

function showModal() {
  modal.style.display = "block";
}

function closeModalFunction() {
  modal.style.display = "none";
}
