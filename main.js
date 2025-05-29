const burgerMenuElement = document.querySelector("#burger-menu");

const navLinksElement = document.querySelector("#nav-links");

burgerMenuElement.addEventListener("click", () => {
  navLinksElement.classList.toggle("active");
});
