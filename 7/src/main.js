import Vue from 'vue';
import App from './App.vue';

import { store } from './store';
import { router } from './routes.js';

import VueResource from 'vue-resource';

Vue.use(VueResource);
// этот адрес вроде уже недоступен
// Vue.http.options.root = 'http://js.dmitrylavrik.ru/api/'

// я временно сделал свой, на гитхабе, позже возможно удалю этот репозиторий
// полный адрес будет получаться примерно таким
// https://raw.githubusercontent.com/vuelibs/products/master/products.json
// https://raw.githubusercontent.com/vuelibs/products/master/products2.json

Vue.http.options.root = 'https://raw.githubusercontent.com/vuelibs/products/master';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
