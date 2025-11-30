import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// ============================================================================
// Routes Configuration
// ============================================================================

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: HomeView, meta: { showHero: true } },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { requiresGuest: true },
  },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/terms-of-use',
    name: 'termsOfUse',
    component: () => import('../views/TermsOfUseView.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'privacyPolicy',
    component: () => import('../views/PrivacyPolicyView.vue'),
  },
  { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },
]

// ============================================================================
// Router Instance
// ============================================================================

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
})

// ============================================================================
// Auth State Management
// ============================================================================

class AuthGuard {
  private authReadyResolved = false
  private readonly authReadyPromise: Promise<void>

  constructor() {
    this.authReadyPromise = new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(getAuth(), () => {
        this.authReadyResolved = true
        unsubscribe()
        resolve()
      })
    })
  }

  async waitForAuth(): Promise<void> {
    if (!this.authReadyResolved) {
      await this.authReadyPromise
    }
  }

  getCurrentUser() {
    return getAuth().currentUser
  }
}

const authGuard = new AuthGuard()

// ============================================================================
// Navigation Guards
// ============================================================================

router.beforeEach(async (to) => {
  await authGuard.waitForAuth()

  const user = authGuard.getCurrentUser()
  const { requiresAuth, requiresGuest } = to.meta

  if (requiresAuth && !user) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (requiresGuest && user) {
    return { name: 'profile' }
  }

  return true
})

export default router
