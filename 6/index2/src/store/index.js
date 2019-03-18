/* Пока писал код, то вприниципе держал всё в голове, но через месяц-два думаю тут без пол литра не разобраться =), опишу вкратце, при запуске приложения при создании компонента Form.vue в хуке created() вызывается метод this.setstartValidDoneCount() который диспатчит одноимённый экшен "setstartValidDoneCount", в который передаётся начальное значение провалидированных инпутов (это на случай если у нас в обьекте info уже заданы некоторые значения, например email и др.), это начальное значение подтягивается через геттер "startValidDoneCount", дальше наш вызванный экшен вызывает одноимённую мутацию setstartValidDoneCount(), в которой в объект info добавляется ещё одно поле "done", добавляется через Vue.$set() чтобы поле было реактивным(во Vuex действуют теже правила реактивности что и во Vue), ну и сообственно всё, дальше уже у нас есть поле done, к которому компоненты могут обращаться опять же через одноимённый геттер done  */


import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    info: [
      {
        name: "Name",
        value: "",
        pattern: /^[a-zA-Z ]{2,30}$/
      },
      {
        name: "Phone",
        value: "",
        pattern: /^[0-9]{7,14}$/
      },
      {
        name: "Email",
        value: "some@mail.ru",
        pattern: /.+@.+/
      },
      {
        name: "Some Field 1",
        value: "",
        pattern: /.+/
      },
      {
        name: "Some Field 2",
        value: "",
        pattern: /.+/
      }
    ],
    // done: 0,
    formProcess: false,
    formSubmitted: false,
  },
  getters: {
    info(state) {
      return state.info;
    },
    done(state) {
      return state.done;
    },
    startValidDoneCount(state) {
      // let validDoneCount = state.done;
      let validDoneCount = 0;
      for (let i = 0; i < state.info.length; i++) {
        validDoneCount += state.info[i].pattern.test(state.info[i].value) ? 1 : 0;
      }
      return validDoneCount;
    },
    formProcess(state) {
      return state.formProcess;
    },
    formSubmitted(state) {
      return state.formSubmitted;
    },
    name(state) {
      return state.info[0].value;
    }
  },
  mutations: {
    setstartValidDoneCount(state, startCount) {
      Vue.set(state, "done", startCount);
    },
    calculateDone(state, status) {
      state.done += status ? 1 : -1;
    },
    updateValue(state, payload) {
      // console.log('state :', state);
      state.info[payload.index].value = payload.value;
    },
    onProcessSubmit(state) {
      state.formProcess = true;
    },
    onSubmitted(state) {
      state.formSubmitted = true;
      state.formProcess = false;
    }
  },
  actions: {
    setstartValidDoneCount(store, startCount) {
      store.commit("setstartValidDoneCount", startCount);
    },
    calculateDone(store, status) {
      store.commit("calculateDone", status);
    },
    updateValue(store, payload) {
      // console.log('store :', store);
      store.commit("updateValue", payload);
    },
    submitForm(store) {
      store.commit("onProcessSubmit");
      setTimeout(() => {
        store.commit("onSubmitted");
      }, 3000);
    }
  }
})
