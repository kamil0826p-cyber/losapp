import { config } from '../config'

export interface RegisterRequest {
  email: string
  password: string
  username: string
}

/**
 * Validates that all required fields are present in registration request
 */
export function validateRegisterInput(body: any): body is RegisterRequest {
  return Boolean(body.email && body.password && body.username)
}

/**
 * Validates email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates password meets minimum length requirement
 */
export function validatePassword(password: string): string | null {
  if (password.length < config.auth.minPasswordLength) {
    return `Password must be at least ${config.auth.minPasswordLength} characters`
  }
  return null
}

/**
 * Validates username meets length and format requirements
 */
export function validateUsername(username: string): string | null {
  if (username.trim().length < 2) {
    return 'Username must be at least 2 characters'
  }
  if (username.length > 50) {
    return 'Username must be less than 50 characters'
  }
  return null
}
