<template>
  <div class="box-wrapper">
    <div class="box box-broad">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-icon">🔒</div>
        <h1 class="hero-title">Privacy Policy</h1>
        <p class="hero-subtitle">Your privacy matters to us</p>
        <p class="last-updated">Last updated: November 15, 2025</p>
      </div>

      <!-- Introduction -->
      <section class="content-section">
        <h2 class="section-title">Introduction</h2>
        <p class="section-text">
          Welcome to LosApp. We respect your privacy and are committed to protecting your personal
          data. This privacy policy will inform you about how we look after your personal data when
          you visit our application and tell you about your privacy rights.
        </p>
      </section>

      <!-- Information We Collect -->
      <section class="content-section">
        <h2 class="section-title">Information We Collect</h2>
        <div class="info-grid">
          <div class="info-card">
            <div class="info-icon">👤</div>
            <h3 class="info-title">Personal Information</h3>
            <ul class="info-list">
              <li>Email address</li>
              <li>Name and username</li>
              <li>Account credentials</li>
              <li>Profile information</li>
            </ul>
          </div>

          <div class="info-card">
            <div class="info-icon">📊</div>
            <h3 class="info-title">Usage Data</h3>
            <ul class="info-list">
              <li>Login history</li>
              <li>IP addresses</li>
              <li>Browser type and version</li>
              <li>Device information</li>
            </ul>
          </div>

          <div class="info-card">
            <div class="info-icon">🎨</div>
            <h3 class="info-title">Generated Content</h3>
            <ul class="info-list">
              <li>AI-generated images</li>
              <li>Prompts and settings</li>
              <li>Creation timestamps</li>
              <li>Usage statistics</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- How We Use Your Data -->
      <section class="content-section">
        <h2 class="section-title">How We Use Your Data</h2>
        <div class="purpose-grid">
          <div class="purpose-item">
            <span class="purpose-emoji">✅</span>
            <div>
              <h3 class="purpose-title">Provide Services</h3>
              <p class="purpose-text">To deliver and maintain our AI image generation services</p>
            </div>
          </div>

          <div class="purpose-item">
            <span class="purpose-emoji">🔐</span>
            <div>
              <h3 class="purpose-title">Security</h3>
              <p class="purpose-text">To protect your account and detect fraudulent activity</p>
            </div>
          </div>

          <div class="purpose-item">
            <span class="purpose-emoji">📈</span>
            <div>
              <h3 class="purpose-title">Improve Experience</h3>
              <p class="purpose-text">To analyze usage and enhance our application</p>
            </div>
          </div>

          <div class="purpose-item">
            <span class="purpose-emoji">📧</span>
            <div>
              <h3 class="purpose-title">Communication</h3>
              <p class="purpose-text">To send important updates and notifications</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Data Security -->
      <section class="content-section highlight-section">
        <h2 class="section-title">Data Security</h2>
        <p class="section-text">
          We implement industry-standard security measures to protect your personal data:
        </p>
        <div class="security-grid">
          <div class="security-badge">
            <span class="security-icon">🔥</span>
            <span class="security-text">Firebase Authentication</span>
          </div>
          <div class="security-badge">
            <span class="security-icon">🔒</span>
            <span class="security-text">SSL Encryption</span>
          </div>
          <div class="security-badge">
            <span class="security-icon">🛡️</span>
            <span class="security-text">Secure Storage</span>
          </div>
          <div class="security-badge">
            <span class="security-icon">⚡</span>
            <span class="security-text">Rate Limiting</span>
          </div>
        </div>
      </section>

      <!-- Your Rights -->
      <section class="content-section">
        <h2 class="section-title">Your Rights</h2>
        <div class="rights-list">
          <div class="right-item">
            <div class="right-number">1</div>
            <div>
              <h3 class="right-title">Right to Access</h3>
              <p class="right-text">Request copies of your personal data</p>
            </div>
          </div>

          <div class="right-item">
            <div class="right-number">2</div>
            <div>
              <h3 class="right-title">Right to Rectification</h3>
              <p class="right-text">Request correction of inaccurate data</p>
            </div>
          </div>

          <div class="right-item">
            <div class="right-number">3</div>
            <div>
              <h3 class="right-title">Right to Erasure</h3>
              <p class="right-text">Request deletion of your personal data</p>
            </div>
          </div>

          <div class="right-item">
            <div class="right-number">4</div>
            <div>
              <h3 class="right-title">Right to Data Portability</h3>
              <p class="right-text">Request transfer of your data to another service</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Cookies -->
      <section class="content-section">
        <h2 class="section-title">Cookies & Tracking</h2>
        <p class="section-text">
          We use cookies and similar tracking technologies to improve your experience. Our cookie
          consent banner allows you to manage your preferences. Essential cookies are necessary for
          the application to function properly.
        </p>
      </section>

      <!-- Third-Party Services -->
      <section class="content-section">
        <h2 class="section-title">Third-Party Services</h2>
        <p class="section-text">We work with the following trusted third-party services:</p>
        <div class="third-party-list">
          <div class="third-party-item">
            <strong>Firebase (Google)</strong> - Authentication, database, and hosting
          </div>
          <div class="third-party-item">
            <strong>AI Service Providers</strong> - Image generation processing
          </div>
        </div>
      </section>

      <!-- Contact CTA -->
      <div class="cta-section">
        <h2 class="cta-title">Questions About Privacy?</h2>
        <p class="cta-description">
          If you have any questions or concerns about our privacy practices, we're here to help
        </p>
        <router-link to="/contact" class="btn btn-primary btn-large"> Contact Us 📧 </router-link>
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
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
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
  margin: 0 0 8px;
  font-size: 18px;
  color: #6b7280;
  font-weight: 500;
}

.last-updated {
  margin: 0;
  font-size: 14px;
  color: #9ca3af;
  font-weight: 500;
}

/* Content Sections */
.content-section {
  margin-bottom: 48px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px;
}

.section-text {
  font-size: 16px;
  line-height: 1.7;
  color: #4b5563;
  margin: 0 0 20px;
}

/* Information Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.info-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 28px;
  transition: all 0.3s ease;
}

.info-card:hover {
  border-color: var(--brand);
  box-shadow: 0 8px 24px rgba(166, 149, 255, 0.2);
  transform: translateY(-4px);
}

.info-icon {
  font-size: 40px;
  margin-bottom: 16px;
}

.info-title {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.info-list {
  margin: 0;
  padding: 0 0 0 20px;
  list-style: none;
}

.info-list li {
  position: relative;
  padding: 6px 0;
  color: #6b7280;
  font-size: 15px;
}

.info-list li::before {
  content: '•';
  position: absolute;
  left: -20px;
  color: var(--brand);
  font-weight: bold;
  font-size: 18px;
}

/* Purpose Grid */
.purpose-grid {
  display: grid;
  gap: 20px;
  margin-top: 24px;
}

.purpose-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 24px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.purpose-item:hover {
  border-color: var(--brand);
  box-shadow: 0 4px 12px rgba(166, 149, 255, 0.15);
}

.purpose-emoji {
  font-size: 32px;
  flex-shrink: 0;
}

.purpose-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  text-align:left;
}

.purpose-text {
  margin: 0;
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
}

/* Highlight Section */
.highlight-section {
  background: #f9fafb;
  border-radius: 16px;
  padding: 40px;
}

.security-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.security-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.security-badge:hover {
  border-color: var(--brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(166, 149, 255, 0.15);
}

.security-icon {
  font-size: 24px;
}

.security-text {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

/* Rights List */
.rights-list {
  display: grid;
  gap: 20px;
  margin-top: 24px;
}

.right-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 24px;
  background: linear-gradient(135deg, rgba(166, 149, 255, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%);
  border-radius: 12px;
  border: 1px solid rgba(166, 149, 255, 0.1);
}

.right-number {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--brand);
  color: white;
  border-radius: 50%;
  font-size: 18px;
  font-weight: 700;
}

.right-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  text-align:left;
}

.right-text {
  margin: 0;
  font-size: 15px;
  color: #6b7280;
}

/* Third Party List */
.third-party-list {
  display: grid;
  gap: 12px;
  margin-top: 24px;
}

.third-party-item {
  padding: 16px 20px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  color: #4b5563;
}

.third-party-item strong {
  color: #111827;
  font-weight: 600;
}

/* CTA Section */
.cta-section {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, var(--brand) 0%, #8b5cf6 100%);
  border-radius: 20px;
  color: white;
  margin-top: 48px;
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
    font-size: 24px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .security-grid {
    grid-template-columns: 1fr;
  }

  .cta-title {
    font-size: 28px;
  }

  .cta-description {
    font-size: 16px;
  }

  .highlight-section {
    padding: 30px 20px;
  }
}

@media (max-width: 480px) {
  .hero-icon {
    font-size: 48px;
  }

  .purpose-item,
  .right-item {
    flex-direction: column;
    text-align: center;
  }

  .purpose-emoji {
    font-size: 40px;
  }
}
</style>
