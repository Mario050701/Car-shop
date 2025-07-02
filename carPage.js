const goBackBtnElement = document.querySelector("#goBackBtn");

goBackBtnElement.addEventListener("click", () => {
  window.location.href = "./index.html";
});
const carContainerElement = document.querySelector(".single-car-container");
const params = new URLSearchParams(window.location.search);
const carId = params.get("id");

if (!carId) {
  carContainerElement.innerHTML = "<p>There is no car ID in the URL.</p>";
} else {
  fetchCarById(carId);
}

async function fetchCarById(id) {
  try {
    const response = await fetch(
      `https://cars-api-rjtn.onrender.com/api/cars/${id}`
    );
    if (!response.ok) throw new Error("Car is not found!");
    const car = await response.json();
    renderCarDetails(car);
  } catch (error) {
    console.error("Failed to load data:", error);
    carContainerElement.innerHTML = `<p>Failed to load data.</p>`;
  }
}

function renderCarDetails(car) {
  carContainerElement.innerHTML = `
    <div class="car-detail">
      <img src="${car.image}" alt="${car.model}" />
      <div class="car-info-text">
        <h2>${car.brand} ${car.model}</h2>
        <div class="car-data">
        <p class="car-description">As the gold standard for headphones, the classic XX99 Mark I offers <br>
        detailed and accurate audio reproduction for audiophiles, mixing  <br>
        engineers, and music aficionados alike in studios and on the go.</p>
        <p><strong>Year:</strong> ${car.year}</p>
        <p><strong>Color:</strong> ${car.color}</p>
        <p><strong>Fuel:</strong> ${car.fuelType}</p>
        </div>
            <p class="car-price">$ ${car.price}</p>

               <div class="controls-wrapper">
      <button class="minus-btn" id="minusBtn">-</button>
      <span class= "quantity-value" id="quantityValue">1</span>
      <button class="plus-btn" id="plusBtn">+</button>

      <button class="btn" id="addToCartBtn">Add to Cart</button>
    </div>
      </div>
    </div>
  `;

  let quantity = 1;
  const quantityValue = document.getElementById("quantityValue");
  const plusBtn = document.getElementById("plusBtn");
  const minusBtn = document.getElementById("minusBtn");
  const addToCartBtn = document.getElementById("addToCartBtn");

  plusBtn.addEventListener("click", () => {
    quantity++;
    quantityValue.textContent = quantity;
  });

  minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
    }
  });

  addToCartBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex((item) => item._id === car._id);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ ...car, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("The car has been added to your cart!");
  });
}
