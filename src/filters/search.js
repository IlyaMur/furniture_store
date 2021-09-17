import { getElement } from '../utils.js';
import display from '../displayProducts.js';
const setupSearch = (store) => {
  const form = getElement('.input-form');
  const nameInput = getElement('.search-input');
  form.addEventListener('keyup', () => {
    const value = nameInput.value;
    if (value) {
      const newStore = store.filter((product) => {
        let { name } = product;
        name = name.toLowerCase();
        if (name.startsWith(value)) {
          return product;
        }
      });
      if (newStore) {
        getElement('.products-container').innerHTML =
          '<h3 class="filter-error">Sorry, no products here...</h3>';
      } else {
        display(newStore, getElement('.products-container', true));
      }
    } else {
      display(store, getElement('.products-container'), true);
    }
  });
};

export default setupSearch;
