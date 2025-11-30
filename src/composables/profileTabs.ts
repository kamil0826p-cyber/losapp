import { computed, nextTick, ref, type Ref } from 'vue'

export type TabItem = {
  id?: string | number
  label: string
  slot?: string
  icon?: string
}

// Constants
export const TILT_INTENSITY = 6
export const NAVIGATION_KEYS = {
  NEXT: ['ArrowRight', 'ArrowDown'],
  PREV: ['ArrowLeft', 'ArrowUp'],
  FIRST: 'Home',
  LAST: 'End',
} as const

interface UseTabNavigationParams {
  uid: string
  currentIndex: Ref<number>
  itemsCount: number
  tabRefs: Ref<HTMLButtonElement[]>
  emit: ((event: 'update:modelValue', value: number) => void) &
    ((event: 'change', value: number) => void)
  updatePill: () => void
}

export function useTabNavigation({
  uid,
  currentIndex,
  itemsCount,
  tabRefs,
  emit,
  updatePill,
}: UseTabNavigationParams) {
  const getTabId = (index: number) => `tab-${uid}-${index}`
  const getPanelId = (index: number) => `panel-${uid}-${index}`

  const isValidIndex = (index: number) => index >= 0 && index < itemsCount

  const selectTab = (index: number) => {
    if (!isValidIndex(index)) return
    currentIndex.value = index
    emit('update:modelValue', index)
    emit('change', index)
    nextTick(updatePill)
  }

  const navigateToNext = () => {
    selectTab((currentIndex.value + 1) % itemsCount)
    tabRefs.value[currentIndex.value]?.focus()
  }

  const navigateToPrev = () => {
    selectTab((currentIndex.value - 1 + itemsCount) % itemsCount)
    tabRefs.value[currentIndex.value]?.focus()
  }

  const navigateToFirst = () => {
    selectTab(0)
    tabRefs.value[0]?.focus()
  }

  const navigateToLast = () => {
    const lastIndex = itemsCount - 1
    selectTab(lastIndex)
    tabRefs.value[lastIndex]?.focus()
  }

  const handleKeydown = (event: KeyboardEvent) => {
    const { key } = event

    if (NAVIGATION_KEYS.NEXT.includes(key as any)) {
      event.preventDefault()
      navigateToNext()
    } else if (NAVIGATION_KEYS.PREV.includes(key as any)) {
      event.preventDefault()
      navigateToPrev()
    } else if (key === NAVIGATION_KEYS.FIRST) {
      event.preventDefault()
      navigateToFirst()
    } else if (key === NAVIGATION_KEYS.LAST) {
      event.preventDefault()
      navigateToLast()
    }
  }

  return {
    getTabId,
    getPanelId,
    selectTab,
    handleKeydown,
  }
}

interface UsePillAnimationParams {
  currentIndex: Ref<number>
  tabRefs: Ref<HTMLButtonElement[]>
  listEl: Ref<HTMLElement | null>
}

export function usePillAnimation({ currentIndex, tabRefs, listEl }: UsePillAnimationParams) {
  const pillRect = ref({ x: 0, y: 0, w: 0, h: 0 })

  const pillStyle = computed(() => ({
    transform: `translate3d(${pillRect.value.x}px, ${pillRect.value.y}px, 0)`,
    width: `${pillRect.value.w}px`,
    height: `${pillRect.value.h}px`,
  }))

  const updatePill = () => {
    const activeTab = tabRefs.value[currentIndex.value]
    if (!activeTab || !listEl.value) return

    const listBounds = listEl.value.getBoundingClientRect()
    const tabBounds = activeTab.getBoundingClientRect()

    pillRect.value = {
      x: tabBounds.left - listBounds.left,
      y: tabBounds.top - listBounds.top,
      w: tabBounds.width,
      h: tabBounds.height,
    }
  }

  return {
    pillStyle,
    updatePill,
  }
}

interface UseTiltEffectParams {
  tabRefs: Ref<HTMLButtonElement[]>
}

export function useTiltEffect({ tabRefs }: UseTiltEffectParams) {
  const calculateTiltValues = (event: MouseEvent, element: HTMLElement) => {
    const bounds = element.getBoundingClientRect()
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5

    return {
      tiltX: `${normalizedY * -TILT_INTENSITY}deg`,
      tiltY: `${normalizedX * TILT_INTENSITY}deg`,
      glowX: `${(normalizedX + 0.5) * 100}%`,
      glowY: `${(normalizedY + 0.5) * 100}%`,
    }
  }

  const applyTilt = (element: HTMLElement, values: ReturnType<typeof calculateTiltValues>) => {
    element.style.setProperty('--tiltX', values.tiltX)
    element.style.setProperty('--tiltY', values.tiltY)
    element.style.setProperty('--glowX', values.glowX)
    element.style.setProperty('--glowY', values.glowY)
  }

  const resetTilt = (element: HTMLElement) => {
    element.style.setProperty('--tiltX', '0deg')
    element.style.setProperty('--tiltY', '0deg')
  }

  const handleMouseMove = (index: number, event: MouseEvent) => {
    const element = tabRefs.value[index]
    if (!element) return

    const tiltValues = calculateTiltValues(event, element)
    applyTilt(element, tiltValues)
  }

  const handleMouseLeave = (index: number) => {
    const element = tabRefs.value[index]
    if (!element) return
    resetTilt(element)
  }

  return {
    handleMouseMove,
    handleMouseLeave,
  }
}
