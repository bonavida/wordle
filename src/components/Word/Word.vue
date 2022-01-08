<template>
  <div class="word">
    <Letter
      v-for="col in 5"
      :key="`row_${index}_letter_${col - 1}$`"
      :value="value[col - 1]"
    />
  </div>
</template>

<script>
export default {
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
};
</script>

<style lang="scss" scoped>
.word {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
}
</style>
