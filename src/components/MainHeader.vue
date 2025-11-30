<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/">
          <img class="logo__img" src="../assets/logo.png" alt="logo" />
        </router-link>
      </div>

      <nav :class="{ open: mobileMenuOpen }" class="nav-links">
        <router-link to="/" @click="closeMenu">🏠 Home</router-link>
        <router-link to="/about" @click="closeMenu">ℹ️ About</router-link>
        <router-link to="/profile" @click="closeMenu">👤 Profile</router-link>

        <router-link v-if="!user" to="/register" class="btn mat-blur" @click="closeMenu">
          📝 Create account
        </router-link>

        <a v-if="user" href="#" class="btn mat-blur" @click.prevent="handleLogout"> 🚪 Logout </a>
      </nav>

      <button
        class="menu-toggle"
        @click="mobileMenuOpen = !mobileMenuOpen"
        aria-label="Toggle menu"
      >
        <span :class="{ bar1: true, change: mobileMenuOpen }"></span>
        <span :class="{ bar2: true, change: mobileMenuOpen }"></span>
        <span :class="{ bar3: true, change: mobileMenuOpen }"></span>
      </button>
    </div>
  </header>

  <header v-if="route.meta.showHero" class="hero" role="banner" aria-label="Promo">
    <div class="hero__inner">
      <p class="kicker">Early access</p>

      <h1 class="hero__title">Try it for <mark>free</mark></h1>

      <p class="hero__subtitle">Get started in a minute. No credit card, no nonsense.</p>

      <div class="hero__cta">
        <router-link to="/register" class="btn-header btn--primary mat-blur">
          <span aria-hidden="true">🚀</span>Sign up
        </router-link>
        <router-link to="/about" class="link">Learn more</router-link>
      </div>

      <ul class="hero__meta" aria-label="Highlights">
        <li>No lock-in</li>
        <li>Cancel anytime</li>
        <li>Privacy-first</li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const mobileMenuOpen = ref(false)
const closeMenu = () => {
  mobileMenuOpen.value = false
}

const auth = useAuthStore()
const { user } = storeToRefs(auth)

const handleLogout = async () => {
  closeMenu()
  await auth.logout()
  await router.push('/')
}
</script>

<style>
:root {
  --brand: rgb(166, 149, 255);
  --brand-ink: color-mix(in oklab, var(--brand) 80%, black);
  --brand-ink-weak: color-mix(in oklab, var(--brand) 70%, black);
  --brand-surface: color-mix(in oklab, var(--brand) 18%, white);
  --brand-border: color-mix(in oklab, var(--brand) 40%, white);
  --brand-focus: color-mix(in oklab, var(--brand) 55%, transparent);

  --ink: #1f2330;
  --muted: #596073;

  --surface: #ffffff;

  --shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 6px 14px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 12px 22px rgba(0, 0, 0, 0.12);

  --radius-pill: 999px;
  --radius-md: 12px;
  --space-5: 20px;
  --maxw: 1200px;

  --btn-bg: color-mix(in oklab, var(--brand) 88%, black);
  --btn-border: color-mix(in oklab, var(--brand) 65%, white);

  --menu-bar: #333;
}

.header {
  width: 100%;
  background: #ffffff;
  box-shadow: var(--shadow-sm);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 104px;
  /* iOS Safari fixes */
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

@supports not (-webkit-touch-callout: none) {
  .header {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.95);
  }
}
.container {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: var(--space-5);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo__img {
  max-height: 40px;
  display: block;
}

.nav-links {
  display: flex;
  gap: 18px;
  align-items: center;
  transition: max-height 0.3s ease;
}

.nav-links a {
  text-decoration: none;
  position: relative;
  padding: 6px 0;
  transition: all 0.3s ease;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #333;
  border-radius: var(--radius-pill);
  padding-inline: 10px;
}

.nav-links a:hover {
  color: var(--brand);
  background: rgba(166, 149, 255, 0.08);
}

.nav-links a.router-link-active {
  color: var(--brand-ink);
  background: var(--brand-surface);
  font-weight: 600;
}

.nav-links .btn {
  padding: 6px 14px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  display: inline-block;
  border-radius: var(--radius-pill);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--brand-ink);
  background: var(--brand-surface);
  border: 1px solid var(--brand-border);
}

.nav-links .btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background: var(--menu-bar);
  border-radius: 2px;
  transition: 0.3s;
}

.bar1.change {
  transform: rotate(-45deg) translate(-5px, 6px);
}
.bar2.change {
  opacity: 0;
}
.bar3.change {
  transform: rotate(45deg) translate(-5px, -6px);
}

@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--surface);
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    max-height: 0;
    gap: 12px;
    padding: 0;
  }

  .nav-links.open {
    max-height: 300px;
    padding: 12px 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .menu-toggle {
    display: flex;
  }
}

.hero {
  position: relative;
  isolation: isolate;
  width: 100%;
  min-height: clamp(280px, 46vh, 640px);
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #fff;
  color: #0b0b12;
  --brand: rgb(166 149 255);
  --brand-2: color-mix(in oklab, var(--brand) 70%, #6ff);
  --brand-3: color-mix(in oklab, var(--brand) 60%, #f6f);
  text-align: center;
}

.hero::before,
.hero::after {
  content: '';
  position: absolute;
  z-index: -2;
  transform: translateZ(0);
}

.hero::before {
  inset: -30%;
  z-index: -3;
  background: conic-gradient(
    from 210deg at 50% 50%,
    transparent 0 8%,
    var(--brand-2) 12% 22%,
    transparent 26% 38%,
    var(--brand-3) 42% 56%,
    transparent 60% 72%,
    var(--brand-2) 76% 86%,
    transparent 90% 100%
  );
  filter: blur(32px) saturate(130%);
  animation: spin 32s linear infinite;
  animation-delay: -7s;
}

.hero::after {
  inset: -80%;
  background: linear-gradient(135deg, transparent 0 35%, var(--brand) 48%, transparent 65%);
  background-size: 60% 60%;
  mix-blend-mode: screen;
  filter: blur(20px) saturate(120%);
  animation: ribbons 18s linear infinite;
  animation-delay: -3s;
}

.hero h1,
.hero p,
.hero .cta {
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
}

.hero__inner {
  position: relative;
  z-index: 1;
  width: min(1100px, 92vw);
  margin-inline: auto;
  text-align: center;
  padding: clamp(18px, 4.8vw, 60px);
  box-sizing: border-box;
}

.kicker {
  display: inline-block;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--brand-ink);
  background: var(--brand-surface);
  border: 1px solid var(--brand-border);
  margin: 0 0 10px 0;
}

.hero__title {
  margin: 0 0 10px 0;
  color: var(--ink);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.06;
  font-size: clamp(28px, 6.6vw, 54px);
  text-wrap: balance;
  overflow-wrap: anywhere;
  font-variation-settings:
    'opsz' 32,
    'wght' 900;
}

.hero__title mark {
  background: color-mix(in oklab, var(--brand) 22%, white);
  color: var(--ink);
  padding: 0 0.18em;
  border-radius: 8px;
  box-decoration-break: clone;
}

.hero__subtitle {
  margin: 0 0 18px 0;
  font-size: clamp(14px, 2.1vw, 18px);
  color: var(--muted);
  text-wrap: balance;
}

.hero__cta {
  display: inline-flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.link {
  font-weight: 600;
  color: var(--brand-ink-weak);
  text-decoration: none;
  position: relative;
}
.link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: currentColor;
  opacity: 0.3;
  transform: scaleX(0.6);
  transform-origin: left;
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;
}
.link:hover::after {
  transform: scaleX(1);
  opacity: 0.5;
}

.hero__meta {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  color: #7a8194;
  font-size: 12px;
  flex-wrap: wrap;
}
.hero__meta li {
  position: relative;
  padding-left: 16px;
}
.hero__meta li::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 50%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--brand-ink-weak);
  transform: translateY(-50%);
}

.btn-header {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition:
    transform 120ms ease,
    box-shadow 120ms ease,
    background-color 120ms ease,
    border-color 120ms ease;
  color: var(--brand-ink) !important;
  background: var(--brand-surface) !important;
  font-weight: 600;
}
.btn--primary {
  background: var(--btn-bg);
  border: 1px solid var(--btn-border);
  box-shadow: var(--shadow-md);
}
.btn--primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}
.btn--primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-md);
}
.btn--primary:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--brand-focus);
}

@keyframes spin {
  0% {
    transform: rotate(0turn);
  }
  100% {
    transform: rotate(1turn);
  }
}

@keyframes ribbons {
  0% {
    transform: translate3d(0, 0, 0) rotate(0);
  }
  100% {
    transform: translate3d(18%, -18%, 0) rotate(0.08turn);
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: clamp(220px, 34vh, 360px);
  }
  .kicker {
    font-size: 11px;
    padding: 3px 8px;
  }
  .hero__meta {
    gap: 10px;
    font-size: 11px;
  }
  .hero::before {
    filter: blur(24px);
    animation-duration: 40s;
  }
  .hero::after {
    filter: blur(12px);
    animation-duration: 24s;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero::before,
  .hero::after {
    animation: none;
  }
  .btn-header,
  .link::after {
    transition: none;
  }
}
</style>
