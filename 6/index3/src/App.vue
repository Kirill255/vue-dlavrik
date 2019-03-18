<template>
  <div class="container">

    <app-header></app-header>

    <app-content></app-content>

  </div>
</template>

<script>
import AppHeader from "./components/Header";
import AppContent from "./components/Content";

export default {
  components: {
    AppHeader,
    AppContent
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
