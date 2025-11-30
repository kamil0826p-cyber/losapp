import type { Request, Response } from 'express'
import {
  validateRegisterInput,
  validateEmail,
  validatePassword,
  validateUsername,
} from '../utils/validators'
import {
  createUserInAuth,
  createUserInFirestore,
  rollbackUserCreation,
  verifyIdToken,
  getUserByEmail,
  updateUserDisplayName,
  deleteUserFromAuth,
  deleteUserFromFirestore,
} from '../services/authService'
import {
  logLoginAttempt,
  checkFailedLoginAttempts,
  getLoginHistory,
  deleteLoginHistory,
} from '../services/loginHistoryService'
import { getClientIp } from '../utils/request'

/**
 * Handles user registration
 */
export async function registerHandler(req: Request, res: Response): Promise<Response> {
  // Basic validation
  if (!validateRegisterInput(req.body)) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const { email, password, username } = req.body

  // Email validation
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  // Password validation
  const passwordError = validatePassword(password)
  if (passwordError) {
    return res.status(400).json({ message: passwordError })
  }

  // Username validation
  const usernameError = validateUsername(username)
  if (usernameError) {
    return res.status(400).json({ message: usernameError })
  }

  try {
    console.log('📝 Creating user:', email, username.trim())

    // Step 1: Create user in Firebase Auth
    const userRecord = await createUserInAuth(email, password, username)
    console.log('✅ User created in Auth:', userRecord.uid)

    // Step 2: Create user document in Firestore
    try {
      await createUserInFirestore(userRecord.uid)
      console.log('✅ User document created in Firestore:', userRecord.uid)
    } catch (firestoreError) {
      console.error('❌ Firestore creation failed, rolling back:', firestoreError)
      await rollbackUserCreation(userRecord.uid)
      throw firestoreError
    }

    return res.status(201).json({
      message: 'User registered successfully',
      uid: userRecord.uid,
    })
  } catch (error: any) {
    console.error('❌ Registration error:', error)

    if (error.code === 'auth/email-already-exists') {
      return res.status(409).json({ message: 'Email already in use' })
    }

    if (error.code === 'auth/invalid-email') {
      return res.status(400).json({ message: 'Invalid email format' })
    }

    if (error.code === 'auth/weak-password') {
      return res.status(400).json({ message: 'Password is too weak' })
    }

    return res.status(500).json({
      message: error.message || 'Registration failed',
    })
  }
}

/**
 * Logs successful login attempt
 */
export async function logSuccessfulLoginHandler(req: Request, res: Response): Promise<Response> {
  const { idToken } = req.body

  if (!idToken) {
    return res.status(400).json({ message: 'idToken is required' })
  }

  try {
    // Verify the Firebase ID token
    const decodedToken = await verifyIdToken(idToken)
    const userId = decodedToken.uid

    // Check for too many failed attempts
    const isLocked = await checkFailedLoginAttempts(userId)
    if (isLocked) {
      return res.status(429).json({
        message:
          'Account temporarily locked due to too many failed login attempts. Please try again in 5 minutes.',
      })
    }

    // Get client info
    const ipAddress = getClientIp(req)
    const userAgent = req.headers['user-agent'] || 'unknown'

    // Log successful login
    await logLoginAttempt(userId, ipAddress, userAgent, 'success', 'email')

    return res.status(200).json({
      message: 'Login verified',
      uid: userId,
    })
  } catch (error: any) {
    console.error('❌ Login verification error:', error)

    return res.status(401).json({
      message: error.message || 'Invalid token',
    })
  }
}

/**
 * Logs failed login attempt
 */
export async function logFailedLoginHandler(req: Request, res: Response): Promise<Response> {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  try {
    // Try to find user by email
    let userId = 'unknown'
    try {
      const userRecord = await getUserByEmail(email)
      userId = userRecord.uid

      // Check if account is locked
      const isLocked = await checkFailedLoginAttempts(userId)
      if (isLocked) {
        return res.status(429).json({
          message:
            'Account temporarily locked due to too many failed login attempts. Please try again in 5 minutes.',
        })
      }
    } catch (error) {
      // User doesn't exist - log as 'unknown'
      console.log('Failed login attempt for non-existent user:', email)
    }

    // Get client info
    const ipAddress = getClientIp(req)
    const userAgent = req.headers['user-agent'] || 'unknown'

    // Log failed login
    await logLoginAttempt(userId, ipAddress, userAgent, 'failed', 'email')

    return res.status(200).json({
      message: 'Failed login logged',
    })
  } catch (error: any) {
    console.error('❌ Log failed login error:', error)

    return res.status(500).json({
      message: error.message || 'Failed to log failed login',
    })
  }
}

/**
 * Gets login history for authenticated user
 */
export async function getLoginHistoryHandler(req: Request, res: Response): Promise<Response> {
  const authHeader = req.headers.authorization
  const idToken = authHeader?.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : null

  if (!idToken) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    // Verify token
    const decodedToken = await verifyIdToken(idToken)
    const userId = decodedToken.uid

    // Get pagination params
    const limit = parseInt(req.query.limit as string) || 20
    const lastDocId = req.query.lastDocId as string | undefined

    const result = await getLoginHistory(userId, limit, lastDocId)

    return res.status(200).json(result)
  } catch (error: any) {
    console.error('❌ Get login history error:', error)

    return res.status(500).json({
      message: error.message || 'Failed to fetch login history',
    })
  }
}

/**
 * Updates user's display name
 */
export async function updateDisplayNameHandler(req: Request, res: Response): Promise<Response> {
  const authHeader = req.headers.authorization
  const idToken = authHeader?.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : null

  if (!idToken) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { displayName } = req.body

  if (!displayName || typeof displayName !== 'string') {
    return res.status(400).json({ message: 'Display name is required' })
  }

  // Validate display name
  const usernameError = validateUsername(displayName)
  if (usernameError) {
    return res.status(400).json({ message: usernameError })
  }

  try {
    // Verify token
    const decodedToken = await verifyIdToken(idToken)
    const userId = decodedToken.uid

    // Update display name in Firebase Auth
    await updateUserDisplayName(userId, displayName)

    console.log(`✅ Display name updated for user: ${userId}`)

    return res.status(200).json({
      message: 'Display name updated successfully',
      displayName: displayName.trim(),
    })
  } catch (error: any) {
    console.error('❌ Update display name error:', error)

    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(500).json({
      message: error.message || 'Failed to update display name',
    })
  }
}

/**
 * Deletes user account
 */
export async function deleteAccountHandler(req: Request, res: Response): Promise<Response> {
  const authHeader = req.headers.authorization
  const idToken = authHeader?.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : null

  if (!idToken) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { confirmDelete } = req.body

  if (confirmDelete !== true) {
    return res.status(400).json({ message: 'Account deletion must be confirmed' })
  }

  try {
    // Verify token
    const decodedToken = await verifyIdToken(idToken)
    const userId = decodedToken.uid

    console.log(`🗑️ Attempting to delete account for user: ${userId}`)

    // Delete user data from Firestore
    await deleteUserFromFirestore(userId)
    console.log(`✅ Deleted Firestore data for user: ${userId}`)

    // Delete login history
    await deleteLoginHistory(userId)
    console.log(`✅ Deleted login history for user: ${userId}`)

    // Delete user from Firebase Auth
    await deleteUserFromAuth(userId)
    console.log(`✅ Deleted Firebase Auth user: ${userId}`)

    return res.status(200).json({
      message: 'Account deleted successfully',
    })
  } catch (error: any) {
    console.error('❌ Delete account error:', error)

    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(500).json({
      message: error.message || 'Failed to delete account',
    })
  }
}
