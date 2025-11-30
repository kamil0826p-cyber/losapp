import { defineStore } from 'pinia'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[],
  }),
  actions: {
    add(toast: Omit<Toast, 'id'>) {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast = { ...toast, id }
      this.toasts.push(newToast)

      if (toast.duration !== 0) {
        setTimeout(() => {
          this.remove(id)
        }, toast.duration || 3000)
      }
    },
    remove(id: string) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },
    success(message: string, duration?: number) {
      this.add({ message, type: 'success', duration })
    },
    error(message: string, duration?: number) {
      this.add({ message, type: 'error', duration })
    },
    info(message: string, duration?: number) {
      this.add({ message, type: 'info', duration })
    },
    warning(message: string, duration?: number) {
      this.add({ message, type: 'warning', duration })
    },
  },
})
