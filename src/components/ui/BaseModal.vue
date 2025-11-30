<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="modal-backdrop"
        @click="handleBackdropClick"
        role="dialog"
        aria-modal="true"
      >
        <div class="modal-container" :style="{ maxWidth }" @click.stop>
          <!-- Header -->
          <div v-if="$slots.header || title" class="modal-header">
            <slot name="header">
              <h3 class="modal-title">{{ title }}</h3>
            </slot>
            <button class="close-btn" @click="close" aria-label="Close modal">
              <span class="close-icon">×</span>
            </button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    isOpen: boolean
    title?: string
    maxWidth?: string
    closeOnBackdrop?: boolean
  }>(),
  {
    maxWidth: '500px',
    closeOnBackdrop: true,
  },
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => {
  emit('close')
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    close()
  }
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    close()
  }
}

// Lock body scroll when modal is open
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(17, 24, 39, 0.7); /* Darker, richer backdrop */
  backdrop-filter: blur(8px); /* Stronger blur for premium feel */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
}

.modal-container {
  background: #ffffff;
  border-radius: 24px; /* Larger radius */
  border: 1px solid rgba(166, 149, 255, 0.2); /* Brand color border hint */
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset; /* Inner highlight */
  width: 100%;
  max-width: 500px; /* Default, overridden by prop */
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  color: var(--text);
  transform-origin: center center;
}

/* Mobile Optimization */
@media (max-width: 640px) {
  .modal-container {
    width: 100% !important;
    max-width: 100% !important;
    margin: auto 0 0 0; /* Stick to bottom on mobile if desired, or center */
    border-bottom-left-radius: 0; /* If sticking to bottom */
    border-bottom-right-radius: 0;
    margin-bottom: 0; /* Stick to bottom */
  }

  .modal-backdrop {
    align-items: flex-end; /* Align to bottom on mobile */
    padding: 0; /* Full width */
  }

  .modal-container {
    border-radius: 24px 24px 0 0; /* Rounded top only */
    max-height: 85vh; /* Slightly less height */
  }
}

@media (min-width: 641px) {
  .modal-backdrop {
    padding: 20px;
  }
}

.modal-header {
  padding: 24px 28px;
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.4;
}

.close-btn {
  background: #f3f4f6;
  border: 1px solid transparent;
  font-size: 24px;
  line-height: 1;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; /* Circular */
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #e5e7eb;
  color: #111827;
  transform: rotate(90deg); /* Playful interaction */
}

.close-icon {
  position: relative;
  top: -1px; /* Visual adjustment */
}

.modal-body {
  padding: 28px;
  overflow-y: auto;
  color: #374151;
  font-size: 1rem;
  line-height: 1.6;
  flex-grow: 1;
  background: #ffffff;
}

.modal-footer {
  padding: 20px 28px;
  border-top: 1px solid rgba(229, 231, 235, 0.5);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background-color: #f9fafb;
  flex-shrink: 0;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container {
  animation: modal-pop-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-leave-active .modal-container {
  animation: modal-pop-out 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Mobile Slide Up Animation */
@media (max-width: 640px) {
  .modal-fade-enter-active .modal-container {
    animation: modal-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .modal-fade-leave-active .modal-container {
    animation: modal-slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

@keyframes modal-pop-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes modal-pop-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
}

@keyframes modal-slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes modal-slide-down {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
