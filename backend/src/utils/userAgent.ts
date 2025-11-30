export interface DeviceInfo {
  browser: string
  os: string
  device: 'Mobile' | 'Desktop'
}

/**
 * Parses user agent string to extract browser, OS, and device type
 */
export function parseUserAgent(userAgent: string): DeviceInfo {
  const browser = userAgent.includes('Chrome')
    ? 'Chrome'
    : userAgent.includes('Firefox')
      ? 'Firefox'
      : userAgent.includes('Safari')
        ? 'Safari'
        : userAgent.includes('Edge')
          ? 'Edge'
          : 'Unknown'

  const os = userAgent.includes('Windows')
    ? 'Windows'
    : userAgent.includes('Mac')
      ? 'macOS'
      : userAgent.includes('Linux')
        ? 'Linux'
        : userAgent.includes('Android')
          ? 'Android'
          : userAgent.includes('iOS')
            ? 'iOS'
            : 'Unknown'

  const device = userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'

  return { browser, os, device }
}
