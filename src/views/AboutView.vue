<template>
  <div class="box-wrapper">
    <div class="box box-broad">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-icon">✨</div>
        <h1 class="hero-title">About LosApp</h1>
        <p class="hero-subtitle">Your creative companion for AI-powered image generation</p>
      </div>

      <!-- Features Grid -->
      <div class="features-section">
        <h2 class="section-title">What We Offer</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3 class="feature-title">AI Image Generation</h3>
            <p class="feature-description">
              Create stunning, unique images with cutting-edge AI technology
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3 class="feature-title">Lightning Fast</h3>
            <p class="feature-description">
              Generate your images in seconds with our optimized infrastructure
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3 class="feature-title">Secure & Private</h3>
            <p class="feature-description">Your data is protected with enterprise-grade security</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">💎</div>
            <h3 class="feature-title">Credit System</h3>
            <p class="feature-description">Flexible credits system - pay only for what you use</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3 class="feature-title">Responsive Design</h3>
            <p class="feature-description">Access from any device - desktop, tablet, or mobile</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3 class="feature-title">Easy to Use</h3>
            <p class="feature-description">
              Intuitive interface designed for creators of all levels
            </p>
          </div>
        </div>
      </div>

      <!-- Tech Stack Section -->
      <div class="tech-section">
        <h2 class="section-title">Built With Modern Technology</h2>
        <div class="tech-grid">
          <div class="tech-badge">
            <span class="tech-icon">⚡</span>
            <span class="tech-name">Vue 3</span>
          </div>
          <div class="tech-badge">
            <span class="tech-icon">🔷</span>
            <span class="tech-name">TypeScript</span>
          </div>
          <div class="tech-badge">
            <span class="tech-icon">🔥</span>
            <span class="tech-name">Firebase</span>
          </div>
          <div class="tech-badge">
            <span class="tech-icon">🎨</span>
            <span class="tech-name">Vite</span>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="stats-section">
        <div class="stat-item">
          <div class="stat-value">1K+</div>
          <div class="stat-label">Active Users</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">99.9%</div>
          <div class="stat-label">Uptime</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">24/7</div>
          <div class="stat-label">Support</div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="cta-section">
        <h2 class="cta-title">Ready to Start Creating?</h2>
        <p class="cta-description">
          Join thousands of creators using LosApp to bring their imagination to life
        </p>
        <router-link to="/register" class="btn btn-primary btn-large">
          Get Started Free 🚀
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hero Section */
.hero-section {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, rgba(166, 149, 255, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
  border-radius: 20px;
  border: 1px solid rgba(166, 149, 255, 0.2);
  margin-bottom: 48px;
}

.hero-icon {
  font-size: 64px;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.hero-title {
  margin: 0 0 12px;
  font-size: 42px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--brand) 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  margin: 0;
  font-size: 18px;
  color: #6b7280;
  font-weight: 500;
}

/* Features Section */
.features-section {
  margin-bottom: 48px;
}

.section-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 32px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.feature-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 28px;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: var(--brand);
  box-shadow: 0 8px 24px rgba(166, 149, 255, 0.2);
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}

.feature-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.feature-description {
  margin: 0;
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
}

/* Tech Stack Section */
.tech-section {
  background: #f9fafb;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 48px;
  text-align: center;
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}

.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-weight: 600;
  color: #111827;
  transition: all 0.2s ease;
}

.tech-badge:hover {
  border-color: var(--brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(166, 149, 255, 0.15);
}

.tech-icon {
  font-size: 24px;
}

.tech-name {
  font-size: 16px;
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  padding: 48px 0;
  margin-bottom: 48px;
}

.stat-item {
  text-align: center;
  padding: 24px;
  background: linear-gradient(135deg, rgba(166, 149, 255, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%);
  border-radius: 16px;
  border: 1px solid rgba(166, 149, 255, 0.1);
}

.stat-value {
  font-size: 42px;
  font-weight: 800;
  color: var(--brand);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* CTA Section */
.cta-section {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, var(--brand) 0%, #8b5cf6 100%);
  border-radius: 20px;
  color: white;
}

.cta-title {
  margin: 0 0 16px;
  font-size: 36px;
  font-weight: 800;
  color: white;
}

.cta-description {
  margin: 0 0 32px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.btn-large {
  padding: 16px 40px;
  font-size: 18px;
  font-weight: 700;
  background: white;
  color: var(--brand);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-large:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.btn-large:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .section-title {
    font-size: 26px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta-title {
    font-size: 28px;
  }

  .cta-description {
    font-size: 16px;
  }

  .tech-section {
    padding: 30px 20px;
  }
}

@media (max-width: 480px) {
  .hero-icon {
    font-size: 48px;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .stat-value {
    font-size: 36px;
  }
}
</style>
