import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
    items(state) {
      return state.items;
    },
    /* сделали вспомогательный геттер только потому что у нас данные хранятся простым массивом (данные из функции getProducts()) с вложенными объектами и мы можем обратиться к конкретному продукту только по его индексу в массиве,было бы гораздо удобнее если бы у нас был ассоциативный массив (тоесть простой объект) с ключами и значениями, поэтому мы преобразуем наш массив в объект с ключами
    note: это мы делаем только потому что у нас к сожалению в данном случае наши данные храняться ввиде массива и нам не очень удобно обращаться к отдельному его элементу по его индексу в массиве, будет гораздо удобнее обратиться по его ключу в объекте, сейчас мы имеем ==> смотри комменты в самом низу кода */
    itemsMap(state) {
      let itemsMap = {};

      for (let i = 0; i < state.items.length; i++) {
        let product = state.items[i];
        itemsMap[product.id_product] = product;
      }

      return itemsMap;
    },
    /* это просто способ обращения к геттеру как к функции и передачи туда параметра, также мы видим что геттеры вторым параметром принимают ссылку на все геттеры
    https://vuex.vuejs.org/ru/guide/getters.html#%D1%81%D1%82%D0%B8n%D1%8C-%D0%BE%D0%B1%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BA%D0%B0%D0%BA-%D0%BA-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B0%D0%BC

    ну и теперь когда у нас данные хранятся не массивом, а объектом, мы можем обратиться к конкретному продукту по его ключу, мы обращаемся к геттеру itemsMap (который возвращает нам уже преобразованный объект с данными) и по ключу обращаемся к конкретному продутку, как именно мы обращаемся к геттеру item как к функции можно посмотреть в компоненте Product.vue, по сути как и к простому геттеру, просто передаем туда параметр
    */
    item: (state, getters) => (id) => {
      return getters.itemsMap[id];
    }
  },
  mutations: {
    clearItems(state) {
      state.items = [];
    },
    loadItems(state, data) {
      state.items = data;
    }
  },
  actions: {
    loadItems(store) {
      store.commit('clearItems');

      // это пока у нас не было сервера, и данные мы получали просто вызывая функцию, что бы с эмулировать обращение на сервер
      // let data = getProducts();
      // setTimeout(() => {
      //   store.commit('loadItems', data);
      // }, 1000);

      // это старый запрос который обращался на http://js.dmitrylavrik.ru/api/, но он теперь недоступен и я сделал свой сервер
      // Vue.http.get('products.php')
      // 		  .then(response => response.json())
      // 		  .then(data => {
      // 		  	 store.commit('loadItems', data);
      // 		  });

      // 'products.json' или 'products2.json', а вот так не будет работать '/products.json'
      Vue.http.get('products.json')
        .then(response => response.json())
        .then(data => {
          store.commit('loadItems', data);
        }, error => {
          console.log("error: ", error);
        });
    },
    /*
    // если мы хотим делать запрос только если у нас ещё нет данных в state, тоесть мы дёрнули запрос один раз и закешировали его, и дальше мы уже работаем с этими данными, а не делаем новый запрос каждый раз, можно просто сделать проверку на наличие данных, есди данных ещё нет, то запросить их
    loadItems(store) {
      // очищать state мы теперь не будем, пусть кешируется
      // store.commit('clearItems');
      console.log(store);
      if (!store.state.items.length) {
        Vue.http.get('products.json')
          .then(response => response.json())
          .then(data => {
            store.commit('loadItems', data);
          }, error => {
            console.log("error: ", error);
          });
      }
    }
    */
  }
};

/*
function getProducts() {
  return [
    {
      id_product: 10,
      title: 'Iphone 5',
      price: 20000
    },
    {
      id_product: 20,
      title: 'Iphone 6',
      price: 25000
    },
    {
      id_product: 30,
      title: 'Iphone 7',
      price: 30000
    }
  ]
}
*/


/*
сейчас примерно так
[
  {id: 1, title: 'Iphone 5'},
  {id: 2, title: 'Iphone 6'},
  {id: 3, title: 'Iphone 7'}
]
а будет так
{
  1: {id: 1, title: 'Iphone 5'},
  2: {id: 2, title: 'Iphone 6'},
  3: {id: 3, title: 'Iphone 7'}
}
*/
