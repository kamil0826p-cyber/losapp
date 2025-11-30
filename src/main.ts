import './assets/main.css'
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import NProgress from 'nprogress'
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { onAuthStateChanged } from 'firebase/auth'
import { auth as firebaseAuth } from '@/firebase'

import { useAuthStore } from '@/stores/auth'

NProgress.configure({ minimum: 1, showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

axios.interceptors.request.use((c: InternalAxiosRequestConfig) => {
  NProgress.start()
  return c
})
axios.interceptors.response.use(
  (r: AxiosResponse) => {
    NProgress.done()
    return r
  },
  (e: AxiosError) => {
    NProgress.done()
    return Promise.reject(e)
  },
)

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

const authStore = useAuthStore()
let appInitialized = false

authStore.bindAuthListeners()

onAuthStateChanged(firebaseAuth, async (user) => {
  if (user) {
    const idToken = await user.getIdToken(true)
    authStore.$patch({
      user: {
        uid: user.uid,
        email: user.email ?? undefined,
        displayName: user.displayName ?? undefined,
      },
      token: idToken,
      error: null,
    })
    localStorage.setItem('auth_token', idToken)
  } else {
    authStore.$patch({ user: null, token: null, error: null })
    localStorage.removeItem('auth_token')
  }

  if (!appInitialized) {
    app.mount('#app')
    appInitialized = true
  }
})
