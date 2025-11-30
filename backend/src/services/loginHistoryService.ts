import admin from 'firebase-admin'
import { parseUserAgent } from '../utils/userAgent'
import { config } from '../config'

const db = admin.firestore()

/**
 * Logs a login attempt (successful or failed) to Firestore
 */
export async function logLoginAttempt(
  userId: string,
  ipAddress: string,
  userAgent: string,
  status: 'success' | 'failed',
  method: 'email' | 'google' | 'facebook' = 'email',
): Promise<void> {
  try {
    const deviceInfo = parseUserAgent(userAgent)

    const loginEntry = {
      userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      ipAddress,
      userAgent,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      device: deviceInfo.device,
      status,
      method,
    }

    await db.collection('loginHistory').add(loginEntry)
    console.log(`✅ Login ${status} logged for user: ${userId}`)

    // Cleanup old entries (optional - runs async)
    if (userId !== 'unknown') {
      cleanupOldLoginHistory(userId).catch((err) =>
        console.error('Failed to cleanup old history:', err),
      )
    }
  } catch (error) {
    console.error('❌ Failed to log login attempt:', error)
  }
}

/**
 * Cleans up old login history entries based on retention policy
 */
async function cleanupOldLoginHistory(userId: string): Promise<void> {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - config.loginHistory.retentionDays)

  const oldEntries = await db
    .collection('loginHistory')
    .where('userId', '==', userId)
    .where('timestamp', '<', cutoffDate)
    .get()

  const batch = db.batch()
  oldEntries.docs.forEach((doc) => batch.delete(doc.ref))

  if (!oldEntries.empty) {
    await batch.commit()
    console.log(`🗑️ Cleaned up ${oldEntries.size} old login entries for user: ${userId}`)
  }
}

/**
 * Checks if user has too many recent failed login attempts
 */
export async function checkFailedLoginAttempts(userId: string): Promise<boolean> {
  const cutoffTime = new Date(Date.now() - config.loginHistory.failedAttemptsWindowMs)

  const recentFailures = await db
    .collection('loginHistory')
    .where('userId', '==', userId)
    .where('status', '==', 'failed')
    .where('timestamp', '>', cutoffTime)
    .get()

  const failedCount = recentFailures.size

  if (failedCount >= config.loginHistory.maxFailedAttempts) {
    console.log(
      `🚫 Account temporarily locked for user: ${userId} (${failedCount} failed attempts)`,
    )
    return true
  }

  return false
}

/**
 * Gets login history for a user with pagination
 */
export async function getLoginHistory(userId: string, limit: number = 20, lastDocId?: string) {
  let query = db
    .collection('loginHistory')
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .limit(limit + 1) // Get one extra to check if there are more

  // If lastDocId is provided, start after that document
  if (lastDocId) {
    const lastDoc = await db.collection('loginHistory').doc(lastDocId).get()
    if (lastDoc.exists) {
      query = query.startAfter(lastDoc)
    }
  }

  const historySnapshot = await query.get()

  // Check if there are more results
  const hasMore = historySnapshot.docs.length > limit
  const docs = hasMore ? historySnapshot.docs.slice(0, limit) : historySnapshot.docs

  const history = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp?.toDate().toISOString(),
  }))

  const lastDocIdResponse = docs.length > 0 ? docs[docs.length - 1].id : null

  return {
    history,
    count: docs.length,
    hasMore,
    lastDocId: lastDocIdResponse,
  }
}

/**
 * Deletes all login history for a user
 */
export async function deleteLoginHistory(userId: string): Promise<void> {
  const loginHistorySnapshot = await db
    .collection('loginHistory')
    .where('userId', '==', userId)
    .get()

  const batch = db.batch()
  loginHistorySnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref)
  })

  if (!loginHistorySnapshot.empty) {
    await batch.commit()
  }
}
