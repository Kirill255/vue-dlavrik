<template>
  <div>

    <h1>Order now</h1>
    <hr>
    <div class="row">
      <div class="col col-sm-4">
        <div v-if="!products.length"
             class="alert alert-warning">
          Your cart is empty
        </div>
        <template v-else>
          <h6>Your order:</h6>
          <ul class="list-group">
            <li v-for="product in products"
                class="list-group-item">
              {{ product.title }} — {{ product.price }}
            </li>
          </ul>
          <div>Total price: {{ totalPrice }}</div>
        </template>
      </div>
      <div class="col col-sm-8">
        <app-form></app-form>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppForm from "./Form";

export default {
  components: {
    AppForm
  },
  computed: {
    ...mapGetters("products", {
      productsAll: "items"
    }),
    ...mapGetters("cart", {
      productsInCart: "products"
    }),
    products() {
      return this.productsAll.filter(product => {
        return this.productsInCart.indexOf(product.id_product) !== -1;
      });
    },
    totalPrice() {
      return this.products.reduce((acc, product) => {
        return (acc += product.price);
      }, 0);
    }
  }
};
</script>

<style scoped>
</style>

