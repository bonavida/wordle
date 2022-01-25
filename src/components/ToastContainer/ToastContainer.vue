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
      :is-color-blind="colorBlindMode"
      @dismiss="handleDismissToast"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { ToastState } from '@customTypes/toast';
import { getRandomId } from '@utils/toast';

export default Vue.extend({
  data() {
    return {
      toasts: [] as Array<ToastState>,
    };
  },
  computed: {
    ...mapState('preferences', ['colorBlindMode']),
  },
  methods: {
    handleDismissToast(idToDelete: number) {
      const index = this.toasts.findIndex(({ id }) => id === idToDelete);
      this.toasts.splice(index, 1);
    },
  },
  created() {
    this.$store.subscribeAction((action) => {
      if (action.type === 'toast/showToast') {
        const toastId = getRandomId();
        const toast: ToastState = { ...action.payload, id: toastId };
        this.toasts.push(toast);
      }
    });
  },
});
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
  max-width: 700px;
}
</style>
