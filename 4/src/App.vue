<template>
  <div id="app">
    <div class="container">
      <card-question v-if="!showResult"
                     :currentQuestion="currentQuestion"
                     @nextAnswer="getNextAnswer"></card-question>
      <result-box v-if="showResult"
                  :resultOfAnswers="resultOfAnswers"></result-box>
    </div>
  </div>
</template>

<script>
import CardQuestion from "./components/CardQuestion.vue";
import ResultBox from "./components/ResultBox.vue";

export default {
  name: "app",
  components: { CardQuestion, ResultBox },
  data() {
    return {
      questions: [],
      currentIndex: 0,
      showResult: false,
      resultOfAnswers: []
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex];
    }
  },
  methods: {
    getNextAnswer(answer) {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
      } else {
        this.showResult = true;
      }
      this.resultOfAnswers.push({
        question: this.questions[this.currentIndex].title,
        answer: answer
      });
      console.log(answer);
    }
  },
  created() {
    this.questions = getQuestions();
  }
};

function getQuestions() {
  return [
    {
      type: "radio",
      title: "Какой тэг задаёт ссылку?",
      answers: ["a", "div", "span", "img"]
    },
    {
      type: "checkbox",
      title: "Какие из этих тэгов строчные?",
      answers: ["a", "div", "span", "img"]
    },
    {
      type: "checkbox",
      title: "Какие из этих тэгов блочные?",
      answers: ["a", "div", "span", "img"]
    }
  ];
}
</script>

<style>
</style>
