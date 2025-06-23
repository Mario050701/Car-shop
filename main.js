const burgerMenuElement = document.querySelector("#burger-menu");

const navLinksElement = document.querySelector("#nav-links");
const scrollToTopElement = document.querySelector("#scrollToTopBtn");

burgerMenuElement.addEventListener("click", () => {
  navLinksElement.classList.toggle("active");
});

scrollToTopElement.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

let extensionsData = [];

async function fetchData() {
  try {
    const response = await fetch("https://cars-api-rjtn.onrender.com/api/cars");
    const data = await response.json();
    extensionsData = data;

    renderCars(data);
  } catch (error) {
    console.error(error);
  }
}
function renderCars(cars) {
  const carList = document.querySelector("#car-list");
  carList.innerHTML = "";

  cars.forEach((car) => {
    const carCard = document.createElement("div");
    carCard.classList.add("car");

    carCard.innerHTML = `
  <div class="car-img">
    <img src="${car.image}" alt="${car.model}" />
     <img class="bookmark" src="assets/bookmark.png" alt="bookmark" />
  </div>
 
  <div class="card-content">
    <h4>${car.brand} ${car.model} – ${car.year}</h4>
    <span>4.0 D5 PowerPulse Momentum 5dr AWD…</span>
    <hr class="line" />
    <div class="car-info">
      <div class="car-info-group">
        <img src="assets/milesLogo.png" alt="Miles" />
        <p>${car.color || "50"} Miles</p>
      </div>
      <div class="car-info-group">
        <img src="assets/petrol.png" alt="Fuel" />
        <p>${car.fuelType || "Diesel"}</p>
      </div>
      <div class="car-info-group">
        <img src="assets/gearbox.png" alt="Gearbox" />
        <p>Manual</p>
      </div>
    </div>

    <hr class="line" />

    <div class="car-price">
      <p>$${car.price}</p>
      <button class="btn-details">
        View details
        <img src="assets/blackArrow.png" alt="arrow" />
      </button>
    </div>
  </div>
`;

    carList.appendChild(carCard);
  });
}

fetchData();
