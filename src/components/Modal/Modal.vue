<template>
  <transition name="modal-fade" @enter="showContent = true">
    <div
      v-show="show"
      :id="id"
      class="modal__backdrop"
      :class="modalClass"
      tabindex="0"
      @mousedown="emitClose"
      @keydown.esc="emitClose"
    >
      <transition name="modal-slide">
        <div v-if="showContent" class="modal__wrapper" @mousedown.stop>
          <header class="modal__header">
            <slot name="header" />
            <div @click="emitClose">
              <CloseIcon class="modal__close" />
            </div>
          </header>

          <section class="modal__body">
            <slot name="body" />
          </section>

          <footer v-if="showFooter" class="modal__footer">
            <slot name="footer" />
          </footer>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    id: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
    isNaked: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showContent: false,
    };
  },
  computed: {
    showFooter() {
      return !this.isNaked;
    },

    modalClass() {
      return this.className || undefined;
    },
  },
  watch: {
    show() {
      if (!this.show) {
        this.setShowContent();
      }
    },
  },
  methods: {
    setShowContent(showContent: boolean = false) {
      this.showContent = showContent;
    },

    emitClose() {
      this.$emit('close');
    },
  },
});
</script>

<style lang="scss" scoped>
.modal {
  &__backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--bg-modal-backdrop);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9998;
    transition: all 0.2 linear;
  }

  &__wrapper {
    position: relative;
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    box-shadow: 0 0 7px var(--box-shadow-modal);
    transition: all 0.2 linear;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom: 1px solid var(--border-color);
    color: var(--color);
    background-color: var(--bg-secondary);
    padding: 15px 15px 15px 25px;
    transition: all 0.2 linear;

    h2 {
      margin: 0;
      font-size: 14px;
      font-weight: bold;
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--border-color);
    padding: 20px;
    transition: all 0.2 linear;
  }

  &__body {
    position: relative;
    padding: 20px 25px;
    font-size: 12px;
    overflow: auto;

    &-sub {
      margin-top: 3px;
    }

    &--bold {
      font-weight: bold;
    }
  }

  &__button {
    padding: 5px 15px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 4px;
    color: #333;
    border: 1px solid #ccc;
    background-color: #ffff;

    &:not(:first-child) {
      margin-left: 10px;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &--blue,
    &--primary {
      color: #fff;
      background-color: #337ab7;
      border: 1px solid #2e6da4;
    }

    &--red {
      color: #fff;
      background-color: #d95350;
      border: 1px solid #d5403b;
    }
  }

  &__close {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    fill: #888;
    stroke: #888;

    padding: 3px;
  }
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-slide-enter,
.modal-slide-leave-to {
  transform: translateY(100px);
}

.modal-slide-leave,
.modal-slide-enter-to {
  transform: translateY(0);
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 350ms cubic-bezier(0.4, 0, 0.2, 1);
}

/** MEDIA QUERIES */

@media (max-width: 480px) {
  .modal__wrapper {
    max-width: 90%;
    max-height: 90%;
  }
}
</style>
