<template>
  <div class="box-wrapper">
    <div class="box login-box">
      <!-- Hero Header -->
      <div class="hero-header">
        <div class="hero-icon">👋</div>
        <h1 class="hero-title">Welcome back</h1>
        <p class="hero-subtitle">Log in to your account to continue</p>
      </div>

      <!-- Form Content -->
      <form @submit.prevent="onSubmit" novalidate class="form-content">
        <div class="form-group">
          <label for="email">
            <span class="label-icon">📧</span>
            Email Address
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="you@example.com"
            required
            autocomplete="email"
            :class="{ 'input-error': emailError }"
            @blur="validateEmailField"
          />
          <small v-if="emailError" class="field-error">{{ emailError }}</small>
          <small v-else class="field-hint">Enter your registered email</small>
        </div>

        <div class="form-group">
          <label for="password">
            <span class="label-icon">🔒</span>
            Password
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="••••••••"
            required
            autocomplete="current-password"
            :class="{ 'input-error': passwordError }"
            @blur="validatePasswordField"
          />
          <small v-if="passwordError" class="field-error">{{ passwordError }}</small>
          <small v-else class="field-hint">At least 6 characters</small>
        </div>

        <!-- Submit Button -->
        <button :disabled="loading || disabled" type="submit" class="btn btn-primary btn-block">
          <span v-if="!loading" class="btn-content">
            <span class="btn-icon">🚀</span>
            Log in
          </span>
          <span v-else class="btn-content">
            <span class="btn-loader"></span>
            Logging in...
          </span>
        </button>

        <!-- Register Link -->
        <div class="register-hint">
          <span class="hint-text">Don't have an account?</span>
          <router-link class="form-link" to="/register">
            Sign up
            <span class="link-arrow">→</span>
          </router-link>
        </div>

        <!-- Security Notice -->
        <div class="security-notice">
          <span class="notice-icon">🔐</span>
          <span class="notice-text">Your connection is secure and encrypted</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const { loading } = storeToRefs(auth)

const email = ref('')
const password = ref('')

const emailError = ref('')
const passwordError = ref('')

const disabled = computed(() => {
  return !email.value.trim() || !password.value || !!emailError.value || !!passwordError.value
})

const validateEmailField = () => {
  const val = email.value.trim()
  if (!val) {
    emailError.value = ''
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    emailError.value = 'Please enter a valid email address'
  } else {
    emailError.value = ''
  }
}

const validatePasswordField = () => {
  const val = password.value
  if (!val) {
    passwordError.value = ''
  } else if (val.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
  } else {
    passwordError.value = ''
  }
}

const onSubmit = async () => {
  validateEmailField()
  validatePasswordField()

  if (disabled.value) return

  try {
    await auth.login({
      email: email.value.trim(),
      password: password.value,
    })
    router.push('/profile')
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped>
.login-box {
  max-width: 480px;
  margin: 0 auto;
}

/* Hero Header - jak w AboutView */
.hero-header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, rgba(166, 149, 255, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
  border-radius: 20px;
  border: 1px solid rgba(166, 149, 255, 0.2);
  margin-bottom: 32px;
}

.hero-icon {
  font-size: 56px;
  margin-bottom: 16px;
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  10%,
  30% {
    transform: rotate(14deg);
  }
  20%,
  40% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(0deg);
  }
}

.hero-title {
  margin: 0 0 12px;
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--brand) 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  margin: 0;
  font-size: 16px;
  color: #6b7280;
  font-weight: 500;
}

/* Form Content */
.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.label-icon {
  font-size: 16px;
}

.form-group input {
  box-sizing: border-box;
  width: 100%;
  padding: 14px 16px;
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

.form-group input.input-error {
  border-color: #ef4444;
}

.form-group input.input-error:focus {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.field-hint {
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
}

.field-error {
  font-size: 13px;
  color: #ef4444;
  margin: 0;
  font-weight: 500;
}

/* Error Box */
.error-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #dc2626;
  font-size: 14px;
  font-weight: 500;
}

.error-icon {
  font-size: 18px;
  flex-shrink: 0;
}

/* Submit Button */
.btn-block {
  width: 100%;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--brand) 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(166, 149, 255, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(166, 149, 255, 0.4);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-icon {
  font-size: 18px;
}

.btn-loader {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Register Hint */
.register-hint {
  text-align: center;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
}

.hint-text {
  color: #6b7280;
}

.form-link {
  color: var(--brand);
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
}

.form-link:hover {
  color: #8b5cf6;
}

.link-arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.form-link:hover .link-arrow {
  transform: translateX(4px);
}

/* Security Notice */
.security-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.04) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 10px;
  font-size: 13px;
  color: #047857;
  font-weight: 500;
}

.notice-icon {
  font-size: 16px;
}

/* Responsive */
@media (max-width: 540px) {
  .hero-title {
    font-size: 28px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .hero-icon {
    font-size: 48px;
  }

  .security-notice {
    font-size: 12px;
    padding: 10px;
  }
}
</style>
