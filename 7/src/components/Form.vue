<template>

  <!-- <form @submit.prevent="submitOurForm"> -->
  <form @submit.prevent="submitOurForm(idOrderProducts)">
    <div class="progress">
      <div class="progress-bar"
           :style="progressWidth">
      </div>
    </div>
    <div>
      <app-input v-for="(item, index) in infoForm"
                 :name="item.name"
                 :value="item.value"
                 :pattern="item.pattern"
                 :key="index"
                 :activated="item.activated"
                 @updateActivated="onUpdateActivated(index, $event)"
                 @updateValue="onUpdateValue(index, $event)"
                 @changeStatus="updateInputStatus({index: index, status: $event})">
      </app-input>
    </div>

    <hr>

    <button class="btn btn-primary"
            :disabled="canSend"
            :class="canSendClass"
            v-if="!formSubmittedDone">
      <span v-if="formInProcess">
        <i class="fa fa-spinner fa-spin fa-lg"></i> Pending...
      </span>
      <span v-if="!formInProcess">Send Data</span>
    </button>

    <div v-if="formSubmittedDone"
         class="alert alert-success">
      Заказ удачно отправлен!
    </div>

  </form>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppInput from "./Input";

export default {
  components: {
    AppInput
  },
  computed: {
    ...mapGetters("form", {
      infoForm: "info",
      doneInput: "done",
      formInProcess: "formProcess",
      formSubmittedDone: "formSubmitted"
    }),
    // этот геттер нам нужен чтобы передать его в экшен submitOurForm, которые который вызывается при отправке формы
    // сообственно мы хотим передать туда id товаров которые лежат у нас в корзине
    ...mapGetters("cart", {
      idOrderProducts: "products"
    }),
    progressWidth() {
      return {
        width: this.doneInput / this.infoForm.length * 100 + "%"
      };
    },
    canSend() {
      return this.doneInput !== this.infoForm.length || this.formInProcess;
    },
    canSendClass() {
      return this.canSend ? "" : "animated bounceIn";
    }
  },
  methods: {
    ...mapActions("form", {
      submitOurForm: "submitForm",
      updateInputValue: "updateValue",
      updateInputStatus: "updateStatus",
      updateActivatedInput: "updateActivated"
    }),
    onUpdateValue(index, value) {
      this.updateInputValue({
        index: index,
        value: value
      });
    },
    onUpdateActivated(index, activated) {
      this.updateActivatedInput({
        index: index,
        activated: activated
      });
    }
  }
};
</script>

<style scoped>
</style>


/* @updateValue="updateInputValue({index, $event})" */
