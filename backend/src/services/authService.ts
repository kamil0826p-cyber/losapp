import admin from 'firebase-admin'
import { config } from '../config'

const db = admin.firestore()
const auth = admin.auth()

/**
 * Creates a new user in Firebase Authentication
 */
export async function createUserInAuth(email: string, password: string, username: string) {
  return await auth.createUser({
    email,
    password,
    displayName: username.trim(),
  })
}

/**
 * Creates a new user document in Firestore
 */
export async function createUserInFirestore(uid: string) {
  await db.collection('users').doc(uid).set({
    credits: config.auth.initialCredits,
    accountType: config.auth.defaultAccountType,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  })
}

/**
 * Rolls back user creation in case of errors
 */
export async function rollbackUserCreation(uid: string): Promise<void> {
  try {
    await auth.deleteUser(uid)
    console.log('✅ Rolled back user creation for uid:', uid)
  } catch (rollbackError) {
    console.error('❌ Rollback failed:', rollbackError)
  }
}

/**
 * Updates user's display name
 */
export async function updateUserDisplayName(userId: string, displayName: string): Promise<void> {
  await auth.updateUser(userId, {
    displayName: displayName.trim(),
  })
}

/**
 * Deletes a user from Firebase Auth
 */
export async function deleteUserFromAuth(userId: string): Promise<void> {
  await auth.deleteUser(userId)
}

/**
 * Deletes user document from Firestore
 */
export async function deleteUserFromFirestore(userId: string): Promise<void> {
  const userRef = db.collection('users').doc(userId)
  await userRef.delete()
}

/**
 * Verifies Firebase ID token and returns decoded token
 */
export async function verifyIdToken(idToken: string) {
  return await auth.verifyIdToken(idToken)
}

/**
 * Gets user by email
 */
export async function getUserByEmail(email: string) {
  return await auth.getUserByEmail(email)
}
