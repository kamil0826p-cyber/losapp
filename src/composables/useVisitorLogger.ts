import axios from 'axios'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

// ============================================================================
// Types
// ============================================================================

interface IpResponse {
  ip: string
}

interface GeoData {
  city?: string
  region?: string
  country_name?: string
  country?: string
  latitude?: number
  lat?: number
  longitude?: number
  lon?: number
  postal?: string
}

interface VisitorData {
  timestamp: ReturnType<typeof serverTimestamp>
  ipAddress: string | null
  referrer: string | null
  browser: string
  device: string
  os: string
  userAgent: string
  geo: {
    city: string | null
    region: string | null
    country: string | null
    latitude: number | null
    longitude: number | null
    postal: string | null
    raw: GeoData | null
  } | null
}

// ============================================================================
// Constants
// ============================================================================

const IP_API_URL = 'https://api.ipify.org?format=json'
const GEO_API_URL = 'https://ipapi.co'
const VISITS_COLLECTION = 'visits'

// ============================================================================
// User Agent Detection
// ============================================================================

class UserAgentDetector {
  constructor(private userAgent: string) {}

  getBrowser(): string {
    if (this.userAgent.includes('Edg')) return 'Microsoft Edge'
    if (this.userAgent.includes('OPR') || this.userAgent.includes('Opera')) return 'Opera'
    if (this.userAgent.includes('Chrome')) return 'Google Chrome'
    if (this.userAgent.includes('Firefox')) return 'Mozilla Firefox'
    if (this.userAgent.includes('Safari')) return 'Apple Safari'
    return 'Unknown'
  }

  getDevice(): string {
    if (/Tablet|iPad/i.test(this.userAgent)) return 'Tablet'
    if (/Mobi|Android/i.test(this.userAgent)) return 'Mobile'
    return 'Desktop'
  }

  getOS(): string {
    if (this.userAgent.includes('Windows')) return 'Windows'
    if (this.userAgent.includes('Mac OS')) return 'macOS'
    if (this.userAgent.includes('Android')) return 'Android'
    if (this.userAgent.includes('iPhone') || this.userAgent.includes('iPad')) return 'iOS'
    if (this.userAgent.includes('Linux')) return 'Linux'
    return 'Other'
  }
}

// ============================================================================
// API Services
// ============================================================================

class IpService {
  static async fetchIpAddress(): Promise<string | null> {
    try {
      const response = await axios.get<IpResponse>(IP_API_URL)
      return response?.data?.ip || null
    } catch (error) {
      console.warn('⚠️ Could not fetch IP address:', error)
      return null
    }
  }
}

class GeoService {
  static async fetchGeoData(ip: string): Promise<GeoData | null> {
    try {
      const response = await axios.get<GeoData>(`${GEO_API_URL}/${ip}/json/`)
      return response.data
    } catch (error) {
      console.warn('⚠️ Could not fetch geo data:', error)
      return null
    }
  }

  static normalizeGeoData(geo: GeoData | null) {
    if (!geo) return null

    return {
      city: geo.city || null,
      region: geo.region || null,
      country: geo.country_name || geo.country || null,
      latitude: geo.latitude || geo.lat || null,
      longitude: geo.longitude || geo.lon || null,
      postal: geo.postal || null,
      raw: geo,
    }
  }
}

// ============================================================================
// Visitor Data Builder
// ============================================================================

class VisitorDataBuilder {
  private ipAddress: string | null = null
  private geoData: GeoData | null = null

  async withIpAndGeo(): Promise<this> {
    this.ipAddress = await IpService.fetchIpAddress()

    if (this.ipAddress) {
      this.geoData = await GeoService.fetchGeoData(this.ipAddress)
    }

    return this
  }

  build(): VisitorData {
    const detector = new UserAgentDetector(navigator.userAgent)

    return {
      timestamp: serverTimestamp(),
      ipAddress: this.ipAddress,
      referrer: document.referrer || null,
      browser: detector.getBrowser(),
      device: detector.getDevice(),
      os: detector.getOS(),
      userAgent: navigator.userAgent,
      geo: GeoService.normalizeGeoData(this.geoData),
    }
  }
}

// ============================================================================
// Firestore Service
// ============================================================================

class VisitorLogger {
  static async log(data: VisitorData): Promise<void> {
    try {
      await addDoc(collection(db, VISITS_COLLECTION), data)
    } catch (error) {
      console.error('❌ Failed to log visitor:', error)
      throw error
    }
  }
}

// ============================================================================
// Public API
// ============================================================================

export async function logVisitor(): Promise<void> {
  try {
    const isLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '[::1]'

    if (isLocalhost) {
      console.log('🚫 Skipping visitor logging on localhost')
      return
    }

    const visitorData = await new VisitorDataBuilder()
      .withIpAndGeo()
      .then((builder) => builder.build())

    await VisitorLogger.log(visitorData)
  } catch (error) {
    console.error('❌ Error logging visitor:', error)
  }
}
