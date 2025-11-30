<template>
  <div class="profile-overview">
    <!-- Hero Welcome Section -->
    <div class="hero-welcome">
      <div class="avatar-circle">
        {{ avatarInitial }}
      </div>
      <div class="welcome-content">
        <h1 class="welcome-title">Welcome back, {{ displayName || 'User' }}! 👋</h1>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-section">
      <h2 class="section-title">Your Account Stats</h2>
      <div class="stats-grid">
        <div class="stat-card stat-primary">
          <div class="stat-icon">💎</div>
          <div class="stat-content">
            <div class="stat-value">{{ credits }}</div>
            <div class="stat-label">Credits Available</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🎨</div>
          <div class="stat-content">
            <div class="stat-value">0</div>
            <div class="stat-label">Generated Images</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-content">
            <div class="stat-value">Active</div>
            <div class="stat-label">Account Status</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Account Information -->
    <div class="info-section">
      <h2 class="section-title">Account Details</h2>
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon">🆔</div>
          <div class="info-content">
            <div class="info-label">User ID</div>
            <div class="info-value">{{ uid || 'N/A' }}</div>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">📧</div>
          <div class="info-content">
            <div class="info-label">Email Address</div>
            <div class="info-value">{{ email || 'N/A' }}</div>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">👤</div>
          <div class="info-content">
            <div class="info-label">Display Name</div>
            <div class="info-value">{{ displayName || 'Not set' }}</div>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">💳</div>
          <div class="info-content">
            <div class="info-label">Account Type</div>
            <div class="info-value" :style="{ color: accountTypeColor }">
              {{ accountTypeLabel }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Highlight -->
    <div class="features-section">
      <h2 class="section-title">What You Can Do</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3 class="feature-title">Generate Images</h3>
          <p class="feature-desc">Create stunning AI-powered artwork with your credits</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🖼️</div>
          <h3 class="feature-title">Save to Gallery</h3>
          <p class="feature-desc">All your creations are automatically saved</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3 class="feature-title">Track Activity</h3>
          <p class="feature-desc">Monitor your login history and usage</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">⚙️</div>
          <h3 class="feature-title">Customize Profile</h3>
          <p class="feature-desc">Update your settings and preferences</p>
        </div>
      </div>
    </div>

    <!-- Getting Started -->
    <div class="getting-started">
      <div class="started-content">
        <div class="started-icon">🚀</div>
        <div class="started-text">
          <h3 class="started-title">Ready to Create?</h3>
          <p class="started-desc">
            You have <strong>{{ credits }} credits</strong> available. Start generating amazing
            images now!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrentUser } from '@/composables/useCurrentUser'
import { computed } from 'vue'

const { displayName, email, uid, credits, accountTypeLabel, accountTypeColor } = useCurrentUser()

const avatarInitial = computed(() => {
  const name = displayName.value || email.value || 'U'
  return name.charAt(0).toUpperCase()
})
</script>

<style scoped>
.profile-overview {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 8px 0;
}

/* Hero Welcome Section */
.hero-welcome {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: linear-gradient(135deg, rgba(166, 149, 255, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
  border-radius: 20px;
  border: 1px solid rgba(166, 149, 255, 0.2);
}

.avatar-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--brand) 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(166, 149, 255, 0.4);
}

.welcome-content {
  flex: 1;
}

.welcome-title {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 800;
  color: #111827;
}

/* Stats Section */
.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: var(--brand);
  box-shadow: 0 8px 24px rgba(166, 149, 255, 0.2);
  transform: translateY(-4px);
}

.stat-primary {
  background: linear-gradient(135deg, rgba(166, 149, 255, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%);
  border-color: rgba(166, 149, 255, 0.3);
}

.stat-icon {
  font-size: 36px;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Info Section */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  transition: all 0.2s ease;
}

.info-card:hover {
  background: #fff;
  border-color: rgba(166, 149, 255, 0.3);
  box-shadow: 0 4px 12px rgba(166, 149, 255, 0.1);
}

.info-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
  min-width: 0;
}

.info-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.info-value {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  word-break: break-all;
}

/* Features Section */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.feature-card {
  padding: 24px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: var(--brand);
  box-shadow: 0 8px 24px rgba(166, 149, 255, 0.15);
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}

.feature-title {
  margin: 0 0 8px;
  font-size: 17px;
  font-weight: 700;
  color: #111827;
}

.feature-desc {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

/* Getting Started */
.getting-started {
  background: linear-gradient(135deg, var(--brand) 0%, #8b5cf6 100%);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(166, 149, 255, 0.3);
}

.started-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.started-icon {
  font-size: 56px;
  flex-shrink: 0;
}

.started-text {
  flex: 1;
  color: white;
}

.started-title {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 800;
  color: white;
  text-align:left;
}

.started-desc {
  margin: 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  text-align:left;
}

.started-desc strong {
  color: white;
  font-weight: 700;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-welcome {
    flex-direction: column;
    text-align: center;
    padding: 28px 20px;
  }

  .welcome-title {
    font-size: 24px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .started-content {
    flex-direction: column;
    text-align: center;
  }

  .started-title {
    font-size: 20px;
  }

  .started-desc {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .avatar-circle {
    width: 80px;
    height: 80px;
    font-size: 36px;
  }

  .welcome-title {
    font-size: 20px;
  }

  .section-title {
    font-size: 18px;
  }

  .stat-value {
    font-size: 24px;
  }

  .stat-icon {
    font-size: 32px;
  }

  .started-icon {
    font-size: 48px;
  }
}
</style>
