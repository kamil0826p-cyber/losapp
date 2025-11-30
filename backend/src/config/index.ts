/**
 * Centralized configuration for the backend application
 */

export const config = {
  server: {
    defaultPort: 4000,
    allowedOrigins: ['https://losai.online', 'http://localhost:8080'] as string[],
  },

  auth: {
    initialCredits: 100,
    minPasswordLength: 6,
    defaultAccountType: 'free' as const,
  },

  loginHistory: {
    retentionDays: 90,
    maxFailedAttempts: 5,
    failedAttemptsWindowMs: 5 * 60 * 1000, // 5 minutes
  },

  rateLimit: {
    register: {
      windowMs: 60 * 60 * 1000, // 1 hour
      limit: 3,
      message: 'Too many registration attempts. Please try again later.',
    },
    login: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 10,
      message: 'Too many login attempts. Please try again later.',
    },
    logSuccessfulLogin: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 15,
      message: 'Too many verification attempts. Please try again later.',
    },
    loginHistory: {
      windowMs: 5 * 60 * 1000, // 5 minutes
      limit: 20,
      message: 'Too many requests. Please try again later.',
    },
    updateDisplayName: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 5,
      message: 'Too many update attempts. Please try again later.',
    },
    deleteAccount: {
      windowMs: 60 * 60 * 1000, // 1 hour
      limit: 2,
      message: 'Too many delete attempts. Please try again later.',
    },
  },
} as const

export type Config = typeof config
