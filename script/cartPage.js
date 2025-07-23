const cartContainer = document.getElementById("cartItems");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((car, index) => {
    const carDiv = document.createElement("div");
    carDiv.classList.add("cart-item");

    carDiv.innerHTML = `
      <img src="${car.image}" alt="${car.model}"  />
      <div>
        <h3>${car.brand} ${car.model}</h3>
        <p><strong>Year:</strong> ${car.year}</p>
        <p><strong>Price:</strong> $${car.price}</p>
        <p><strong>Quantity:</strong> ${car.quantity}</p>
        <p><strong>Total:</strong> $${car.price * car.quantity}</p>
        <button onclick="deleteCar(${index})">Delete</button>
      </div>
    `;

    cartContainer.appendChild(carDiv);
  });
}

function deleteCar(index) {
  cart.splice(index, 1); // izbaci auto
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(); // ponovo prikaži
}

// Inicijalno prikazivanje
renderCart();
