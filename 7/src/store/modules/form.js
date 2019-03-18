import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    info: [
      {
        name: "Name",
        value: "",
        pattern: /^[a-zA-Z ]{2,30}$/,
        status: false,
        activated: false
      },
      {
        name: "Phone",
        value: "",
        pattern: /^[0-9]{7,14}$/,
        status: false,
        activated: false
      },
      {
        name: "Email",
        value: "",
        pattern: /.+@.+/,
        status: false,
        activated: false
      },
      // {
      //   name: "Some Field 1",
      //   value: "",
      //   pattern: /.+/,
      //   status: false
      // },
      // {
      //   name: "Some Field 2",
      //   value: "",
      //   pattern: /.+/,
      //   status: false
      // }
    ],
    activated: false,
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
    },
    userInfo(state) {
      let userInfo = {};
      for (let i = 0; i < state.info.length; i++) {
        userInfo[state.info[i].name] = state.info[i].value;
      }
      return userInfo;
    }
  },
  mutations: {
    /* сделал две мутации разными способами (просто для примера, конечно нужно выбрать какой способ больше наравиться),
      обе мутации примерно одинаковые updateValue и updateStatus, различие состоит в способе вызова этих мутации в компоненте Form.vue,
      а именно,
      1) вызов эшена напрямую в шаблоне и передача в него одного аргумента, а именно объекта так как нам нужно передать два параметра
      а экшен принимает только один, например так @changeStatus="updateInputStatus({index: index, status: $event})",
      2) вызов обработчика по событию @updateValue="onUpdateValue(index, $event)" и уже в методах в обработчике вызвать экшен
        onUpdateValue(index, value) {
          this.updateInputValue({
            index: index,
            value: value
          });
        }
    */
    // updateValue(state, payload) {
    //   // console.log('state :', state);
    //   state.info[payload.index].value = payload.$event;
    // },
    updateValue(state, payload) {
      // console.log('payload :', payload);
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
    },
    clearingForm(state) {
      for (let i = 0; i < state.info.length; i++) {
        state.info[i].value = "";
        state.info[i].status = false;
        state.info[i].activated = false;
      }
      state.formProcess = false;
      state.formSubmitted = false;
    },
    updateActivated(state, payload) {
      state.info[payload.index].activated = payload.activated;
    }
  },
  actions: {
    updateStatus(store, payload) {
      // console.log('payload :', payload);
      store.commit("updateStatus", payload);
    },
    updateValue(store, payload) {
      // console.log('payload :', payload.$event);
      store.commit("updateValue", payload);
    },
    updateActivated(store, payload) {
      store.commit("updateActivated", payload);
    },
    // 1 вариант без передачи инфо о юзере и товарах
    // submitForm(store, payload) {
    //   // console.log('payload :', payload);
    //   store.commit("onProcessSubmit");
    //   setTimeout(() => {
    //     store.commit("onSubmitted");
    //     setTimeout(() => {
    //       store.commit("clearingForm");
    //     }, 3000);
    //   }, 3000);
    // },
    // 2 вариант с передачей товаров и инфо о юзере (но пока вывод просто в консоль)
    // submitForm(store, payload) {
    //   // console.log('store :', store);
    //   // в payload приходит массив с id продуктов из корзины товаров
    //   console.log('payload :', payload);
    //   // достаём наш объект с инфой о покупателе из геттера userInfo
    //   let userInfo = store.getters.userInfo;
    //   // ложим в этот объект новое свойство idOrderProducts со значением равным массиву с id продуктов из корзины товаров
    //   userInfo.idOrderProducts = payload;
    //   console.log('userInfo :', userInfo);
    //   // дальше по логике, этот объект с данными нужно передать на сервер (пока не решил как)

    //   store.commit("onProcessSubmit");
    //   setTimeout(() => {
    //     store.commit("onSubmitted");
    //     setTimeout(() => {
    //       store.commit("clearingForm");
    //     }, 3000);
    //   }, 3000);
    // },
    submitForm(store, payload) {
      // console.log('store :', store);
      let userInfo = store.getters.userInfo;

      userInfo.idOrderProducts = payload;
      console.log('userInfo :', userInfo);
      // дальше по логике, этот объект с данными нужно передать на сервер (пока не решил как)

      // -----------
      store.commit("onProcessSubmit");
      // это фейковый сервер-заглушка и я не могу туда отправить наш объект userInfo
      // но я для примера отправил туда те данные которые он принимает
      // впринципе этот объект нужно просто заменить на наш userInfo, ну и url заменить
      setTimeout(() => {
        Vue.http.post('https://jsonplaceholder.typicode.com/posts',
          {
            title: 'foo',
            body: 'bar',
            userId: 1
          },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(response => {
            // success callback
            // после успешного получения ответа вызываем мутации
            console.log("response ", response)
            store.commit("onSubmitted");
            setTimeout(() => {
              store.commit("clearingForm");
              // сообственно сделана экшен/мутация по очищению коризины в модуле cart и я вызываю её после отправки формы
              // ============= что-то не работает такой вызов мутации из другого модуля
              // store.dispatch("clearCart", null, { root: true });
              // store.commit("clearCart", null, { root: true });
              // на данный момент в доке почему-то не совсем точно указан этот момент, должна быть ссылка к модулю
              // код должен быть таким,  dispatch('nestedModule/actionName', payload, { root: true })
              store.dispatch("cart/clearCart", null, { root: true });
            }, 3000);
          }, error => {
            // error callback
            console.log(error)
          });
      }, 3000);

    }
  }
};



/* ===================================================================
Заметки:

var userInfo = {};
for (let i = 0; i < store.getters.info.length; i++) {
  userInfo[store.getters.info[i].name] = store.getters.info[i].value;
}
дальше в этот же объект нужно добавить информацию о заказе (пока не придумал как сюдаеё подтянуть)
userInfo[order] = order.value (всевдокод)

// этот код не рабочий он примерный, хотя может и рабочий =) я не проверял
Vue.http.post('products.json', userInfo)
    .then(response => response.json())
    .then(data => {
      store.commit('loadItems', data);
    }, error => {
      console.log("error: ", error);
    });


// примерно вот так должно быть +- когда POST запрос, Тогда передаётся 3 аргумента
// 1) url 2) объект с данными 3) конфиг (headers, params и т.д.)

this.$http.post('https://jsonplaceholder.typicode.com/posts',
    {
        title: 'foo',
        body: 'bar',
        userId: 1
    },
    {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(response => {
        // success callback
        console.log("response ", response)
    }, err => {
        // error callback
        console.log(err)
    });


*/
