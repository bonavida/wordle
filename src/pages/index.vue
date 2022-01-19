<template>
  <div ref="main" class="content">
    <div class="wrapper">
      <Board />
    </div>
    <Keyboard />
    <canvas ref="confetti" class="canvas" width="500" height="500"></canvas>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GAME_STATUS } from '@constants/game';

const canvasConfetti = require('canvas-confetti');

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      confetti: (options: any) => options,
      unwatch: () => {},
    };
  },
  mounted() {
    this.confetti = canvasConfetti.create(this.$refs.confetti);

    // Fire confetti when the users win
    this.unwatch = this.$store.watch(
      (state) => state.status,
      (newValue) => {
        if (newValue === GAME_STATUS.WIN) {
          // Make it rain!
          this.confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 1 },
            resize: true,
          });
        }
      }
    );
  },
  beforeDestroy() {
    this.unwatch();
  },
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

.canvas {
  position: absolute;
  bottom: 0;
  pointer-events: none;
}

@media (max-width: 480px) {
  .content {
    row-gap: 0;
    margin: 0 auto;
  }
}
</style>
