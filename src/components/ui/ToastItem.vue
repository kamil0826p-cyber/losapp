<template>
  <div class="toast-item" :class="type">
    <div class="toast-content">
      <span class="toast-message">{{ message }}</span>
    </div>
    <button class="toast-close" @click="$emit('close')">&times;</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.toast-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.toast-content {
  flex: 1;
  margin-right: 12px;
}

.toast-message {
  font-size: 14px;
  font-weight: 500;
}

.toast-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 0;
  line-height: 1;
}

.toast-close:hover {
  opacity: 1;
}

/* Types */
.success {
  background-color: rgba(16, 185, 129, 0.9);
  color: white;
}

.error {
  background-color: rgba(239, 68, 68, 0.9);
  color: white;
}

.info {
  background-color: rgba(59, 130, 246, 0.9);
  color: white;
}

.warning {
  background-color: rgba(245, 158, 11, 0.9);
  color: white;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
