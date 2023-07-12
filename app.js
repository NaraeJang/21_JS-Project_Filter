// SELECT .products-container
const productContainer = document.querySelector(".products-container");
// SELECT form
const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");
// SELECT .companies
const companies = document.querySelector(".companies");

let filteredProducts = [...products];

window.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  displayButtons();
});

companies.addEventListener("click", (e) => {
  const el = e.target;

  if (el.classList.contains("company-btn")) {
    if (el.dataset.id === "all") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((product) => {
        return product.company === el.dataset.id;
      });
    }
    displayProducts();
  }
});

// FUNCTIONS
const displayProducts = () => {
  if (filteredProducts < 1) {
    productContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
  }

  productContainer.innerHTML = filteredProducts
    .map((product) => {
      const { title, company, image, price } = product;

      return `<article class="product">
  <img src="${image}" alt="${title}" class="product-img img">
  <!-- footer -->
  <footer>
    <h5 class="product-name">${title}</h5>
    <span class="product-price">$${price}</span>
  </footer>
  </article>`;
    })
    .join("");
};

form.addEventListener("keyup", (e) => {
  const inputValue = searchInput.value;
  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });

  displayProducts();
});

const displayButtons = () => {
  const buttons = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];

  companies.innerHTML = buttons
    .map((button) => {
      return ` <button class="company-btn" data-id="${button}">${button}</button>`;
    })
    .join("");
};
