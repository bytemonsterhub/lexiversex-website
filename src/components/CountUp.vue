<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 数字滚动。只有真正进入视口才开始数 —— 否则用户滚到这一屏时数字早停了。
 */
const props = withDefaults(
  defineProps<{
    value: number
    suffix?: string
    duration?: number
  }>(),
  { suffix: '', duration: 1600 }
)

const el = ref<HTMLElement | null>(null)
const shown = ref(0)
let io: IntersectionObserver | null = null
let raf = 0

function run(): void {
  const start = performance.now()
  const from = 0
  const to = props.value

  const tick = (now: number): void => {
    const p = Math.min(1, (now - start) / props.duration)
    // easeOutExpo：前快后慢，收尾稳，读数字时不晃眼
    const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
    shown.value = Math.round(from + (to - from) * eased)
    if (p < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !el.value) {
    shown.value = props.value
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return
      io?.disconnect()
      run()
    },
    { threshold: 0.4 }
  )
  io.observe(el.value)
})

onBeforeUnmount(() => {
  io?.disconnect()
  cancelAnimationFrame(raf)
})
</script>

<template>
  <span ref="el" class="countup">
    {{ shown.toLocaleString('en-US') }}<i v-if="suffix">{{ suffix }}</i>
  </span>
</template>

<style scoped>
.countup {
  font-variant-numeric: tabular-nums;
  /* 数字等宽，滚动时不会左右跳 */
  font-feature-settings: 'tnum' 1;
}

.countup i {
  font-style: normal;
  font-size: 0.5em;
  margin-left: 2px;
  color: var(--c-text-2);
  letter-spacing: 0;
}
</style>
