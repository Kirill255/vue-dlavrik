<template>
  <div>
    <h1>Products</h1>
    <div class="row">
      <div class="col col-sm-4"
           v-for="product in products">
        <router-link tag="h3"
                     :to="'/products/' + product.id_product">
          <a>{{ product.title }}</a>
        </router-link>
        <div>{{ product.price }}</div>
        <button v-if="inCart.indexOf(product.id_product) === -1"
                @click="addToCart(product.id_product)"
                class="btn btn-primary">
          Add to cart
        </button>
        <button v-else
                @click="removeFromCart(product.id_product)"
                class="btn btn-warning">
          Remove to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  created() {
    console.log(1);
    // этот код просто для отладки, можно и удалить, оставил просто на всякий случай
    // this.$http.get("products.json").then(
    //   response => {
    //     // get body data
    //     // this.someData = response.body;
    //     console.log("body :", response.body);
    //     // console.log("data :", response.data);
    //   },
    //   error => {
    //     // error callback
    //     console.log("error :", error);
    //   }
    // );

    // в хуке created не совсем правильно диспатчить, так как будет заметно как данные подтягиваются при переходе на роут
    // тоесть мы сначала переходим на роут, и только потом начинается создание компонента, запускается диспатч и т.д.
    // this.$store.dispatch("products/loadItems");
  },
  // поэтому можно диспатчить или в самом компоненте в хуке beforeRouteEnter или в настройках самого роута в routes.js в хуке beforeEnter
  // beforeRouteEnter(to, from, next) {
  //   next(vm => vm.$store.dispatch("products/loadItems"));
  // },
  computed: {
    ...mapGetters("products", {
      products: "items"
    }),
    ...mapGetters("cart", {
      inCart: "products"
    })
  },
  methods: {
    ...mapActions("cart", {
      addToCart: "add",
      removeFromCart: "remove"
    })
  }
};
</script>

<style scoped>
.row {
  padding-left: 15px;
}
</style>
