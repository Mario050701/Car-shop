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
