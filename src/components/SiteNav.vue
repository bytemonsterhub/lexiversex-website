<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/** 滚动超过首屏一小段后，导航从透明转为毛玻璃。 */
const solid = ref(false)
let ticking = false

function onScroll(): void {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    solid.value = window.scrollY > 32
    ticking = false
  })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const links = [
  { href: '#stations', label: '星港与内容' },
  { href: '#words', label: '词汇' },
  { href: '#explain', label: '解析' },
  { href: '#tech', label: '工程' }
]
</script>

<template>
  <header class="nav" :class="{ solid }">
    <div class="nav__inner">
      <a class="brand" href="#top" aria-label="LexiVerse X 首页">
        <svg class="brand__mark" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="markGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#f3cd8a" />
              <stop offset="1" stop-color="#7fb0ff" />
            </linearGradient>
          </defs>
          <path
            d="M12 1.6l2.35 6.9 6.9 2.35-6.9 2.35L12 20.1l-2.35-6.9-6.9-2.35 6.9-2.35z"
            fill="url(#markGrad)"
          />
        </svg>
        <span class="brand__name">语穹<span class="brand__x">X</span></span>
      </a>

      <nav class="nav__links" aria-label="主导航">
        <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
      </nav>

      <a class="nav__cta" href="#download">下载</a>
    </div>
  </header>
</template>

<style scoped lang="scss">
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 52px;
  transition:
    background-color 0.4s var(--ease-soft),
    border-color 0.4s var(--ease-soft),
    backdrop-filter 0.4s var(--ease-soft);
  border-bottom: 1px solid transparent;

  &.solid {
    background: rgba(8, 8, 10, 0.72);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-bottom-color: var(--c-line);
  }
}

.nav__inner {
  max-width: var(--wrap);
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--pad);
  display: flex;
  align-items: center;
  gap: 34px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;
}

.brand__mark {
  width: 17px;
  height: 17px;
  filter: drop-shadow(0 0 8px rgba(231, 178, 92, 0.45));
}

.brand__name {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.brand__x {
  margin-left: 3px;
  color: var(--c-text-3);
  font-weight: 500;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: auto;

  a {
    font-size: 13px;
    color: var(--c-text-2);
    letter-spacing: 0;
    transition: color 0.25s var(--ease-soft);

    &:hover {
      color: var(--c-text);
    }
  }
}

.nav__cta {
  flex-shrink: 0;
  padding: 7px 16px;
  border-radius: 980px;
  font-size: 12.5px;
  font-weight: 550;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--c-line-strong);
  transition:
    background-color 0.25s var(--ease-soft),
    border-color 0.25s var(--ease-soft);

  &:hover {
    background: rgba(255, 255, 255, 0.17);
    border-color: rgba(255, 255, 255, 0.3);
  }
}

@media (max-width: 720px) {
  .nav__links {
    display: none;
  }
  .nav__cta {
    margin-left: auto;
  }
}
</style>
