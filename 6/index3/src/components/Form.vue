<template>

  <form @submit.prevent="submitForm">
    <div class="progress">
      <div class="progress-bar"
           :style="progressWidth"></div>
    </div>
    <div>
      <app-input v-for="(item, index) in info"
                 :name="item.name"
                 :value="item.value"
                 :pattern="item.pattern"
                 :key="index"
                 @updateValue="onUpdateValue(index, $event)"
                 @changeStatus="onChangeStatus(index, $event)">
      </app-input>
    </div>

    <button class="btn btn-primary"
            :disabled="canSend"
            :class="canSendClass"
            v-if="!formSubmitted">
      <span v-if="formProcess">
        <i class="fa fa-spinner fa-spin fa-lg"></i> Pending...</span>
      <span v-if="!formProcess">Send Data</span>
    </button>
  </form>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppInput from "./Input";

export default {
  components: {
    AppInput
  },
  data() {
    return {
      // done: 0
    };
  },
  created() {
    console.log("On created done :", this.done);
  },
  computed: {
    // info() {
    //   return this.$store.getters.info;
    // },
    ...mapGetters(["info", "done", "formSubmitted", "formProcess"]),
    progressWidth() {
      return {
        width: this.done / this.info.length * 100 + "%"
      };
    },
    canSend() {
      return this.done !== this.info.length || this.formProcess;
    },
    canSendClass() {
      return this.canSend ? "" : "animated bounceIn";
    }
  },
  methods: {
    ...mapActions(["submitForm"]),
    onUpdateValue(index, value) {
      this.$store.dispatch("updateValue", {
        index: index,
        value: value
      });
      console.log("done updateValue ", this.done);
    },
    onChangeStatus(index, status) {
      console.log("val ", status);

      this.$store.dispatch("updateStatus", {
        index: index,
        status: status
      });
      console.log("done ", this.done);
    }
  }
};
</script>

<style scoped>
</style>
