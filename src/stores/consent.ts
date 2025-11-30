import { defineStore } from 'pinia'

// ============================================================================
// Types
// ============================================================================

export interface Consent {
  necessary: true
  date: string
  version: number
}

interface ConsentState {
  consent: Consent | null
  booted: boolean
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = 'app_consent_v1'
const CONSENT_VERSION = 1 as const
const LS_TEST_KEY = '__ls_test__'

// ============================================================================
// Storage Utilities
// ============================================================================

class StorageManager {
  private static getLocalStorage(): Storage | null {
    try {
      if (typeof window === 'undefined') return null

      localStorage.setItem(LS_TEST_KEY, '1')
      localStorage.removeItem(LS_TEST_KEY)

      return localStorage
    } catch {
      return null
    }
  }

  static read(): Consent | null {
    const storage = this.getLocalStorage()
    if (!storage) return null

    try {
      const raw = storage.getItem(STORAGE_KEY)
      if (!raw) return null

      const parsed = JSON.parse(raw) as Partial<Consent>

      return this.isValidConsent(parsed) ? (parsed as Consent) : null
    } catch {
      return null
    }
  }

  static write(consent: Consent): void {
    const storage = this.getLocalStorage()
    if (!storage) return

    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(consent))
    } catch {
      // Silent fail - storage might be full or unavailable
    }
  }

  static remove(): void {
    try {
      this.getLocalStorage()?.removeItem(STORAGE_KEY)
    } catch {
      // Silent fail
    }
  }

  private static isValidConsent(data: Partial<Consent>): boolean {
    return (
      data.necessary === true && data.version === CONSENT_VERSION && typeof data.date === 'string'
    )
  }
}

// ============================================================================
// Window Flag Management
// ============================================================================

function setGlobalCookieFlag(allowed: boolean): void {
  try {
    ;(window as any).__cookiesAllowed = allowed
  } catch {
    // Silent fail - window might not be available
  }
}

// ============================================================================
// Store Definition
// ============================================================================

export const useConsentStore = defineStore('consent', {
  state: (): ConsentState => ({
    consent: null,
    booted: false,
  }),

  getters: {
    isBooted: (state) => state.booted,
    hasConsent: (state) => state.consent !== null,
    shouldShowBanner: (state) => state.booted && state.consent === null,
  },

  actions: {
    initFromStorage(): void {
      if (this.booted) return

      const existingConsent = StorageManager.read()
      this.consent = existingConsent
      this.booted = true

      setGlobalCookieFlag(existingConsent !== null)
    },

    acceptNecessary(): void {
      const consent: Consent = {
        necessary: true,
        date: new Date().toISOString(),
        version: CONSENT_VERSION,
      }

      this.consent = consent
      StorageManager.write(consent)
      setGlobalCookieFlag(true)
    },

    resetConsent(): void {
      this.consent = null
      StorageManager.remove()
      setGlobalCookieFlag(false)
    },
  },
})

// ============================================================================
// Composable
// ============================================================================

/**
 * Lazy bootstrap: ensures the consent store is initialized before use.
 * Call this composable instead of `useConsentStore()` to guarantee proper initialization.
 */
export function useConsentBoot() {
  const store = useConsentStore()

  if (!store.booted) {
    store.initFromStorage()
  }

  return store
}
