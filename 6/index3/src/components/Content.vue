<template>

  <transition name="formTr"
              mode="out-in"
              appear>
    <div class="wrapper"
         v-if="!formSubmitted"
         key="keyAppForm">

      <app-form></app-form>

    </div>
    <div v-else
         key="keyAppTable">

      <app-table></app-table>

    </div>
  </transition>

</template>

<script>
import { mapGetters } from "vuex";

import AppForm from "./Form";
import AppTable from "./Table";

export default {
  components: {
    AppForm,
    AppTable
  },
  computed: {
    ...mapGetters(["formSubmitted"])
  }
};
</script>

<style scoped>
.wrapper {
    margin: 0 auto;
    padding: 15px;
    max-width: 500px;
}

.formTr-enter {
    transform: translateX(-1000px);
}

.formTr-enter-active, .formTr-leave-active {
    transition: all 0.5s ease;
}

.formTr-leave-to {
    transform: translateX(1000px);
}
</style>
