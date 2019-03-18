<template>
  <div>
    <h1>{{ product.title }}</h1>
    <router-link :to="{name: 'products'}">Back to products</router-link>
    <hr>
    <div class="alert alert-success">
      {{ product.price }}
    </div>
    <button :disabled="inCart.indexOf(product.id_product) !== -1"
            @click="addToCart(product.id_product)"
            class="btn btn-primary">
      {{ inCart.indexOf(product.id_product) === -1 ? "Add to cart" : "Already in cart" }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("cart", {
      inCart: "products"
    }),
    id() {
      return this.$route.params.id;
    },
    product() {
      return this.$store.getters["products/item"](this.id);
    }
  },
  methods: {
    ...mapActions("cart", {
      addToCart: "add"
    })
  }
};
</script>
