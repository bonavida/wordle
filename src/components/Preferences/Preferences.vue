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
      <template slot="body">
        <div class="preferences">
          <div class="preference">
            <div class="preference__wrapper">
              <h4 class="preference__title">Color Blind Mode</h4>
              <span class="preferenc__subtitle">High contrast colors</span>
            </div>
            <Switcher
              name="colorblind"
              :value="colorBlindMode"
              @change="handleChangeColorBlindMode"
            />
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapState('preferences', ['colorBlindMode']),
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },

    handleChangeColorBlindMode(value: boolean) {
      this.changeColorBlindMode(value);
    },

    ...mapActions({ changeColorBlindMode: 'preferences/changeColorBlindMode' }),
  },
});
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

.preferences {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}

.preference {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 15px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 3px;
  }

  &__title {
    color: #003543;
    font-size: 16px;
    font-weight: 600;
  }

  &__subtitle {
    color: #003543;
    font-size: 12px;
  }
}
</style>
