<template>
  <div :class="letterClasses">{{ value }}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ComputedClass } from '@customTypes/common';

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    isFilled(): boolean {
      return !!this.value;
    },

    letterClasses(): ComputedClass {
      return {
        letter: true,
        'letter--filled': this.isFilled,
      };
    },
  },
});
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
