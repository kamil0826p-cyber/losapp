import { ref } from 'vue'
import { getAuth, updateProfile, deleteUser } from 'firebase/auth'
import { apiClient } from '@/api/client'

export function useAccountSettings() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const updateDisplayName = async (
    newDisplayName: string,
    onSuccess?: () => void,
  ): Promise<boolean> => {
    const auth = getAuth()
    const user = auth.currentUser

    if (!user) {
      error.value = 'No user logged in'
      return false
    }

    loading.value = true
    error.value = null

    try {
      await apiClient.put('auth/update-display-name', { displayName: newDisplayName })

      await updateProfile(user, {
        displayName: newDisplayName,
      })

      await user.reload()

      if (onSuccess) {
        onSuccess()
      }

      return true
    } catch (err: any) {
      console.error('Failed to update display name:', err)
      error.value = err.response?.data?.message || 'Failed to update display name'
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteAccount = async (): Promise<boolean> => {
    const auth = getAuth()
    const user = auth.currentUser

    if (!user) {
      error.value = 'No user logged in'
      return false
    }

    loading.value = true
    error.value = null

    try {
      await apiClient.delete('auth/delete-account', {
        data: {
          confirmDelete: true,
        },
      })

      await deleteUser(user)

      return true
    } catch (err: any) {
      console.error('Failed to delete account:', err)
      error.value = err.response?.data?.message || 'Failed to delete account'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    updateDisplayName,
    deleteAccount,
  }
}
