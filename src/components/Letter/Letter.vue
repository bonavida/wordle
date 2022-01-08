<template>
  <div :class="letterClasses">{{ value }}</div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    isFilled() {
      return !!this.value;
    },

    letterClasses() {
      return {
        letter: true,
        'letter--filled': this.isFilled,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.letter {
  width: 62px;
  height: 62px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 3px;
  color: #003543;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  text-transform: uppercase;
  user-select: none;
  transition: border-color 0.2s lineal;

  &--filled {
    border-color: #878a8c;
  }
}
</style>
