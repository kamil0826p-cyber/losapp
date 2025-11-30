import { apiClient } from '@/api/client'
import type { LoginHistoryEntry } from '@/types/loginHistory'

export interface LoginHistoryResponse {
  history: LoginHistoryEntry[]
  count: number
  hasMore: boolean
  lastDocId: string | null
}

export class LoginHistoryService {
  static async getLoginHistory(
    idToken: string,
    limit: number = 20,
    lastDocId?: string,
  ): Promise<LoginHistoryResponse> {
    const params = new URLSearchParams({ limit: limit.toString() })
    if (lastDocId) {
      params.append('lastDocId', lastDocId)
    }

    const response = await apiClient.get(`auth/login-history?${params}`)

    return {
      history: response.data.history.map((entry: LoginHistoryEntry) => ({
        ...entry,
        timestamp: new Date(entry.timestamp),
      })),
      count: response.data.count,
      hasMore: response.data.hasMore,
      lastDocId: response.data.lastDocId,
    }
  }

  static async logSuccessfulLogin(idToken: string): Promise<void> {
    await apiClient.post('auth/log-successful-login', { idToken })
  }

  static async logFailedLogin(email: string): Promise<void> {
    await apiClient.post('auth/log-failed-login', { email })
  }
}
