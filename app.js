import { products } from "./constant.js";

const productsContainer = document.querySelector(".main__products");
const cartContainer = document.querySelector(".main__sidebar__cart-items");
const totalPrice = document.querySelector(".total-price");

const spinner = document.querySelector(".lds-ellipsis");

let isLoading = true;
const cart = [
  // {
  //   name: "Vanilla Bean Creme Brulee",
  //   price: 7.0,
  //   quantity: 3,
  //   get totalPrice() {
  //     return this.price * this.quantity;
  //   },
  // },
  // {
  //   name: "Macaron Mix of Five",
  //   price: 8.0,
  //   quantity: 3,
  //   get totalPrice() {
  //     return this.price * this.quantity;
  //   },
  // },
];

const displayTotalPrice = () =>
  cart.forEach(
    (item) =>
      (totalPrice.textContent =
        Number(totalPrice.textContent) + item.totalPrice)
  );
displayTotalPrice();

const fakeAPI = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res(products), 2000);
    isLoading = false;
  });
};

async function createProductList() {
  try {
    const productsData = await fakeAPI();
    if (!isLoading) spinner.style.display = "none";

    productsData.forEach((product) => {
      const productTemplate = `
        <div class="main__products__product">
            <div class="main__products__image">
              <img
                src="./assets/images/image-${product.image}-desktop.jpg"
                class="main__products__image--image"
              />
              <button class="main__products__btn main__products__add-to-cart">
                <img
                  src="./assets/images/icon-add-to-cart.svg"
                  alt=""
                  srcset=""
                />
                Add to Cart
              </button>

              <button class="main__products__btn main__products__counter">
                <span class="main__products__item-dec"
                  ><img src="./assets/images/icon-decrement-quantity.svg"
                /></span>
                <span class="main__products__item-quantity">1</span>
                <span class="main__products__item-inc"
                  ><img src="./assets/images/icon-increment-quantity.svg"
                /></span>
              </button>
            </div>
            <div class="main__products__description">
              <p class="main__products__category">${product.category}</p>
              <h2 class="main__products__name">${product.name}</h2>
              <h3 class="main__products__price">$${product.price}</h3>
            </div>
          </div>
  `;

      productsContainer.insertAdjacentHTML("beforeend", productTemplate);
    });
    addProductToCart();
  } catch (error) {}
}
createProductList();

function displayCartItem() {
  cartContainer.innerHTML = "";
  cart.forEach((item) => {
    const itemTemplate = `
      <div class="main__sidebar__item">
        <p class="main__sidebar__item--name">${item.name}</p>
        <p class="main__sidebar__item--description">
          <span class="main__sidebar__quantity">${item.quantity}x</span> @ $${item.price}
          <span class="main__sidebar__total-quantity">$${item.totalPrice}</span>
        </p>

        <button class="main__sidebar__removeBtn">
          <img
            src="./assets/images/icon-remove-item.svg"
            alt=""
            srcset=""
          />
        </button>
      </div>
    `;

    cartContainer.insertAdjacentHTML("beforeend", itemTemplate);
  });
}
displayCartItem();

function addProductToCart() {
  const addtoCartBtns = document.querySelectorAll(
    ".main__products__add-to-cart"
  );
  addtoCartBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const selectedProduct = products[i];
      const item = {
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1,
        get totalPrice() {
          return this.price * this.quantity;
        },
      };
      cart.push(item);
      displayCartItem();
      btn.style.display = "none"; // hide add button
      btn.nextElementSibling.style.display = "flex"; // show quantity button
      quantity();
    });
  });
}

function quantity() {
  const quantityBtns = document.querySelectorAll(".main__products__counter");

  quantityBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.classList.contains("main__products__item-dec")) {
        console.log(e.target);
      }
    });
  });
}
