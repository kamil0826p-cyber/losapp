<template>
  <div class="login-history">
    <div class="settings-card">
      <div class="card-header">
        <div class="header-content">
          <h3>🔐 Login History</h3>
          <p class="subtitle-text">Track your recent account activity</p>
        </div>
        <button class="btn-refresh" @click="() => fetchLoginHistory()" :disabled="loading">
          <span v-if="!loading" class="icon">🔄</span>
          <span v-else class="spinner">⏳</span>
        </button>
      </div>

      <p v-if="error" class="error-message">{{ error }}</p>

      <div v-if="loading && !loginHistory.length" class="loading">Loading...</div>

      <div v-else-if="!loginHistory.length" class="empty-state">
        <div class="empty-icon">🔐</div>
        <h4>No Login History</h4>
        <p>No login history found.</p>
      </div>

      <div v-else class="history-container">
        <ul class="history-list">
          <li
            v-for="entry in loginHistory"
            :key="entry.id"
            class="history-item"
            :class="{ failed: entry.status === 'failed' }"
          >
            <div class="history-item__icon">
              <span>{{ getDeviceIcon(entry.device) }}</span>
              <span class="status-badge">{{ getStatusIcon(entry.status) }}</span>
            </div>

            <div class="history-item__content">
              <div class="history-item__top">
                <strong class="browser">{{ entry.browser || 'Unknown' }}</strong>
                <span class="os">{{ entry.os || 'Unknown' }}</span>
              </div>
              <div class="history-item__bottom">
                <span class="date">{{ formatDate(entry.timestamp) }}</span>
                <span class="ip">{{ entry.ipAddress }}</span>
              </div>
            </div>
          </li>
        </ul>

        <div v-if="hasMore" class="load-more-container">
          <button class="btn-load-more" @click="loadMore" :disabled="loading">
            <span v-if="loading">Loading more...</span>
            <span v-else>Load More ({{ loginHistory.length }}+)</span>
          </button>
        </div>
      </div>

      <p class="retention-notice">
        💡 Login history older than 90 days is automatically removed when you sign in.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useLoginHistory } from '@/composables/useLoginHistory'

const {
  loginHistory,
  loading,
  error,
  hasMore,
  fetchLoginHistory,
  loadMore,
  formatDate,
  getDeviceIcon,
  getStatusIcon,
} = useLoginHistory()

onMounted(() => {
  fetchLoginHistory()
})
</script>

<style scoped>
.login-history {
  padding: 8px 0;
}

/* Matching Settings card style */
.settings-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 28px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 16px;
}

.header-content {
  flex: 1;
}

.card-header h3 {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  text-align:left;
}

.subtitle-text {
  color: #6b7280;
  font-size: 15px;
  margin: 0;
  text-align:left;
}

.btn-refresh {
  background: rgba(166, 149, 255, 0.1);
  border: 1px solid rgba(166, 149, 255, 0.3);
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-refresh:hover:not(:disabled) {
  background: rgba(166, 149, 255, 0.2);
  border-color: var(--brand);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(166, 149, 255, 0.2);
}

.btn-refresh:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-refresh .icon {
  display: inline-block;
  transition: transform 0.3s ease;
}

.btn-refresh:hover:not(:disabled) .icon {
  transform: rotate(90deg);
}

.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  color: #dc2626;
  background: #fef2f2;
  padding: 12px 14px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #fecaca;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
  font-size: 15px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-state h4 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.empty-state p {
  color: #6b7280;
  font-size: 15px;
  margin: 0;
}

.history-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  max-height: 500px;
  padding-right: 4px;
}

/* Custom scrollbar */
.history-list::-webkit-scrollbar {
  width: 8px;
}

.history-list::-webkit-scrollbar-track {
  background: rgba(166, 149, 255, 0.05);
  border-radius: 10px;
}

.history-list::-webkit-scrollbar-thumb {
  background: rgba(166, 149, 255, 0.3);
  border-radius: 10px;
  transition: background 0.2s ease;
}

.history-list::-webkit-scrollbar-thumb:hover {
  background: rgba(166, 149, 255, 0.5);
}

.history-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.history-item:hover {
  background: #fff;
  border-color: var(--brand);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(166, 149, 255, 0.12);
}

.history-item.failed {
  border-color: #fecaca;
  background: #fef2f2;
}

.history-item__icon {
  position: relative;
  font-size: 28px;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  font-size: 11px;
  background: white;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.history-item__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.history-item__top {
  display: flex;
  align-items: baseline;
  gap: 8px;
  line-height: 1.4;
}

.browser {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  line-height: 1.4;
}

.os {
  font-size: 13px;
  color: #6b7280;
  padding: 2px 8px;
  background: rgba(166, 149, 255, 0.1);
  border-radius: 6px;
  line-height: 1.4;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
}

.history-item__bottom {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
}

.date {
  font-weight: 500;
  line-height: 1.4;
}

.ip {
  font-family: 'Courier New', monospace;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  line-height: 1.4;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
}

.load-more-container {
  display: flex;
  justify-content: center;
  padding: 4px 0;
}

.btn-load-more {
  background: white;
  border: 2px dashed rgba(166, 149, 255, 0.3);
  border-radius: 10px;
  padding: 12px 32px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 600;
  color: var(--brand);
  min-width: 200px;
}

.btn-load-more:hover:not(:disabled) {
  background: rgba(166, 149, 255, 0.05);
  border-color: var(--brand);
  transform: translateY(-1px);
}

.btn-load-more:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.retention-notice {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
  font-size: 13px;
  color: #6b7280;
  text-align: center;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .settings-card {
    padding: 20px;
  }

  .card-header {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-refresh {
    align-self: flex-end;
  }

  .history-list {
    max-height: 400px;
  }

  .history-item {
    padding: 12px 14px;
  }

  .history-item__icon {
    font-size: 24px;
    width: 28px;
    height: 28px;
  }

  .browser {
    font-size: 14px;
  }

  .os {
    font-size: 12px;
    padding: 1px 6px;
  }

  .history-item__bottom {
    font-size: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>
