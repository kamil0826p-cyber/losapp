<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <ToastItem
        v-for="toast in store.toasts"
        :key="toast.id"
        :message="toast.message"
        :type="toast.type"
        @close="store.remove(toast.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
import ToastItem from './ToastItem.vue'

const store = useToastStore()
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  pointer-events: none; /* Allow clicking through container */
}

.toast-container > * {
  pointer-events: auto; /* Re-enable clicks on toasts */
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
