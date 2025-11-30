import { auth } from '@/firebase'
import {
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User as FirebaseUser,
  type UserCredential,
} from 'firebase/auth'
import { apiClient } from '@/api/client'

export interface RegisterPayload {
  email: string
  password: string
  username?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export class AuthService {
  static async register(payload: RegisterPayload): Promise<any> {
    const response = await apiClient.post('auth/register', payload)
    return response.data
  }

  static async login(payload: LoginPayload): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, payload.email, payload.password)
  }

  static async logout(): Promise<void> {
    await signOut(auth)
  }

  static async updateDisplayName(user: FirebaseUser, name: string): Promise<void> {
    await updateProfile(user, { displayName: name })
  }
}
