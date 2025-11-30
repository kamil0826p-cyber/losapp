<template>
  <div class="account-settings">
    <div class="settings-section">
      <div class="settings-card">
        <div class="card-header">
          <h3>👤 Profile Information</h3>
          <p class="subtitle-text">Manage your personal details</p>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label for="displayName">Display Name</label>
            <input
              id="displayName"
              v-model="editableDisplayName"
              type="text"
              placeholder="Enter your name"
              :disabled="settingsLoading"
              @keyup.enter="handleUpdateDisplayName"
            />
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input :value="email" type="email" disabled />
          </div>
        </div>

        <button
          @click="handleUpdateDisplayName"
          :disabled="settingsLoading || !isDisplayNameChanged"
          class="btn btn-primary btn-save"
        >
          {{ settingsLoading ? 'Saving...' : '💾 Save Changes' }}
        </button>
      </div>

      <div class="settings-card danger-card">
        <div class="card-header">
          <h3>⚠️ Danger Zone</h3>
          <p class="subtitle-text">Irreversible actions</p>
        </div>

        <div class="danger-content">
          <div class="warning-box">
            <p class="warning-main">
              <strong>Warning:</strong> Deleting your account is permanent and cannot be undone.
            </p>
            <p class="warning-details">All your data will be permanently deleted:</p>
            <ul class="warning-list">
              <li>Your profile and settings</li>
              <li>Your credits ({{ credits }} credits)</li>
              <li>Your login history</li>
              <li>Your gallery and generated content</li>
            </ul>
          </div>

          <button @click="handleDeleteAccount" :disabled="settingsLoading" class="btn btn-danger">
            🗑️ Delete My Account
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <BaseModal
      :isOpen="showDeleteModal"
      title="⚠️ Delete Account?"
      maxWidth="550px"
      @close="closeDeleteModal"
    >
      <div class="modal-content">
        <div class="warning-box mb-4">
          <p class="warning-main">
            <strong>Warning:</strong> This action is <strong>PERMANENT</strong> and
            <strong>IRREVERSIBLE</strong>.
          </p>
          <p class="warning-details">All your data will be permanently deleted:</p>
          <ul class="warning-list">
            <li>Your profile and settings</li>
            <li>Your credits ({{ credits }} credits)</li>
            <li>Your login history</li>
            <li>Your gallery and generated content</li>
          </ul>
        </div>

        <div class="confirmation-input-section">
          <label for="deleteConfirm" class="confirm-label">
            To confirm, type <strong>DELETE</strong> in the box below:
          </label>
          <input
            id="deleteConfirm"
            v-model="deleteConfirmationInput"
            type="text"
            class="confirm-input"
            placeholder="Type DELETE"
            autocomplete="off"
          />
        </div>
      </div>

      <template #footer>
        <button class="btn btn-secondary" @click="closeDeleteModal">Cancel</button>
        <button
          class="btn btn-danger"
          :disabled="deleteConfirmationInput !== 'DELETE' || settingsLoading"
          @click.prevent="confirmDeleteAccount"
        >
          {{ settingsLoading ? 'Deleting...' : '🗑️ Delete Account' }}
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { useCurrentUser } from '@/composables/useCurrentUser'
import { useAccountSettings } from '@/composables/useAccountSettings'
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToastStore } from '@/stores/toast'
import BaseModal from '@/components/ui/BaseModal.vue'

const { displayName, email, credits, refreshUserProfile } = useCurrentUser()
const router = useRouter()

const {
  loading: settingsLoading,
  error: settingsError,
  updateDisplayName,
  deleteAccount,
} = useAccountSettings()

const editableDisplayName = ref(displayName.value || '')
const toast = useToastStore()

// Modal state
const showDeleteModal = ref(false)
const deleteConfirmationInput = ref('')

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deleteConfirmationInput.value = ''
}

watch(displayName, (newValue) => {
  editableDisplayName.value = newValue || ''
})

const isDisplayNameChanged = computed(() => {
  return (
    editableDisplayName.value.trim() !== (displayName.value || '').trim() &&
    editableDisplayName.value.trim().length >= 2
  )
})

const handleUpdateDisplayName = async () => {
  if (!isDisplayNameChanged.value) return

  const success = await updateDisplayName(editableDisplayName.value.trim(), async () => {
    await refreshUserProfile()
  })

  if (success) {
    toast.success('Display name updated successfully!')
  } else {
    toast.error(settingsError.value || 'Failed to update display name')
  }
}

const handleDeleteAccount = () => {
  showDeleteModal.value = true
}

const confirmDeleteAccount = async () => {
  if (deleteConfirmationInput.value !== 'DELETE' || settingsLoading.value) return

  const success = await deleteAccount()

  if (success) {
    toast.success('Your account has been successfully deleted.')
    closeDeleteModal()
    router.push('/')
  } else {
    toast.error('Failed to delete account. Please try again.')
  }
}
</script>

<style scoped>
.account-settings {
  padding: 8px 0;
}

/* Settings Section */
.settings-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.settings-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 28px;
  text-align: left;
}

.card-header {
  margin-bottom: 24px;
}

.card-header h3 {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.subtitle-text {
  color: #6b7280;
  font-size: 15px;
  margin: 0;
}

/* Form styling */
.form-grid {
  display: grid;
  gap: 16px;
}

.form-group {
  display: grid;
  gap: 8px;
  text-align: left;
  margin-bottom: 0;
}

.form-group label {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.form-group input {
  box-sizing: border-box;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #eef0f4;
  border-radius: 12px;
  font-size: 15px;
  background: #fff;
  color: #1f2230;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 4px rgba(166, 149, 255, 0.18);
}

.form-group input:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
  color: #9ca3af;
}

/* Messages Container */
.messages-container {
  width: 100%;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Messages */
.message {
  display: block;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 500;
}

.btn-save {
  margin-top: 20px;
  width: 100%;
}

.message-error {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.message-success {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

/* Danger Card */
.danger-card {
  background: #fff;
  border: 2px solid #fecaca;
}

.danger-card .card-header h3 {
  color: #dc2626;
}

.danger-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.warning-box {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 20px;
  font-size: 14px;
}

.warning-main {
  margin: 0 0 12px;
  color: #111827;
  font-size: 15px;
  line-height: 1.6;
}

.warning-main strong {
  color: #dc2626;
  font-weight: 700;
}

.warning-details {
  margin: 12px 0 8px;
  font-weight: 600;
  color: #111827;
  font-size: 14px;
}

.warning-list {
  margin: 8px 0 0;
  padding-left: 24px;
  color: #374151;
  font-size: 14px;
  line-height: 1.7;
}

.warning-list li {
  margin: 6px 0;
}

.btn-danger {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-danger:hover:not(:disabled) {
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
}

.btn-danger:active:not(:disabled) {
  transform: translateY(0);
}

.btn-danger:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 640px) {
  .settings-card {
    padding: 20px;
  }
}

/* Modal Specific Styles */
.mb-4 {
  margin-bottom: 20px;
}

.confirmation-input-section {
  margin-top: 24px;
}

.confirm-label {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.confirm-input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
  background: #f9fafb;
  color: #111827;
}

.confirm-input:focus {
  border-color: #dc2626;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1);
}

.btn-secondary {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #374151;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  color: #111827;
}

/* Refined Warning Box for Modal */
.warning-box {
  background: #fef2f2;
  border: 1px solid #fee2e2;
  border-radius: 16px;
  padding: 24px;
  font-size: 14px;
}

.warning-main {
  margin: 0 0 16px;
  color: #1f2937;
  font-size: 15px;
  line-height: 1.6;
}

.warning-details {
  margin: 16px 0 12px;
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 12px;
}

.warning-list {
  margin: 0;
  padding-left: 20px;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.8;
}

.warning-list li {
  margin: 4px 0;
}
</style>
