<template>
  <div id="app">
    <MainHeader />
    <main class="main-content">
      <router-view />
    </main>
    <CookieConsent />
    <ToastContainer />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import MainHeader from './components/MainHeader.vue'
import CookieConsent from '@/components/CookieConsent.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import { useConsentStore } from '@/stores/consent'
import { logVisitor } from '@/composables/useVisitorLogger'
import Footer from '@/components/Footer.vue'

const consent = useConsentStore()

watch(
  () => consent.hasConsent,
  async (enabled: boolean) => {
    if (enabled) {
      await logVisitor()
    }
  },
)

onMounted(async () => {
  try {
    // await logVisitor()
  } catch {
    // Silent error
  }
})
</script>

<style>
:root {
  --bg-app: #f9fafb;
  --brand: rgb(166 149 255);
  --space-4: 28px;
  --space-5: 32px;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

#app {
  background: var(--bg-app);
  min-height: 100vh;
  padding-top: 52px;
}

.main-content {
  max-width: 1200px;
  margin: 20px auto;
}

@media (max-width: 768px) {
  .main-content {
    margin: 20px 8px;
  }
}
</style>
