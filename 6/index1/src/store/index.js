import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    count: 0,
    price: 1000,
    orderState: null
  },
  getters: {
    count(state) {
      return state.count;
    },
    price(state) {
      return state.price;
    },
    orderState(state) {
      return state.orderState;
    },
    total(state) {
      return state.count * state.price;
    }
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      if (state.count > 0) {
        state.count--;
      }
    },
    incrementOn5(state, payload) {
      state.count += payload;
    },
    reset(state) {
      if (state.count > 0) {
        state.count = 0;
      }
    },
    orderSend(state) {
      state.orderState = "pending";
    },
    orderDone(state) {
      state.orderState = "done";
    },
    setCount(state, count) {
      // тут нужно обработать ввод пользователя, сейчас наш пример (не продакшн версия =)), нужно сделать нормальную регулярку или фильтр
      // которая обработает все случаи когда число отрицательное, когда флоат число, когда не цифры(а буквы или знаки), когда NaN и т.д.
      // note: сейчас count это у нас строка, это значение из инпута
      // count = count.replace(/[^0-9]/, ""); // это дерьмо не работает, нужно потом нагуглить что-то нормальное
      count = parseInt(+count); // сейчас просто на скорую руку самое простейшее что придумалось
      if (count < 0) {
        count = 0;
      }
      state.count = count;
    }
  },
  actions: {
    sendOrder(store, payload) {
      store.commit("orderSend");
      setTimeout(() => {
        console.log('payload :', payload);
        store.commit("orderDone");
      }, 2000);
    }
  }
});
