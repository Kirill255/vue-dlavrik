<template>

  <div class="row">
    <div class="col col-xs-4">
      <h2>Hello {{ name }}</h2>
    </div>
    <div class="col col-xs-8">
      <table class="table table-bordered">
        <tbody>
          <tr v-for="(item, index) in info">
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["info", "name"])
  }
};
</script>

<style scoped>
</style>
