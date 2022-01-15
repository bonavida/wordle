<template>
  <div class="keyboard">
    <div class="keyboard__row">
      <Key v-for="key in firstRow" :key="`key_${key}`" :value="key" />
    </div>
    <div class="keyboard__row">
      <Key v-for="key in secondRow" :key="`key_${key}`" :value="key" />
    </div>
    <div class="keyboard__row">
      <Key v-for="key in thirdRow" :key="`key_${key}`" :value="key" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    firstRow(): Array<string> {
      return [...'qwertyuiop'];
    },

    secondRow(): Array<string> {
      return [...'asdfghjkl'];
    },

    thirdRow(): Array<string> {
      return [...'zxcvbnm'];
    },
  },
});
</script>

<style lang="scss" scoped>
.keyboard {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 6px;
  margin-top: auto;
}

.keyboard__row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 6px;
}
</style>
