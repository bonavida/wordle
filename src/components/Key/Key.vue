<template>
  <button :class="keyClasses" @click="handleClick">
    <slot name="key-content"></slot>
    <template v-if="hasValue">{{ value }}</template>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { ComputedClass } from '@customTypes/common';
import { KEY_SIZE } from '@constants/game';

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
  },
  computed: {
    hasValue(): boolean {
      return !!this.value;
    },

    hasStatus(): boolean {
      return !!this.status;
    },

    isSizeLarge(): boolean {
      return this.size === KEY_SIZE.LARGE;
    },

    keyClasses(): ComputedClass {
      return {
        key: true,
        'key--large': this.isSizeLarge,
        [`key--${this.status}`]: this.hasStatus,
      };
    },
  },
  methods: {
    handleClick() {
      this.$emit('clicked', this.value);
    },
  },
});
</script>

<style lang="scss" scoped>
.key {
  font-family: inherit;
  height: 3rem;
  width: 100%;
  max-width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0%;
  background-color: #e4e6e7;
  border: 0;
  border-radius: 4px;
  color: #003543;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: bold;
  padding: 0.5rem;
  margin: 0;
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;
  transition: color 0.3s linear, background-color 0.3s linear;

  &--absent {
    background-color: #35495e;
    color: #fff;
  }

  &--present {
    background-color: #e5c94d;
    color: #fff;
  }

  &--correct {
    background-color: #41b883;
    color: #fff;
  }

  &--large {
    max-width: inherit;
    padding: 0.5rem 1.2rem;
  }
}
</style>
