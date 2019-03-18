<template>
  <div id="app">
    <div class="container">
      <div class="is-size-4 has-text-centered">{{ msg }} </div>
      <hr>
      <div>Count {{ count }}</div>
      <div>Price {{ price }}</div>
      <div>Total {{ total }}</div>
      <hr>
      <div>
        <button @click="increment"
                class="button is-small">+</button>
        <button @click="decrement"
                class="button is-small">-</button>
        <button @click="incrementOn5"
                class="button is-small">+5</button>
        <button @click="reset"
                class="button is-small is-warning"
                :disabled="btnDisabled">Reset</button>
        <!-- попрбуем всё-таки использовать v-model -->
        <!-- <div>
          <input type="text"
                 :value="count"
                 @input="onInput">
        </div> -->
        <!-- тогда нужно в computed установить вручную getter и setter и тогда метод onInput будет не нужен -->
        <div>
          <input type="text"
                 v-model="count">
        </div>
      </div>
      <hr>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input"
                 type="text"
                 placeholder="Enter name"
                 v-model="name">
        </div>
      </div>
      <div class="field">
        <label class="label">Phone</label>
        <div class="control">
          <input class="input"
                 type="text"
                 placeholder="Enter phone"
                 v-model="phone">
        </div>
      </div>
      <hr>
      <button v-if="!pending"
              :disabled="btnDisabled"
              class="button is-success"
              @click="sendOrder">Order Now</button>
      <button v-if="pending"
              class="button is-loading"></button>
      <div v-if="done"
           class="notification is-primary is-4 has-text-centered">
        Your order is done!
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      name: "",
      phone: ""
    };
  },
  // можно так обращаться, но есть более удобный способ через mapGetters
  // computed: {
  //   count() {
  //     return this.$store.getters.count;
  //   },
  //   price() {
  //     return this.$store.getters.price;
  //   },
  //   total() {
  //     return this.$store.getters.total;
  //   }
  // },
  // вот mapGetters, но при такой записи мы не можем добавить дополнительно свои какие-то computed свойства
  // computed: mapGetters(["count", "price", "total"]),
  // поэтому мы можем использовать оператор spread(...)
  computed: {
    // ...mapGetters(["count", "price", "total", "orderState"]),
    ...mapGetters(["price", "total", "orderState"]),
    count: {
      get() {
        return this.$store.getters.count;
      },
      set(value) {
        return this.$store.commit("setCount", value);
      }
    },
    btnDisabled() {
      return this.count < 1 || this.orderState !== null;
    },
    pending() {
      return this.orderState === "pending";
    },
    done() {
      return this.orderState === "done";
    }
  },
  // с методами тоже можноиспользовать mapMutations и mapActions
  // обратите внимание на то что, мутации мы вызываем с помощью .commit("name"),
  // а экшен вызывается с помощью .dispatch("name")
  // methods: {
  //   increment() {
  //     this.$store.commit("increment");
  //   },
  //   decrement() {
  //     this.$store.commit("decrement");
  //   },
  //   incrementOn5() {
  //     this.$store.commit("incrementOn5", 5);
  //   },
  //   reset() {
  //     this.$store.commit("reset");
  //   },
  //   sendOrder() {
  //     this.$store.dispatch("sendOrder");
  //   }
  // }
  // вот так с mapMutations и mapActions, и в шаблоне напрямую обращаться к этой мутации или экшену @click="increment"
  // а так как у нас методы названы точно также как мутации, поэтому нам даже код шаблона не нужно менять
  // если нужно передать payload, тогда ...mapMutations/...mapActions не подойдёт, придёться писать через .commit()/.dispatch()
  methods: {
    ...mapMutations(["increment", "decrement", "reset"]),
    // ...mapActions(["sendOrder"]),
    incrementOn5() {
      this.$store.commit("incrementOn5", 5);
    },
    sendOrder() {
      this.$store.dispatch("sendOrder", {
        name: this.name,
        phone: this.phone
      });
    }
    // метод нам не нужен теперь, потому что мы перписали на v-model, и задаём get/set для count в computed
    // вообще это просто возможность, как лучше делать, решать вам, и так и так можно
    // note: мне проще через обработчик, а через get/set как-то замарочено на первый взгляд
    // onInput(e) {
    //   this.$store.commit("setCount", e.target.value);
    // }
  }
};
</script>

<style scoped>
.notification {
  margin-top: 10px;
}
</style>

