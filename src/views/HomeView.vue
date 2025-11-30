<template>
  <div class="home-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to <span class="brand-text">LosApp</span></h1>
        <p class="hero-subtitle">
          Your all-in-one platform for creative AI generation and seamless project management.
        </p>
        <div class="hero-actions">
          <router-link to="/register" class="btn btn-primary btn-lg">
            Get Started Free 🚀
          </router-link>
          <button class="btn btn-secondary btn-lg" @click="openChangelog">View Changelog 📋</button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="visual-circle"></div>
        <div class="visual-icon">✨</div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="features-section">
      <div class="feature-card">
        <div class="feature-icon">🎨</div>
        <h3>AI Generation</h3>
        <p>Create stunning visuals with our advanced AI models.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>Lightning Fast</h3>
        <p>Optimized performance for a smooth experience.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🛡️</div>
        <h3>Secure & Private</h3>
        <p>Your data and creations are protected.</p>
      </div>
    </div>

    <!-- Changelog Modal -->
    <BaseModal :isOpen="isChangelogOpen" title="Changelog" @close="closeChangelog" maxWidth="600px">
      <div class="changelog-content">
        <div class="changelog-section">
          <h4>🚀 Already Implemented</h4>
          <ul>
            <li>Account settings</li>
            <li>Redesign all pages</li>
            <li>Security - implement authorization logs</li>
            <li>Improve registration system</li>
            <li>Code refactor</li>
            <li>Profile page UI</li>
            <li>Contact page UI</li>
            <li>Migrate app from Vue Cli to Vite</li>
            <li>Animation performance optimization</li>
            <li>Loading info top bar</li>
            <li>RODO component</li>
            <li>UI improvements</li>
            <li>Client-side route guarding</li>
            <li>Implemented server-side anti-flood protection</li>
            <li>Complete user authentication with Firebase</li>
            <li>Vue client-side app and backend successfully set up</li>
          </ul>
        </div>

        <div class="changelog-section">
          <h4>🚧 In Progress</h4>
          <ul>
            <li>Advanced AI model integration</li>
          </ul>
        </div>
      </div>
      <template #footer>
        <button class="btn btn-secondary" @click="closeChangelog">Close</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const isChangelogOpen = ref(false)

const openChangelog = () => {
  isChangelogOpen.value = true
}

const closeChangelog = () => {
  isChangelogOpen.value = false
}
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 40px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.8) 100%);
  border-radius: 24px;
  border: 1px solid rgba(229, 231, 235, 0.5);
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.hero-content {
  flex: 1;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 20px;
  line-height: 1.2;
}

.brand-text {
  background: linear-gradient(135deg, var(--brand) 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 32px;
  max-width: 600px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 16px;
}

.hero-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.visual-circle {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(166, 149, 255, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%);
  border-radius: 50%;
  filter: blur(40px);
  position: absolute;
}

.visual-icon {
  font-size: 120px;
  position: relative;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Buttons */
.btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.btn-lg {
  padding: 16px 32px;
  font-size: 1.125rem;
}

.btn-primary {
  background: var(--brand);
  color: white;
  box-shadow: 0 4px 12px rgba(166, 149, 255, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(166, 149, 255, 0.4);
}

.btn-secondary {
  background: white;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  color: #111827;
}

/* Features Section */
.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.feature-card {
  background: white;
  padding: 32px;
  border-radius: 20px;
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border-color: rgba(166, 149, 255, 0.3);
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
}

/* Changelog Content */
.changelog-content {
  padding: 10px 0;
}

.changelog-section {
  margin-bottom: 24px;
}

.changelog-section h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.changelog-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.changelog-section li {
  position: relative;
  padding-left: 24px;
  margin-bottom: 8px;
  color: #4b5563;
  line-height: 1.5;
}

.changelog-section li::before {
  content: '•';
  color: var(--brand);
  position: absolute;
  left: 8px;
  font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding: 40px 20px;
  }

  .hero-visual {
    margin-top: 40px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-actions {
    justify-content: center;
    flex-direction: column;
  }

  .btn-lg {
    width: 100%;
  }
}
</style>
