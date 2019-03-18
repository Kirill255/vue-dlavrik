import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import menu from './modules/menu';
import products from './modules/products';
import cart from './modules/cart';
import form from './modules/form';

export const store = new Vuex.Store({
  modules: {
    menu,
    products,
    cart,
    form
  },
  strict: process.env.NODE_ENV !== 'production'
});


