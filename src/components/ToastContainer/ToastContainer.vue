<template>
  <div class="toast-container">
    <Toast
      v-for="{ id, message, status, duration, isStatic } in toasts"
      :id="id"
      :key="`toast_${id}`"
      :message="message"
      :status="status"
      :duration="duration"
      :is-static="isStatic"
      @dismiss="handleDismissToast"
    />
  </div>
</template>

<script>
import { getRandomId } from '@utils/toast';

export default {
  data() {
    return {
      toasts: [],
    };
  },
  methods: {
    handleDismissToast(idToDelete) {
      const index = this.toasts.findIndex(({ id }) => id === idToDelete);
      this.toasts.splice(index, 1);
    },
  },
  created() {
    this.$store.subscribeAction((action) => {
      if (action.type === 'toast/showToast') {
        const toastId = getRandomId();
        const toast = { ...action.payload, id: toastId };
        this.toasts.push(toast);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.toast-container {
  position: fixed;
  top: 75px;
  left: 50%;
  transform: translate(-50%, 0px);
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  z-index: 9999;
  max-width: 600px;
}
</style>
