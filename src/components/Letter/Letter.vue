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
    isColorBlindEnabled: {
      type: Boolean,
      default: false,
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
        'letter--colorblind': this.isCompleted && this.isColorBlindEnabled,
        [`letter--${this.status}`]: this.isCompleted,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.letter {
  position: relative;
  height: 100%;
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 3px;
  color: #fff;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  text-transform: uppercase;
  user-select: none;

  &--filled {
    background-color: var(--bg-letter-filled);
    color: var(--color);
    border-color: var(--border-color-secondary);
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

  &--colorblind {
    &.letter {
      &--present {
        background-color: #85c0f9;
        border-color: #85c0f9;
      }

      &--correct {
        background-color: #f5793a;
        border-color: #f5793a;
      }
    }
  }
}
</style>
