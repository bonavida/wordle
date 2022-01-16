<template>
  <div>
    <div @click="toggleModal">
      <InformationIcon class="header__icon" />
    </div>
    <Modal id="how_to_modal" :show="showModal" is-naked @close="toggleModal">
      <template slot="header">
        <h3 class="modal__title">How to play</h3>
      </template>
    </Modal>
  </div>
</template>

<script>
export default {
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
};
</script>

<style lang="scss" scoped>
.header__icon {
  width: 1.4rem;
  height: 1.4rem;
  fill: #003543;
  stroke: #003543;
  cursor: pointer;
}
</style>
