<template>
  <div class="aurora-tabs-wrap" :style="wrapStyle">
    <div
      class="aurora-tabs mat-blur"
      role="tablist"
      :aria-label="ariaLabel"
      ref="listEl"
      @keydown="handleKeydown"
    >
      <div class="aurora-bg" aria-hidden="true"></div>
      <div class="active-pill" :style="pillStyle" :class="{ ready: mounted }" aria-hidden="true">
        <div class="pill-border"></div>
        <div class="pill-glow"></div>
        <div class="pill-shimmer"></div>
      </div>
      <button
        v-for="(tab, index) in items"
        :key="tab.id ?? index"
        class="tab-btn"
        role="tab"
        :id="getTabId(index)"
        :aria-controls="getPanelId(index)"
        :aria-selected="index === currentIndex"
        :tabindex="index === currentIndex ? 0 : -1"
        ref="tabRefs"
        @click="selectTab(index)"
        @mousemove="handleMouseMove(index, $event)"
        @mouseleave="handleMouseLeave(index)"
      >
        <span class="tab-inner">
          <span v-if="tab.icon" class="tab-ico" aria-hidden="true" v-html="tab.icon" />
          <span class="tab-label">{{ tab.label }}</span>
        </span>
      </button>
    </div>
    <div class="aurora-panels">
      <Transition name="fade-panel" mode="out-in">
        <section
          v-if="currentTab"
          :key="getPanelId(currentIndex)"
          class="tab-panel"
          role="tabpanel"
          :id="getPanelId(currentIndex)"
          :aria-labelledby="getTabId(currentIndex)"
        >
          <slot :name="currentTab.slot ?? currentTab.id ?? currentIndex" :item="currentTab" />
        </section>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import {
  useTabNavigation,
  usePillAnimation,
  useTiltEffect,
  type TabItem,
} from '@/composables/profileTabs'

const props = withDefaults(
  defineProps<{
    items: TabItem[]
    modelValue?: number
    ariaLabel?: string
    maxWidth?: string
  }>(),
  {
    modelValue: 0,
    ariaLabel: 'Profile sections',
    maxWidth: '1100px',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): boolean
  (e: 'change', value: number): boolean
}>()

const uid = Math.random().toString(36).slice(2, 8)
const listEl = ref<HTMLElement | null>(null)
const tabRefs = ref<HTMLButtonElement[]>([])
const currentIndex = ref(props.modelValue)
const mounted = ref(false)

// Initialize composables
const { pillStyle, updatePill } = usePillAnimation({
  currentIndex,
  tabRefs,
  listEl,
})

const { getTabId, getPanelId, selectTab, handleKeydown } = useTabNavigation({
  uid,
  currentIndex,
  itemsCount: props.items.length,
  tabRefs,
  emit,
  updatePill,
})

const { handleMouseMove, handleMouseLeave } = useTiltEffect({ tabRefs })

// Computed properties
const wrapStyle = computed(() => ({ '--tabs-max-w': props.maxWidth }) as any)
const currentTab = computed(() => props.items[currentIndex.value])

// Watchers
watch(
  () => props.modelValue,
  (newValue) => selectTab(newValue),
  { immediate: true },
)

// Utility functions
const collectTabRefs = () => {
  tabRefs.value = Array.from(
    listEl.value?.querySelectorAll('.tab-btn') ?? [],
  ) as HTMLButtonElement[]
}

const handleResize = () => updatePill()

// Lifecycle hooks
onMounted(async () => {
  await nextTick()
  mounted.value = true
  collectTabRefs()
  updatePill()
  window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
:root {
  --bg: rgba(255, 255, 255, 0.04);
  --txt-contrast: #10131f;
  --brand: #a695ff;
  --brand-2: #ff7ad6;
  --brand-3: #7ad8ff;
  --pill: rgba(255, 255, 255, 0.55);
  --blur: 18px;
  --tabs-max-w: 1200px;

  /* Dynamically set by JavaScript - default values for IDE */
  --tiltX: 0deg;
  --tiltY: 0deg;
  --glowX: 50%;
  --glowY: 50%;
}
.aurora-tabs-wrap {
  max-width: var(--tabs-max-w);
  margin-inline: auto;
}
.aurora-tabs {
  position: relative;
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
  padding: 10px;
  border-radius: 16px;
  isolation: isolate;
  overflow: hidden;
  background: var(--bg);
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 10px 30px rgba(166, 149, 255, 0.15);
}
.aurora-bg {
  position: absolute;
  inset: -30%;
  background:
    radial-gradient(40% 40% at 20% 30%, rgba(122, 216, 255, 0.45), transparent 55%),
    radial-gradient(45% 45% at 80% 40%, rgba(255, 122, 214, 0.4), transparent 55%),
    radial-gradient(35% 35% at 50% 80%, rgba(166, 149, 255, 0.35), transparent 55%);
  filter: blur(48px) saturate(110%);
  animation: drift 20s ease-in-out infinite alternate;
  z-index: 0;
  transform: translateZ(0);
}
@keyframes drift {
  0% {
    transform: translate3d(-2%, 0, 0) scale(1);
  }
  100% {
    transform: translate3d(2%, -1.5%, 0) scale(1.04);
  }
}
.active-pill {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 12px;
  background: var(--pill);
  transform: translate3d(0, 0, 0);
  transition:
    transform 280ms cubic-bezier(0.22, 0.9, 0.36, 1),
    width 280ms cubic-bezier(0.22, 0.9, 0.36, 1),
    height 280ms cubic-bezier(0.22, 0.9, 0.36, 1);
  z-index: 1;
  overflow: hidden;
  opacity: 0;
}
.active-pill.ready {
  opacity: 1;
}
.active-pill .pill-border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.6) inset,
    0 0 40px rgba(166, 149, 255, 0.3) inset;
}
.active-pill .pill-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(100% 100% at 50% 0%, rgba(166, 149, 255, 0.3), transparent 55%);
  mix-blend-mode: overlay;
}
.active-pill .pill-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 20%,
    rgba(255, 255, 255, 0.5) 45%,
    transparent 70%
  );
  transform: translateX(-120%) translateZ(0);
  animation: shimmer 3s ease-in-out infinite;
}
@keyframes shimmer {
  0% {
    transform: translateX(-120%) translateZ(0);
  }
  55% {
    transform: translateX(60%) translateZ(0);
  }
  100% {
    transform: translateX(120%) translateZ(0);
  }
}
.tab-btn {
  position: relative;
  z-index: 2;
  border: 0;
  background: transparent;
  color: var(--txt-contrast);
  padding: 14px 18px;
  border-radius: 12px;
  font-weight: 700;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: filter 0.18s ease;
  outline: none;
  transform: translateZ(0);
}
.tab-btn:hover {
  transform: perspective(400px) rotateX(var(--tiltX, 0deg)) rotateY(var(--tiltY, 0deg))
    translateZ(0);
  transition: transform 0.15s ease;
}
.tab-btn[aria-selected='true'] .tab-label {
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
}
.tab-btn:focus-visible {
  box-shadow: 0 0 0 2px rgba(166, 149, 255, 0.9);
}
.tab-inner {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  position: relative;
}
.tab-ico {
  display: inline-flex;
  width: 18px;
  height: 18px;
  opacity: 0.9;
}
.tab-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  pointer-events: none;
  background: radial-gradient(
    100px 100px at var(--glowX, 50%) var(--glowY, 50%),
    rgba(166, 149, 255, 0.22),
    transparent 55%
  );
  opacity: 0;
  transition: opacity 0.2s ease;
}
.tab-btn:hover::after {
  opacity: 1;
}
.aurora-panels {
  margin-top: 14px;
}
.tab-panel {
  background: rgba(255, 255, 255, 0.45);
  border-radius: 16px;
  padding: 16px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    0 12px 34px rgba(16, 19, 31, 0.08);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}
.fade-panel-enter-active {
  animation: fade-in 240ms cubic-bezier(0.22, 0.9, 0.36, 1) both;
}
.fade-panel-leave-active {
  animation: fade-in 200ms cubic-bezier(0.22, 0.9, 0.36, 1) reverse both;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 720px) {
  .aurora-tabs {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    gap: 8px;
    padding: 8px;
  }
  .active-pill {
    border-radius: 10px;
  }
  .tab-btn {
    padding: 12px 14px;
    font-weight: 800;
  }
  .aurora-bg {
    filter: blur(32px);
    animation-duration: 28s;
  }
}
@media (prefers-reduced-motion: reduce) {
  .active-pill,
  .aurora-bg,
  .active-pill .pill-shimmer {
    animation: none !important;
    transition: none !important;
  }
  .tab-btn:hover {
    transform: none;
  }
}
</style>
