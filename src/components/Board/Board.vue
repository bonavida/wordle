<template>
  <div class="board">
    <Word
      v-for="row in 6"
      :key="`row_${row - 1}`"
      :index="row - 1"
      :value="board[row - 1]"
      :is-color-blind-enabled="colorBlindMode"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapState(['board']),
    ...mapState('preferences', ['colorBlindMode']),
  },
  methods: {
    ...mapActions(['populateGame']),
  },
  mounted() {
    this.populateGame();
  },
});
</script>

<style lang="scss" scoped>
.board {
  position: relative;
  width: 350px;
  height: 420px;
  display: grid;
  grid-template-rows: repeat(6, minmax(0, 1fr));
  gap: 0.25rem;
  padding: 0.75rem;
}
</style>
