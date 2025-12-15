"use strict";

// for overlay

const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const nav = document.querySelector("nav");
const overlay = document.querySelector("#overlay");

let isOpen = false;

function openCloseMenu(isOpen) {
  nav.classList.toggle("show", isOpen);
  overlay.classList.toggle("show", isOpen);
}

menu.addEventListener("click", function () {
  isOpen = true;
  openCloseMenu();
});

close.addEventListener("click", function () {
  isOpen = false;
  openCloseMenu();
});

overlay.addEventListener("click", function (e) {
  const link = e.target;
  const clickedInsideNav = nav.contains(link);
  const clickedOverlay = overlay.contains(link);

  if (!clickedInsideNav && clickedOverlay && isOpen) {
    openCloseMenu();
  }
});

// for cart
const cartDialog = document.querySelector(".cart-dialog");
const cart = document.querySelector(".cart-logo");
const closeCart = document.querySelector(".dialog-head .close");

cartDialog.classList.add("hidden");

function cartBox(isOpen) {
  cartDialog.classList.toggle("hidden", isOpen);
}

cart.addEventListener("click", function () {
  isOpen = true;
  cartBox();
});
closeCart.addEventListener("click", function () {
  isOpen = false;
  cartBox();
});

// for log out
const logOut = document.querySelector(".log-out");
const avatar = document.querySelector(".avatar");

function forLogOut(isOpen) {
  logOut.classList.toggle("hidden", isOpen);
}

avatar.addEventListener("click", function () {
  isOpen = true;
  forLogOut();
});

const slides = document.querySelectorAll(".slide");
const leftBtn = document.querySelector(".slider__btn--left");
const rightBtn = document.querySelector(".slider__btn--right");

let currentSlide = 0;
function goToSlide() {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === currentSlide ? 1 : 0;
  });
}
goToSlide();

function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  goToSlide();
}
function prevSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  goToSlide();
}

rightBtn.addEventListener("click", nextSlide);
leftBtn.addEventListener("click", prevSlide);

const quantity = document.querySelector(".quantity");
const plusBtn = document.querySelector(".plus");
const minusBn = document.querySelector(".minus");

let currentNumberDisplayed = 0;

function forPlus() {
  currentNumberDisplayed++;
  quantity.textContent = currentNumberDisplayed;
}
function forMinus() {
  if (quantity.textContent <= 0) return;
  currentNumberDisplayed--;
  quantity.textContent = currentNumberDisplayed;
}

plusBtn.addEventListener("click", forPlus);
minusBn.addEventListener("click", forMinus);

// add to cart fn
const cartBtn = document.querySelector(".add-to-cart");
const contentCart = document.querySelector(".content");
const price = document.querySelector(".discounted-price");

let contentOfCart = null;
let itemToCart = {};

const productDescs = price
  .closest(".product-description")
  .querySelector(".item-name");

const productPrices = price
  .closest(".discount-price")
  .querySelector(".discounted-price");

function extractFirstWord(str) {
  const withoutFirstWord = str.split("").slice(1).join("");
  return Number(withoutFirstWord);
}

const productPrice = extractFirstWord(productPrices.textContent);

const renderCart = function () {
  // render CART

  itemToCart.quantity = currentNumberDisplayed;
  const cartItemIcon = document.querySelector(".small");
  itemToCart.productnumber = cartItemIcon.dataset.thumbnail = 1;

  if (contentOfCart) {
    contentCart.textContent = "";
    const htmlString = `
    <img src="/ecommerce-product-page-main/images/image-product-${
      itemToCart.productnumber
    }-thumbnail.jpg" />
    <div class="cart-flex">
    <p class="cartProductDesc">${productDescs.textContent}</p>
    <p>$${productPrice} x ${currentNumberDisplayed}<span>  $${
      productPrice * currentNumberDisplayed
    }.00</span></p>
    </div>
    <img src="/ecommerce-product-page-main/images/icon-delete.svg" class="delete-cart" />
    `;
    contentCart.innerHTML = htmlString;
  }

  // for Delete
  const deleteCart = document.querySelector(".delete-cart");

  function forDelete() {
    if (contentOfCart === null) {
      contentCart.textContent = "Your Cart is Empty";
    }
  }

  deleteCart.addEventListener("click", function (e) {
    if (!e.target.matches(".delete-cart")) return;
    contentOfCart = null;
    forDelete();
  });
};

cartBtn.addEventListener("click", function () {
  contentOfCart = 1;
  renderCart();
});

// modal for product image

const productImage = document.querySelector(".product-images");
const mainImage = productImage.querySelector(".main-image");

let isModalOn = false;

function forModalDisplay() {
  const modalCard = document.createElement("div");
  modalCard.classList.add("modalCard");

  const string = `<div class="modalContainer">
  <p class="close-modal">X</p>
  <div class="main-image">
            <img
              src="/ecommerce-product-page-main/images/image-product-1.jpg"
              alt="Fall limited Edition sneakers Image One"
              data-thumbnail="one"
            />
          </div>
          <div class="thumbnail-images">
            <img
              src="/ecommerce-product-page-main/images/image-product-1-thumbnail.jpg"
              alt="thumbnail-images one"
              data-thumbnail="1"
              class="small"
            /><img
              src="/ecommerce-product-page-main/images/image-product-2-thumbnail.jpg"
              alt="thumbnail-images two"
              data-thumbnail="2"
              class="small"
            /><img
              src="/ecommerce-product-page-main/images/image-product-3-thumbnail.jpg"
              alt="thumbnail-images three"
              data-thumbnail="3"
              class="small"
            /><img
              src="/ecommerce-product-page-main/images/image-product-4-thumbnail.jpg"
              alt="thumbnail-images four"
              data-thumbnail="4"
              class="small"
            />
          </div>
        </div>
       <button class="slideBtn sliderBtn--left"><</button>
        <button class="slideBtn sliderBtn--right">></button>
        </div>`;

  modalCard.innerHTML = string;
  const mainSection = document.querySelector(".modalCardAll");
  mainSection.append(modalCard);
}

function forModal() {
  if (isModalOn) {
    overlay.style.display = "block";
    forModalDisplay();
  }
}

mainImage.addEventListener("click", function (e) {
  isModalOn = true;
  forModal();
});

// for close modal
const closeModalBtn = document.querySelector(".close-modal");
const modalContainer = document.querySelector(".modalCardAll");

console.log(modalBoxes);

modalContainer.addEventListener("click", function (e) {
  const link = e.target;
  isModalOn = false;
  if (link.matches(".close-modal")) {
    overlay.style.display = "none";
    modalBoxes.style.opacity = 0;
  }
});
