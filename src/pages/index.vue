<template>
  <div class="content">
    <div class="wrapper">
      <Board />
    </div>
    <Keyboard />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'IndexPage',
});
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  max-width: 32rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
  margin: 30px auto;
}

.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
}

@media (max-width: 480px) {
  .content {
    row-gap: 0;
    margin: 0 auto;
  }
}
</style>
