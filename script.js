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
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

goToSlide(0);

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};

rightBtn.addEventListener("click", nextSlide);
leftBtn.addEventListener("click", prevSlide);
