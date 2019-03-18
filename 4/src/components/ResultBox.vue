<template>
  <div>
    <h1>Result</h1>
    <hr>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Question</th>
          <th>User Answer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in resultOfAnswers">
          <td>{{ result.question }}</td>
          <td>{{ result.answer }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    resultOfAnswers: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
</style>
