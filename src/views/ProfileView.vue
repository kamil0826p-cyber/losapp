<template>
  <div class="box-wrapper">
    <div class="box box-broad">
      <AuroraTabs v-model="active" :items="tabs">
        <template #overview>
          <AccountOverview @navigate-to-tab="(index: number) => (active = index)" />
        </template>

        <template #activity>
          <LoginHistory />
        </template>

        <template #gallery>
          <div class="empty-state">
            <div class="empty-icon">🖼️</div>
            <h3>Gallery Coming Soon</h3>
            <p class="subtitle-text">Your generated images will appear here</p>
          </div>
        </template>

        <template #settings>
          <AccountSettings />
        </template>
      </AuroraTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuroraTabs from '@/components/AuroraTabs.vue'
import LoginHistory from '@/components/LoginHistory.vue'
import AccountSettings from '@/components/AccountSettings.vue'
import AccountOverview from '@/components/AccountOverview.vue'
import { ref } from 'vue'

const active = ref(0)
const tabs = [
  { id: 'overview', label: 'Overview', icon: '👤', slot: 'overview' },
  { id: 'activity', label: 'Activity', icon: '📈', slot: 'activity' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️', slot: 'gallery' },
  { id: 'settings', label: 'Settings', icon: '⚙️', slot: 'settings' },
]
</script>

<style scoped>
/* Empty State */
.empty-state {
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-state h3 {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 700;
  color: #111827;
}

.subtitle-text {
  color: #6b7280;
  font-size: 15px;
  margin: 0;
}
</style>
