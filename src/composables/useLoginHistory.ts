import { ref, type Ref } from 'vue'
import { getAuth } from 'firebase/auth'
import { LoginHistoryService } from '@/services/loginHistoryService'
import type { LoginHistoryEntry } from '@/types/loginHistory'

export function useLoginHistory() {
  const loginHistory: Ref<LoginHistoryEntry[]> = ref([])
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)
  const hasMore = ref(false)
  const lastDocId: Ref<string | null> = ref(null)

  const fetchLoginHistory = async (append: boolean = false) => {
    loading.value = true
    error.value = null

    try {
      const currentUser = getAuth().currentUser

      if (!currentUser) {
        throw new Error('User not authenticated')
      }

      const idToken = await currentUser.getIdToken()
      const response = await LoginHistoryService.getLoginHistory(
        idToken,
        undefined,
        append ? lastDocId.value || undefined : undefined,
      )

      if (append) {
        loginHistory.value = [...loginHistory.value, ...response.history]
      } else {
        loginHistory.value = response.history
      }

      hasMore.value = response.hasMore
      lastDocId.value = response.lastDocId
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch login history'
      console.error('Error fetching login history:', err)
    } finally {
      loading.value = false
    }
  }

  const loadMore = async () => {
    if (!hasMore.value || loading.value) return
    await fetchLoginHistory(true)
  }

  const refresh = async () => {
    lastDocId.value = null
    hasMore.value = false
    await fetchLoginHistory(false)
  }

  const logCurrentLogin = async () => {
    try {
      const currentUser = getAuth().currentUser

      if (!currentUser) {
        return
      }

      const idToken = await currentUser.getIdToken()
      await LoginHistoryService.logSuccessfulLogin(idToken)
    } catch (err) {
      console.error('Error logging current login:', err)
    }
  }

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('pl-PL', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date)
  }

  const getDeviceIcon = (device?: string): string => {
    if (!device) return '💻'
    return device.toLowerCase().includes('mobile') ? '📱' : '💻'
  }

  const getStatusIcon = (status: string): string => {
    return status === 'success' ? '✅' : '❌'
  }

  return {
    loginHistory,
    loading,
    error,
    hasMore,
    fetchLoginHistory,
    loadMore,
    refresh,
    logCurrentLogin,
    formatDate,
    getDeviceIcon,
    getStatusIcon,
  }
}
