import { products } from "./constant.js";

const productsContainer = document.querySelector(".main__products");

const spinner = document.querySelector(".lds-ellipsis");

let isLoading = true;

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
                <span class="main__products__item-quantity">2</span>
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
  } catch (error) {}
}

createProductList();
