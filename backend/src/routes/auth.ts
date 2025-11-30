import { Router } from 'express'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import { config } from '../config'
import { createRateLimiter } from '../middleware/rateLimiter'
import {
  registerHandler,
  logSuccessfulLoginHandler,
  logFailedLoginHandler,
  getLoginHistoryHandler,
  updateDisplayNameHandler,
  deleteAccountHandler,
} from '../controllers/authController'

dotenv.config()

// ============================================================================
// Firebase Admin Initialization
// ============================================================================

const serviceAccount = require('../../firebase-key.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL,
  })
}

// ============================================================================
// Rate Limiting
// ============================================================================

const registerLimiter = createRateLimiter({
  windowMs: config.rateLimit.register.windowMs,
  limit: config.rateLimit.register.limit,
  message: { message: config.rateLimit.register.message },
})

const loginLimiter = createRateLimiter({
  windowMs: config.rateLimit.login.windowMs,
  limit: config.rateLimit.login.limit,
  message: { message: config.rateLimit.login.message },
})

const logSuccessfulLoginLimiter = createRateLimiter({
  windowMs: config.rateLimit.logSuccessfulLogin.windowMs,
  limit: config.rateLimit.logSuccessfulLogin.limit,
  message: { message: config.rateLimit.logSuccessfulLogin.message },
})

const loginHistoryLimiter = createRateLimiter({
  windowMs: config.rateLimit.loginHistory.windowMs,
  limit: config.rateLimit.loginHistory.limit,
  message: { message: config.rateLimit.loginHistory.message },
})

const updateDisplayNameLimiter = createRateLimiter({
  windowMs: config.rateLimit.updateDisplayName.windowMs,
  limit: config.rateLimit.updateDisplayName.limit,
  message: { message: config.rateLimit.updateDisplayName.message },
})

const deleteAccountLimiter = createRateLimiter({
  windowMs: config.rateLimit.deleteAccount.windowMs,
  limit: config.rateLimit.deleteAccount.limit,
  message: { message: config.rateLimit.deleteAccount.message },
})

// ============================================================================
// Router Configuration
// ============================================================================

export const authRouter = Router()

// Registration & Login
authRouter.post('/register', registerLimiter, registerHandler)
authRouter.post('/log-successful-login', logSuccessfulLoginLimiter, logSuccessfulLoginHandler)
authRouter.post('/log-failed-login', loginLimiter, logFailedLoginHandler)
authRouter.get('/login-history', loginHistoryLimiter, getLoginHistoryHandler)

// Account Management
authRouter.put('/update-display-name', updateDisplayNameLimiter, updateDisplayNameHandler)
authRouter.delete('/delete-account', deleteAccountLimiter, deleteAccountHandler)
