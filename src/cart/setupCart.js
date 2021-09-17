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
const cartItemsDOM = getElement('.cart-item');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

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

  console.log(total);
  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`;
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
  }
  displayCartItemCount();
  displayCartTotal();
  setStorageItem('cart', cart);
  openCart();
};

const init = () => {
  console.log(cart);
};

init();
