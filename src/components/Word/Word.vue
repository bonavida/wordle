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
import { mapGetters } from 'vuex';
import { LetterEvaluation } from '@customTypes/evaluations';

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
      return this.getWordEvaluation(this.index);
    },

    ...mapGetters({ getWordEvaluation: 'evaluations/getWordEvaluation' }),
  },
});
</script>

<style lang="scss" scoped>
.word {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.25rem;
}
</style>
