<template>
  <div>
    <div @click="toggleModal">
      <InformationIcon class="header__icon" />
    </div>
    <Modal id="how_to_modal" :show="showModal" is-naked @close="toggleModal">
      <template slot="header">
        <h3 class="modal__title">How to play</h3>
      </template>
      <template slot="body">
        <p>Guess the WORDLE in 6 tries.</p>
        <p>
          Each guess must be a valid 5 letter word. Hit the enter button to
          submit.
        </p>
        <p>
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </p>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
});
</script>

<style lang="scss" scoped>
.header__icon {
  width: 1.4rem;
  height: 1.4rem;
  fill: #003543;
  stroke: #003543;
  cursor: pointer;
}

p {
  color: #003543;
  font-size: 14px;
}
</style>
