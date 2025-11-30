import { defineStore } from 'pinia'
import { auth, onAuthStateChanged, onIdTokenChanged } from '@/firebase'
import type { User as FirebaseUser } from 'firebase/auth'
import { type Unsubscribe } from 'firebase/firestore'
import { LoginHistoryService } from '@/services/loginHistoryService'
import { AuthService, type LoginPayload, type RegisterPayload } from '@/services/authService'
import { UserService } from '@/services/userService'
import { useToastStore } from '@/stores/toast'

export interface AuthState {
  token: string | null
  user: UserInfo | null
  loading: boolean
  error: string | null
  credits: number
  creditsUnsubscribe: Unsubscribe | null
}

interface UserInfo {
  uid: string
  email?: string
  displayName?: string
}

const STORAGE_KEY = 'auth_token'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
    loading: false,
    error: null,
    credits: 0,
    creditsUnsubscribe: null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.user,
    uid: (state): string | null => state.user?.uid ?? null,
    email: (state): string | null => state.user?.email ?? null,
    displayName: (state): string | null => state.user?.displayName ?? null,
  },

  actions: {
    async register(payload: RegisterPayload): Promise<void> {
      this.loading = true
      this.error = null

      try {
        const data = await AuthService.register(payload)
        return data
      } catch (error) {
        this.handleError(error, 'Unknown registration error')
        throw error
      } finally {
        this.loading = false
      }
    },

    async login(payload: LoginPayload): Promise<FirebaseUser> {
      this.loading = true
      this.error = null

      try {
        const credential = await AuthService.login(payload)

        // Log successful login
        const idToken = await credential.user.getIdToken()
        await LoginHistoryService.logSuccessfulLogin(idToken).catch((err) =>
          console.error('Failed to log login:', err),
        )

        return credential.user
      } catch (error: any) {
        // Log failed login attempt
        await LoginHistoryService.logFailedLogin(payload.email).catch((err) =>
          console.error('Failed to log failed login:', err),
        )

        this.handleError(error, 'Login error')
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout(): Promise<void> {
      this.clearAuthState()

      try {
        await AuthService.logout()
      } catch (error) {
        console.error('Error during signOut:', error)
      }
    },

    bindAuthListeners(): void {
      onAuthStateChanged(auth, async (fbUser) => {
        if (!fbUser) {
          this.clearAuthState()
          return
        }

        await this.updateUserFromFirebase(fbUser)
        this.subscribeToCredits(fbUser.uid)
      })

      onIdTokenChanged(auth, async (fbUser) => {
        if (!fbUser) return
        await this.refreshToken(fbUser)
      })
    },

    subscribeToCredits(uid: string): void {
      if (this.creditsUnsubscribe) {
        this.creditsUnsubscribe()
      }

      try {
        this.creditsUnsubscribe = UserService.subscribeToCredits(uid, (credits) => {
          this.credits = credits
        })
      } catch (error) {
        console.error('Error setting up credits listener:', error)
        this.credits = 0
      }
    },

    async setDisplayName(name: string): Promise<void> {
      const currentUser = auth.currentUser

      if (!currentUser) {
        throw new Error('No authenticated user')
      }

      try {
        await AuthService.updateDisplayName(currentUser, name)
        this.user = this.extractUserInfo(currentUser)

        const toast = useToastStore()
        toast.success('Display name updated successfully')
      } catch (error) {
        this.handleError(error, 'Failed to update display name')
        throw error
      }
    },

    handleError(error: unknown, fallbackMessage: string): void {
      this.error = error instanceof Error ? error.message : fallbackMessage
      const toast = useToastStore()
      toast.error(this.error)
    },

    clearAuthState(): void {
      if (this.creditsUnsubscribe) {
        this.creditsUnsubscribe()
        this.creditsUnsubscribe = null
      }

      this.token = null
      this.user = null
      this.error = null
      this.credits = 0
      localStorage.removeItem(STORAGE_KEY)
    },

    async updateUserFromFirebase(fbUser: FirebaseUser): Promise<void> {
      const idToken = await fbUser.getIdToken()
      this.user = this.extractUserInfo(fbUser)
      this.setToken(idToken)
    },

    async refreshToken(fbUser: FirebaseUser): Promise<void> {
      const idToken = await fbUser.getIdToken()
      this.setToken(idToken)
    },

    extractUserInfo(fbUser: FirebaseUser): UserInfo {
      return {
        uid: fbUser.uid,
        email: fbUser.email || undefined,
        displayName: fbUser.displayName || undefined,
      }
    },

    setToken(token: string): void {
      this.token = token
      localStorage.setItem(STORAGE_KEY, token)
    },
  },
})
