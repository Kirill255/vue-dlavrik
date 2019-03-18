<template>
  <div class="form-group">
    <label>{{ name }}</label>
    <span class="fa"
          :class="validClass"
          v-if="activated">
    </span>
    <input type="text"
           class="form-control"
           :value="value"
           @input="onInput">
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    value: String,
    pattern: RegExp,
    activated: Boolean
  },
  // props: ["name", "value", "pattern"],
  data() {
    return {
      // activated: this.value != ""
    };
  },
  mounted() {
    // чтобы провалидировать первоначальные значения
    this.$emit("changeStatus", this.isValid);
  },
  computed: {
    isValid() {
      return this.pattern.test(this.value);
    },
    validClass() {
      return this.isValid
        ? "fa-check-circle text-success animated bounce"
        : "fa-exclamation-circle text-danger animated shake";
    }
  },
  methods: {
    onInput(e) {
      // this.activated = true;
      this.$emit("updateActivated", true);
      this.$emit("updateValue", e.target.value);
    }
  },
  watch: {
    isValid() {
      this.$emit("changeStatus", this.isValid);
    }
  }
};
</script>
