<template>
  <label class="switch" :for="name">
    <input
      :id="name"
      :name="name"
      class="switch__input"
      type="checkbox"
      :value="value"
      :checked="value"
      @change="emitChangeSwitch"
    />
    <div class="switch__slider" />
  </label>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitChangeSwitch({ target: { checked } }: any) {
      this.$emit('change', checked);
    },
  },
});
</script>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 0;

  &__input {
    display: none;

    &:checked + .switch__slider {
      background-color: #41b883;

      &:before {
        transform: translateX(20px);
      }
    }
  }

  &__slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-switch);
    border-radius: 36px;
    transition: all 0.2s ease;
    cursor: pointer;

    &:before {
      position: absolute;
      content: '';
      height: 14px;
      width: 14px;
      left: 3px;
      bottom: 3px;
      background-color: #fff;
      border-radius: 50%;
      transform: translateX(0);
      transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    }
  }
}
</style>
