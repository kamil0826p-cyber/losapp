import axios from 'axios'
import { getAuth } from 'firebase/auth'

const API_URL = import.meta.env.VITE_API_URL as string | undefined

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined in environment variables')
}

/**
 * Preconfigured axios instance with base URL and auth token interceptor
 */
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Automatically attach Firebase ID token to all requests
 */
apiClient.interceptors.request.use(async (config) => {
  const user = getAuth().currentUser
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Export API URL for legacy code
 */
export const API_BASE_URL = API_URL
