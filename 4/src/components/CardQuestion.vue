<template>
  <div>
    <h1>{{ currentQuestion.title }}</h1>
    <hr>
    <div class="form-check"
         v-for="answer in currentQuestion.answers">
      <label class="form-check-label">
        <input class="form-check-input"
               :type="currentQuestion.type"
               :value="answer"
               v-model="userAnswer"> {{ answer }}
      </label>
    </div>
    <hr>
    <button :disabled="!userAnswer.length"
            class="btn btn-primary"
            @click="nextAnswer">
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentQuestion: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      userAnswer: []
    };
  },
  methods: {
    nextAnswer() {
      this.$emit("nextAnswer", this.userAnswer);
      this.userAnswer = [];
    }
  }
};
</script>

<style scoped>
</style>
