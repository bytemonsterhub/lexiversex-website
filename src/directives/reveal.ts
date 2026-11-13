import type { Directive } from 'vue'

/**
 * 滚动渐显指令。
 *
 * 全局共用一个 IntersectionObserver：一屏里可能有几十个待入场元素，
 * 每个元素各建一个观察器会拖慢首帧。
 */
let io: IntersectionObserver | null = null

function observer(): IntersectionObserver {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('in')
          // 只播一次，进场后就别再观察了
          io?.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    )
  }
  return io
}

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    el.classList.add('reveal')
    // 首屏以上的元素直接入场，避免用户看到空白后才闪出来
    const top = el.getBoundingClientRect().top
    if (top < window.innerHeight * 0.92) {
      el.classList.add('in')
      return
    }
    observer().observe(el)
  },
  unmounted(el) {
    io?.unobserve(el)
  }
}
