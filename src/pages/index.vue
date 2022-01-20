<template>
  <div class="content">
    <div class="wrapper">
      <Board />
    </div>
    <Keyboard />
    <canvas ref="confetti" class="canvas" width="500" height="500"></canvas>
    <WinModal :show-modal="showWinModal" @toggle="toggleWinModal" />
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
      showWinModal: false,
    };
  },
  methods: {
    toggleWinModal() {
      this.showWinModal = !this.showWinModal;
    },
  },
  mounted() {
    this.confetti = canvasConfetti.create(this.$refs.confetti);

    this.unwatch = this.$store.watch(
      (state) => state.status,
      (newValue) => {
        if (newValue !== GAME_STATUS.WIN) return;

        const { hasUserInteracted } = this.$store.state;
        const modalTimeoutInMs = hasUserInteracted ? 2000 : 0;

        // If the user wins, open modal
        setTimeout(() => {
          this.toggleWinModal();
        }, modalTimeoutInMs);

        // Fire confetti only right after the user wins
        if (hasUserInteracted) {
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
