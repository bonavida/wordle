<template>
  <div class="board">
    <Word
      v-for="row in 6"
      :key="`row_${row - 1}`"
      :index="row - 1"
      :value="board[row - 1]"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    board: ['laser', undefined, undefined, undefined, undefined, undefined],
    rowIndex: 0,
  }),
};
</script>

<style lang="scss" scoped>
.board {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
