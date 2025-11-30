export interface LoginHistoryEntry {
  id: string
  userId: string
  timestamp: Date
  ipAddress: string
  userAgent: string
  browser?: string
  os?: string
  device?: string
  status: 'success' | 'failed'
  method: 'email' | 'google' | 'facebook'
  location?: string
}

export interface DeviceInfo {
  browser: string
  os: string
  device: string
}
