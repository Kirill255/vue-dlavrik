/* тут немного переделан примет из index2, добавлены поля status в массив info, для немного другой реализации подсчёта начального значения валидных полей, сдесь создан геттер done, который циклом проходит по массиву info, и проверяет поле status, если оно true (а оно true только если поле валидно), то добавляет +1 к переменной которую возвращает этот геттер, сообственно это тоже самое поле done, которое показывает кол-во волидных инпуов, дальше при создании в компоненте Input.vue в хуке mounted() вызывается событие "changeStatus", которое запускает обрабтчик onChangeStatus() в компоненте Form.vue, который вызывает экшен "updateStatus", который вызывает одноимённую мутацию "updateStatus" в которую передаётся index текущего инпута и его status, таким образов первоначальная валидация запускается в хуке mounted() в компоненте Input.vue, ну и дальше этоже событие "changeStatus" запускается при каждом изменение статуса в поле watch, кстате наверное поле status в массиве info, можно не добавлять вручную( потому что данных может быть очень много), лучше сделать цикл в хуке created/beforeMount в компоненте Form.vue и реактивно присвоить каждому объекту в массиве info все дополнительные нужные поля */


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
        pattern: /^[a-zA-Z ]{2,30}$/,
        status: false
      },
      {
        name: "Phone",
        value: "",
        pattern: /^[0-9]{7,14}$/,
        status: false
      },
      {
        name: "Email",
        value: "some@mail.ru",
        pattern: /.+@.+/,
        status: true
      },
      {
        name: "Some Field 1",
        value: "",
        pattern: /.+/,
        status: false
      },
      {
        name: "Some Field 2",
        value: "",
        pattern: /.+/,
        status: false
      }
    ],
    formProcess: false,
    formSubmitted: false,
  },
  getters: {
    info(state) {
      return state.info;
    },
    done(state) {
      let done = 0;
      for (let i = 0; i < state.info.length; i++) {
        if (state.info[i].status) {
          done++;
        }
      }
      return done;
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
    updateValue(state, payload) {
      // console.log('state :', state);
      state.info[payload.index].value = payload.value;
    },
    updateStatus(state, payload) {
      state.info[payload.index].status = payload.status;
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
    updateStatus(store, payload) {
      store.commit("updateStatus", payload);
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
