<template>
  <div>
    <div @click="toggleModal">
      <PreferencesIcon class="header__icon header__icon--rotate" />
    </div>
    <Modal
      id="preferences_modal"
      :show="showModal"
      is-naked
      @close="toggleModal"
    >
      <template slot="header">
        <h3 class="modal__title">Preferences</h3>
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
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;

  &--rotate {
    transition: transform 0.2s linear;

    &:hover {
      transform: rotate(30deg);
    }
  }
}
</style>
