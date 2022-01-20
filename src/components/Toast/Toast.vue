<template>
  <transition name="toast" appear>
    <div :class="toastClasses">
      <span>{{ message }}</span>
      <button class="toast__close" @click="handleCloseToast">
        <CloseIcon />
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 3000,
    },
    isStatic: {
      type: Boolean,
      default: false,
    },
    isColorBlind: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  computed: {
    hasStatus() {
      return !!this.status;
    },

    toastClasses() {
      return {
        toast: true,
        [`toast--${this.status}`]: this.hasStatus,
        'toast--colorblind': this.isColorBlind,
      };
    },
  },
  methods: {
    handleCloseToast() {
      this.emitDismissToast();
    },

    emitDismissToast() {
      this.$emit('dismiss', this.id);
    },
  },
  mounted() {
    if (this.isStatic) return;

    this.timeout = setTimeout(() => {
      this.emitDismissToast();
    }, this.duration);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>

<style lang="scss" scoped>
.toast {
  display: flex;
  align-items: center;
  column-gap: 15px;
  background-color: #35495e;
  border-radius: 6px;
  padding: 12px 12px 12px 20px;
  border: 1px solid #3c5e83;
  transition: all 0.3s ease;

  span {
    color: #ebeff3;
    font-size: 16px;
    line-height: 1.2;
  }

  &__close {
    appearance: none;
    border: none;
    box-shadow: none;
    background-color: transparent;
    width: 1rem;
    height: 1rem;
    min-width: 1rem;
    stroke: #fff;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }

  &--success {
    background-color: #5cb85c;
    border-color: #4cae4c;

    span {
      color: #fff;
    }
  }

  &--error {
    background-color: #d95350;
    border-color: #d5403b;

    span {
      color: #fff;
    }
  }

  &--colorblind {
    &.toast {
      &--success {
        background-color: #f5793a;
        border-color: #f5793a;
      }

      &--error {
        background-color: #35495e;
        border-color: #35495e;
      }
    }
  }
}

.toast-enter {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
