<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 星空背景。
 *
 * 用预渲染的辉光贴图 + drawImage 而不是逐个画径向渐变：
 * 400 颗星每帧建渐变会让主线程稳稳超时，贴图则是纯 GPU 拷贝。
 */
const canvas = ref<HTMLCanvasElement | null>(null)

interface Star {
  x: number
  y: number
  size: number
  alpha: number
  phase: number
  speed: number
  drift: number
}

let raf = 0
let stars: Star[] = []
let sprite: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null
let w = 0
let h = 0
let dpr = 1

/** 鼠标视差：目标值与当前值分开，逐帧插值才不会有硬跳 */
const pointer = { tx: 0, ty: 0, x: 0, y: 0 }

function makeSprite(): HTMLCanvasElement {
  const c = document.createElement('canvas')
  const s = 32
  c.width = s
  c.height = s
  const cx = c.getContext('2d')!
  const g = cx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.28, 'rgba(226,236,255,0.86)')
  g.addColorStop(0.62, 'rgba(160,196,255,0.22)')
  g.addColorStop(1, 'rgba(120,160,255,0)')
  cx.fillStyle = g
  cx.fillRect(0, 0, s, s)
  return c
}

function seed(): void {
  // 密度跟着面积走，宽屏不会显空、窄屏不会糊成一片
  const count = Math.min(420, Math.round((w * h) / 5200))
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: 0.7 + Math.random() * 2.1,
    alpha: 0.18 + Math.random() * 0.62,
    phase: Math.random() * Math.PI * 2,
    speed: 0.15 + Math.random() * 0.55,
    drift: 0.01 + Math.random() * 0.05
  }))
}

function resize(): void {
  const el = canvas.value
  if (!el) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = window.innerWidth
  h = window.innerHeight
  el.width = Math.round(w * dpr)
  el.height = Math.round(h * dpr)
  el.style.width = w + 'px'
  el.style.height = h + 'px'
  ctx = el.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  seed()
}

function frame(t: number): void {
  if (!ctx || !sprite) return

  pointer.x += (pointer.tx - pointer.x) * 0.045
  pointer.y += (pointer.ty - pointer.y) * 0.045

  ctx.clearRect(0, 0, w, h)

  for (const s of stars) {
    s.y += s.drift
    if (s.y > h + 4) {
      s.y = -4
      s.x = Math.random() * w
    }

    // 慢速明暗呼吸，周期各不相通，看起来才像星空而不是跑马灯
    const tw = 0.66 + 0.34 * Math.sin(t * 0.00042 * s.speed + s.phase)
    const size = s.size * (1 + (tw - 0.66) * 0.35)
    const px = s.x + pointer.x
    const py = s.y + pointer.y

    ctx.globalAlpha = s.alpha * tw
    ctx.drawImage(sprite, px - size * 2, py - size * 2, size * 4, size * 4)
  }

  ctx.globalAlpha = 1
  raf = requestAnimationFrame(frame)
}

function onMove(e: PointerEvent): void {
  pointer.tx = (e.clientX / window.innerWidth - 0.5) * -22
  pointer.ty = (e.clientY / window.innerHeight - 0.5) * -14
}

let onResize = (): void => {}

onMounted(() => {
  sprite = makeSprite()
  resize()

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    // 静态渲染一帧就停，尊重系统的「减弱动态效果」
    frame(0)
    cancelAnimationFrame(raf)
  } else {
    raf = requestAnimationFrame(frame)
    window.addEventListener('pointermove', onMove, { passive: true })
  }

  onResize = () => resize()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <canvas ref="canvas" class="starfield" aria-hidden="true" />
</template>

<style scoped>
.starfield {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
