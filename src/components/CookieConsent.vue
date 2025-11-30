<template>
  <teleport to="body">
    <div
      v-if="shouldShowBanner"
      class="lxa-cc lxa-cc-guard"
      role="dialog"
      aria-labelledby="cc-title"
      aria-describedby="cc-desc"
    >
      <div class="lxa-cc__inner box box-full">
        <div class="lxa-cc__text">
          <h3 id="cc-title">Privacy and cookies</h3>
          <p id="cc-desc">
            We use cookies necessary for the site to function and, with your consent, additional
            ones that help us improve performance and content. Details in the
            <router-link class="lxa-cc__link" to="/privacy-policy"> Privacy Policy</router-link>.
          </p>
        </div>
        <div class="lxa-cc__actions">
          <button class="lxa-cc__btn primary" @click="accept" aria-label="Zaakceptuj">
            <span aria-hidden="true">👍</span> OK
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConsentBoot } from '@/stores/consent'
const consent = useConsentBoot()
const { shouldShowBanner } = storeToRefs(consent)
const accept = () => consent.acceptNecessary()
</script>

<style scoped>
.lxa-cc,
.lxa-cc * {
  animation: none !important;
  transition: none !important;
  opacity: 1 !important;
  visibility: visible !important;
  filter: none !important;
}

.lxa-cc {
  position: fixed;
  inset: auto 0 0 0;
  z-index: 2147483647;
  display: grid;
  place-items: center;
  padding: 16px;
  pointer-events: none;
  isolation: isolate;
}

:root {
  --brand: rgb(166, 149, 255);
  --text: #111;
  --text-muted: #444;
  --surface: #fff;
  --shadow-sm: 0 6px 26px rgba(0, 0, 0, 0.08);
  --ring: rgba(166, 149, 255, 0.35);
}
@media (prefers-color-scheme: dark) {
  :root {
    --text: #eee;
    --text-muted: #bbb;
    --surface: #16171a;
    --shadow-sm: 0 10px 34px rgba(0, 0, 0, 0.45);
  }
}

.lxa-cc__inner {
  pointer-events: auto;
  width: min(1154px, 100%) !important;
  background: var(--surface);
  color: var(--text);
  border: 1px solid color-mix(in oklab, var(--brand) 12%, transparent);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  padding: clamp(14px, 2.2vw, 20px);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: clamp(12px, 2vw, 20px);
  align-items: center;
  text-align: left;
}
.lxa-cc__text {
  color: black;
}

.lxa-cc__text h3 {
  margin: 0 0 6px;
  font-size: clamp(16px, 1.6vw, 18px);
  letter-spacing: 0.2px;
}
.lxa-cc__text p {
  margin: 0;
  font-size: clamp(14px, 1.5vw, 16px);
  line-height: 1.5;
}
.lxa-cc__link {
  color: var(--brand);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.lxa-cc__actions {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-self: end;
}

.lxa-cc__btn {
  appearance: none;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
}
.lxa-cc__btn.primary {
  background: color-mix(in oklab, var(--brand) 72%, white 28%);
  border-color: color-mix(in oklab, var(--brand) 50%, transparent);
  color: #111;
}
@media (prefers-color-scheme: dark) {
  .lxa-cc__btn.primary {
    background: color-mix(in oklab, var(--brand) 60%, #222 40%);
    color: #fff;
  }
}

@media (max-width: 720px) {
  .lxa-cc__inner {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .lxa-cc__actions {
    justify-self: start;
  }
}
</style>
