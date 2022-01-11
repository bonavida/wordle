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
    status: {
      type: String,
      default: null,
    },
  },
  computed: {
    isFilled(): boolean {
      return !!this.value;
    },

    isCompleted(): boolean {
      return !!this.status;
    },

    letterClasses(): ComputedClass {
      return {
        letter: true,
        'letter--filled': !this.isCompleted && this.isFilled,
        [`letter--${this.status}`]: this.isCompleted,
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
  transition: border-color 0.2s lineal, color 0.2s lineal,
    background-color 0.2s lineal;

  &--filled {
    border-color: #878a8c;
  }

  &--absent {
    background-color: #35495e;
    color: #fff;
    border-color: #35495e;
  }

  &--present {
    background-color: #e5c94d;
    color: #fff;
    border-color: #e5bb04;
  }

  &--correct {
    background-color: #41b883;
    color: #fff;
    border-color: #23a169;
  }
}
</style>
