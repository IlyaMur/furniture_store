// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

const removeItem = (id) => {
  cart = cart.filter((cartItem) => cartItem.id !== id);
};
const displayCartItemCount = () => {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
};

const displayCartTotal = () => {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);

  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`;
};

const increaseAmount = (id) => {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });

  return newAmount;
};

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    let product = findProduct(id);
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    // add to the DOM
    addToCartDOM(product);
  } else {
    const amount = increaseAmount(id);

    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    const newAmount = items.find((item) => item.dataset.id === id);
    newAmount.textContent = amount;
  }
  displayCartItemCount();
  displayCartTotal();
  setStorageItem('cart', cart);
  openCart();
};

const displayCartItemDOM = () => {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
};

const setupCartFunctionality = () => {
  cartItemsDOM.addEventListener('click', (e) => {
    const el = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;

    // remove
    if (el.classList.contains('cart-item-remove-btn')) {
      removeItem(id);
      parent.parentElement.remove();
    }
    // increase
    // decrease

    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
};
const init = () => {
  // display amount of cart items
  displayCartItemCount();
  // display total
  displayCartTotal();
  // add all cart items to the dom
  displayCartItemDOM();
  // set up cart functionality
  setupCartFunctionality();
};

init();
