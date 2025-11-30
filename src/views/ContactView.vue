<template>
  <div class="box-wrapper">
    <div class="box box-broad">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-icon">💬</div>
        <h1 class="hero-title">Get in Touch</h1>
        <p class="hero-subtitle">Have questions? We'd love to hear from you</p>
      </div>

      <!-- Contact Options -->
      <div class="contact-options-section">
        <h2 class="section-title">How Can We Help?</h2>
        <div class="contact-grid">
          <div class="contact-card">
            <div class="contact-icon">💡</div>
            <h3 class="contact-title">General Inquiry</h3>
            <p class="contact-description">
              Questions about our services or features? We're here to help!
            </p>
          </div>

          <div class="contact-card">
            <div class="contact-icon">🐛</div>
            <h3 class="contact-title">Report a Bug</h3>
            <p class="contact-description">Found an issue? Let us know so we can fix it quickly.</p>
          </div>

          <div class="contact-card">
            <div class="contact-icon">✨</div>
            <h3 class="contact-title">Feature Request</h3>
            <p class="contact-description">Have an idea? Share your suggestions with us!</p>
          </div>

          <div class="contact-card">
            <div class="contact-icon">🤝</div>
            <h3 class="contact-title">Partnership</h3>
            <p class="contact-description">
              Interested in collaboration? Let's explore opportunities together.
            </p>
          </div>
        </div>
      </div>

      <!-- Contact Form Section -->
      <div class="form-section">
        <h2 class="section-title">Send Us a Message</h2>
        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-grid">
            <div class="input-group">
              <label for="name">First name</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                name="name"
                autocomplete="name"
                required
              />
            </div>

            <div class="input-group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                name="email"
                autocomplete="email"
                required
              />
            </div>
          </div>

          <div class="input-group">
            <label for="subject">Subject</label>
            <input id="subject" v-model="formData.subject" type="text" name="subject" required />
          </div>

          <div class="input-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              v-model="formData.message"
              name="message"
              rows="6"
              required
            ></textarea>
          </div>

          <div class="checkbox-group">
            <label class="checkbox">
              <input v-model="formData.consent" type="checkbox" required />
              <span>
                I consent to the processing of my data in accordance with the
                <router-link class="form-link" to="/privacy-policy">Privacy Policy</router-link>.
              </span>
            </label>
          </div>

          <button class="btn btn-primary btn-large" type="submit">Send Message 📨</button>
        </form>
      </div>

      <!-- Contact Info Section -->
      <div class="info-section">
        <h2 class="section-title">Other Ways to Reach Us</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-icon">📧</div>
            <div class="info-label">Email</div>
            <div class="info-value">support@losai.online</div>
          </div>
          <div class="info-item">
            <div class="info-icon">⏰</div>
            <div class="info-label">Response Time</div>
            <div class="info-value">24-48 hours</div>
          </div>
          <div class="info-item">
            <div class="info-icon">🌍</div>
            <div class="info-label">Available</div>
            <div class="info-value">24/7 Support</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  consent: false,
})

const handleSubmit = () => {
  // TODO: Implement form submission
  console.log('Form submitted:', formData)
}
</script>

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

/* Contact Options Section */
.contact-options-section {
  margin-bottom: 48px;
}

.section-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 32px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.contact-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 28px;
  text-align: center;
  transition: all 0.3s ease;
}

.contact-card:hover {
  border-color: var(--brand);
  box-shadow: 0 8px 24px rgba(166, 149, 255, 0.2);
  transform: translateY(-4px);
}

.contact-icon {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}

.contact-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.contact-description {
  margin: 0;
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
}

/* Form Section */
.form-section {
  background: #f9fafb;
  border-radius: 20px;
  padding: 48px 40px;
  margin-bottom: 48px;
}

.contact-form {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 720px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.input-group {
  display: grid;
  gap: 10px;
}

.input-group label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.input-group input,
.input-group textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #111827;
  font: inherit;
  font-size: 15px;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.input-group input:focus,
.input-group textarea:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 4px rgba(166, 149, 255, 0.18);
}

.input-group textarea {
  resize: vertical;
  min-height: 120px;
}

.checkbox-group {
  margin-top: 8px;
}

.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
}

.checkbox input {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: var(--brand);
  cursor: pointer;
}

.form-link {
  color: var(--brand);
  text-decoration: none;
  border-bottom: 1px solid rgba(166, 149, 255, 0.3);
  transition: border-color 0.2s ease;
}

.form-link:hover {
  border-bottom-color: var(--brand);
}

.btn-large {
  width: 100%;
  padding: 16px 40px;
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--brand) 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(166, 149, 255, 0.3);
}

.btn-large:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(166, 149, 255, 0.4);
}

.btn-large:active {
  transform: translateY(0);
}

/* Info Section */
.info-section {
  margin-bottom: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.info-item {
  text-align: center;
  padding: 32px 24px;
  background: linear-gradient(135deg, rgba(166, 149, 255, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%);
  border-radius: 16px;
  border: 1px solid rgba(166, 149, 255, 0.1);
}

.info-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.info-label {
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.info-value {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
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

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .form-section {
    padding: 32px 24px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-icon {
    font-size: 48px;
  }

  .form-section {
    padding: 24px 16px;
  }

  .contact-icon {
    font-size: 40px;
  }
}
</style>
