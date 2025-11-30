import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { doc, onSnapshot, type Unsubscribe } from 'firebase/firestore'
import { db } from '@/firebase'
import {
  AccountType,
  ACCOUNT_TYPE_LABELS,
  ACCOUNT_TYPE_COLORS,
  type UserData,
} from '@/types/user.ts'

// Singleton to share state across components
const sharedAuthUser = ref<User | null>(null)

const sharedUserData = ref<UserData>({
  credits: 0,
  accountType: AccountType.FREE,
})

export function useCurrentUser() {
  const auth = getAuth()
  const loading = ref(true)

  const displayName = computed(() => sharedAuthUser.value?.displayName || '')
  const email = computed(() => sharedAuthUser.value?.email || '')
  const uid = computed(() => sharedAuthUser.value?.uid || '')
  const credits = computed(() => sharedUserData.value.credits)
  const accountType = computed(() => sharedUserData.value.accountType)
  const accountTypeLabel = computed(() => ACCOUNT_TYPE_LABELS[sharedUserData.value.accountType])

  const accountTypeColor = computed(() => ACCOUNT_TYPE_COLORS[sharedUserData.value.accountType])
  const refreshUserProfile = async () => {
    const currentUser = auth.currentUser
    if (currentUser) {
      await currentUser.reload()
      // Force reactivity by creating new reference
      sharedAuthUser.value = { ...auth.currentUser! } as User
    }
  }

  let unsubscribeAuth: (() => void) | null = null
  let unsubscribeFirestore: Unsubscribe | null = null

  onMounted(() => {
    unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      sharedAuthUser.value = currentUser
      loading.value = false

      // Unsubscribe from previous Firestore listener if exists
      if (unsubscribeFirestore) {
        unsubscribeFirestore()
        unsubscribeFirestore = null
      }

      if (currentUser) {
        // Set up real-time listener for user document
        const userDocRef = doc(db, 'users', currentUser.uid)

        unsubscribeFirestore = onSnapshot(
          userDocRef,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              const data = docSnapshot.data()
              sharedUserData.value = {
                credits: data.credits || 0,
                accountType: data.accountType || AccountType.FREE,
              }
            } else {
              // Reset to defaults if document doesn't exist
              sharedUserData.value = {
                credits: 0,
                accountType: AccountType.FREE,
              }
            }
          },
          (error) => {
            console.error('Error listening to user data:', error)
            sharedUserData.value = {
              credits: 0,
              accountType: AccountType.FREE,
            }
          },
        )
      } else {
        // Reset to defaults when user logs out
        sharedUserData.value = {
          credits: 0,
          accountType: AccountType.FREE,
        }
      }
    })
  })

  onUnmounted(() => {
    if (unsubscribeAuth) {
      unsubscribeAuth()
    }
    if (unsubscribeFirestore) {
      unsubscribeFirestore()
    }
  })

  return {
    user: sharedAuthUser,
    displayName,
    email,
    uid,
    credits,
    accountType,
    accountTypeLabel,
    accountTypeColor,
    loading,
    refreshUserProfile,
  }
}
