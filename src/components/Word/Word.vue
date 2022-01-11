<template>
  <div class="word">
    <Letter
      v-for="col in 5"
      :key="`row_${index}_letter_${col - 1}`"
      :value="value[col - 1]"
      :status="evaluations[col - 1]"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { evaluateWord } from '@utils/game';
import { DEFAULT_EMPTY_EVALUATION } from '@constants/game';
import { LetterEvaluation } from '@customTypes/game';

export default Vue.extend({
  props: {
    index: {
      type: Number,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    isCompleted(): boolean {
      return this.index < this.$store.state.rowIndex;
    },

    evaluations(): LetterEvaluation {
      if (!this.isCompleted) return DEFAULT_EMPTY_EVALUATION;
      return evaluateWord(this.$store.state.solution, this.value);
    },
  },
});
</script>

<style lang="scss" scoped>
.word {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
}
</style>
