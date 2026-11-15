<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { asset } from '../lib/asset'

/**
 * 星港：滚动驱动的三幕。
 *
 * 不用滚动库 —— 只需要「容器走了多少百分比」这一个数，
 * 自己算比引一个插件更可控，也不会因为第三方库的 rAF 和星场抢帧。
 */

const root = ref<HTMLElement | null>(null)
const active = ref(0)
let ticking = false

const stations = [
  { name: '四级星港', en: 'CET-4', meta: '5 包 · 68 题', hue: 32 },
  { name: '六级星港', en: 'CET-6', meta: '3 包 · 30 题', hue: 214 },
  { name: '考研星港', en: 'POSTGRAD', meta: '3 包 · 40 题', hue: 268 },
  { name: '精练苍穹', en: 'ELITE', meta: '3 卷 · 60 题', hue: 44 },
  { name: '模拟星港', en: 'MOCK TEST', meta: '整卷计时', hue: 352 },
  { name: '词网', en: 'LEXICON', meta: '36 个原创词条', hue: 186 },
  { name: '星轨', en: 'ORBIT', meta: '错的题再回来', hue: 210 }
]

const steps = [
  {
    no: '01',
    kicker: 'STARPORT',
    title: '七个站点，一张星图',
    body: '星港、精练、模考、词网、星轨 —— 不是一堆菜单，是几个训练站点。它们共享同一份进度：在哪个站练过、卡在哪，整张图看得见。',
    points: ['跨站点统一进度', '每个站点独立胜率', '打开就是上次离开的地方'],
    kind: 'orbit' as const,
    w: 0,
    h: 0
  },
  {
    no: '02',
    kicker: 'LIBRARY',
    title: '题库归你，导入即练',
    body: '程序不内置第三方试题，随包只有 14 个原创训练包当示例。把文字贴进来，或者直接丢一个文件夹，它就被解析成可以做的卷子 —— 只写本机，不上传。',
    points: ['14 个原创包 · 198 道题', '粘贴文本或批量导入文件夹', '按 CEFR 与能力双维筛选'],
    kind: 'img' as const,
    img: asset('img/library.webp'),
    w: 1320,
    h: 796,
    alt: '训练库：原创训练包按星港与难度筛选'
  },
  {
    no: '03',
    kicker: 'PRACTICE',
    title: '左边原文，右边题卡',
    body: '听力有可逐句定位的音频轨，阅读有分栏原文，填空就地把空格点亮。答题状态实时保存，中途关掉也不丢。',
    points: ['音频支持倍速与逐句跳转', '原文与题卡同屏对照', '交卷前可随时回改'],
    kind: 'img' as const,
    img: asset('img/practice.webp'),
    w: 1320,
    h: 796,
    alt: '做题界面：左侧听力音频轨与原文，右侧题卡'
  }
]

const heightStyle = computed(() => ({ height: `${(steps.length + 0.6) * 100}vh` }))

function onScroll(): void {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    ticking = false
    const el = root.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const total = el.offsetHeight - window.innerHeight
    if (total <= 0) return
    const passed = Math.min(Math.max(-rect.top, 0), total)
    const ratio = passed / total
    // 留最后 12% 给收尾，避免停在三幕之间半截状态
    const idx = Math.floor(ratio / (0.88 / steps.length))
    active.value = Math.min(steps.length - 1, Math.max(0, idx))
  })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section id="stations" class="stations">
    <div class="wrap stations__head">
      <div v-reveal>
        <span class="eyebrow">The Starport</span>
        <h2 class="h2">不是功能列表，<br /><em>是一座可以走的星港。</em></h2>
        <p class="lede">
          大多数背单词软件把内容摊平成一个列表，然后让你自己找位置。语穹把它们做成站点：
          每一颗星都代表一段可进入的训练，进度、胜率、下一步都在上面。
        </p>
      </div>
    </div>

    <div ref="root" class="scrolly" :style="heightStyle">
      <div class="scrolly__sticky">
        <div class="wrap scrolly__grid">
          <div class="scrolly__text">
            <article
              v-for="(s, i) in steps"
              :key="s.no"
              class="step"
              :class="{ on: active === i }"
              :aria-hidden="active !== i"
            >
              <div class="step__no mono">{{ s.no }} <span>/ 0{{ steps.length }}</span></div>
              <div class="step__kicker">{{ s.kicker }}</div>
              <h3 class="step__title">{{ s.title }}</h3>
              <p class="step__body">{{ s.body }}</p>
              <ul class="step__points">
                <li v-for="p in s.points" :key="p">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8.4l3.1 3.1L13 4.6"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {{ p }}
                </li>
              </ul>
            </article>
          </div>

          <div class="scrolly__visual">
            <div
              v-for="(s, i) in steps"
              :key="s.no"
              class="visual"
              :class="{ on: active === i }"
              :aria-hidden="active !== i"
            >
              <!-- 第一幕不配截图：用代码画站点轨道，比截图更能说明「星港」这件事 -->
              <div v-if="s.kind === 'orbit'" class="orbit">
                <span class="orbit__axis" aria-hidden="true" />
                <div
                  v-for="(st, si) in stations"
                  :key="st.en"
                  class="orbit__item"
                  :style="{ '--hue': st.hue, '--i': si }"
                >
                  <span class="orbit__dot" />
                  <div class="orbit__meta">
                    <b>{{ st.name }}</b>
                    <em>{{ st.en }}</em>
                  </div>
                  <span class="orbit__num mono">{{ st.meta }}</span>
                </div>
              </div>

              <div v-else class="shot visual__shot">
                <img :src="s.img" :width="s.w" :height="s.h" :alt="s.alt" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.stations {
  position: relative;
  padding-top: clamp(64px, 8vw, 104px);
}

.stations__head {
  max-width: 820px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: clamp(28px, 4vw, 48px);
}

.scrolly {
  position: relative;
}

.scrolly__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
}

.scrolly__grid {
  display: grid;
  /* 左栏定宽、右栏吃满剩下的：截图是这一节的主角，不能挤成缩略图 */
  grid-template-columns: minmax(300px, 396px) 1fr;
  gap: clamp(32px, 4.5vw, 62px);
  align-items: center;
}

/* 文字三幕叠在同一格里，切换只改透明度 —— 高度由最高的那段决定，不会跳 */
.scrolly__text {
  display: grid;
  grid-template-areas: 'stack';
}

.step {
  grid-area: stack;
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.62s var(--ease-out),
    transform 0.62s var(--ease-out);

  &.on {
    opacity: 1;
    transform: none;
  }
}

.step__no {
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--c-text-3);

  span {
    opacity: 0.55;
  }
}

.step__kicker {
  margin-top: 16px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.19em;
  color: var(--c-blue);
}

.step__title {
  margin-top: 10px;
  font-size: clamp(24px, 2.5vw, 33px);
  font-weight: 700;
  line-height: 1.24;
  letter-spacing: -0.01em;
  text-wrap: balance;
}

.step__body {
  margin-top: 18px;
  font-size: 15px;
  line-height: 1.78;
  color: var(--c-text-2);
  max-width: 30em;
  text-wrap: pretty;
}

.step__points {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 11px;

  li {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 14px;
    color: var(--c-text-2);

    svg {
      color: var(--c-mint);
      flex-shrink: 0;
    }
  }
}

.scrolly__visual {
  display: grid;
  grid-template-areas: 'stack';
  align-items: center;
}

.visual {
  grid-area: stack;
  opacity: 0;
  transform: scale(0.965) translateY(10px);
  transition:
    opacity 0.7s var(--ease-out),
    transform 0.7s var(--ease-out);

  &.on {
    opacity: 1;
    transform: none;
  }
}

.visual__shot {
  /* 三幕里的两张截图比例略有差异，统一容器比例，切幕时高度不跳 */
  aspect-ratio: 1320 / 838;
  border-radius: 13px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
}

/* ---------- 站点轨道 ---------- */

.orbit {
  position: relative;
  padding: clamp(20px, 3vw, 34px) clamp(18px, 2.4vw, 30px);
  border-radius: 20px;
  background:
    radial-gradient(120% 90% at 18% 0%, rgba(80, 120, 210, 0.16), transparent 62%),
    linear-gradient(180deg, #0c0d13, #08080c);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 40px 90px -40px rgba(0, 0, 0, 0.9);
  overflow: hidden;
}

/* 贯穿竖直的轨道线 */
.orbit__axis {
  position: absolute;
  left: calc(clamp(18px, 2.4vw, 30px) + 4.5px);
  top: 8%;
  bottom: 8%;
  width: 1px;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(255, 255, 255, 0.16) 12%,
    rgba(255, 255, 255, 0.16) 88%,
    transparent
  );
}

.orbit__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px 0;
  animation: orbitIn 0.6s var(--ease-out) both;
  animation-delay: calc(var(--i) * 0.07s);

  &:hover .orbit__dot {
    transform: scale(1.5);
    box-shadow: 0 0 22px hsl(var(--hue) 90% 62% / 0.9);
  }
}

@keyframes orbitIn {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
}

.orbit__dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  flex-shrink: 0;
  background: hsl(var(--hue) 85% 66%);
  box-shadow: 0 0 16px hsl(var(--hue) 90% 62% / 0.6);
  transition:
    transform 0.35s var(--ease-out),
    box-shadow 0.35s var(--ease-soft);
}

.orbit__meta {
  display: flex;
  align-items: baseline;
  gap: 10px;
  min-width: 0;

  b {
    font-size: 15.5px;
    font-weight: 600;
    letter-spacing: -0.008em;
  }

  em {
    font-style: normal;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.14em;
    color: var(--c-text-3);
  }
}

.orbit__num {
  margin-left: auto;
  font-size: 12.5px;
  color: var(--c-text-3);
  white-space: nowrap;
}

/* ---------- 窄屏：取消 sticky，改成顺序堆叠 ---------- */

@media (max-width: 900px) {
  .scrolly {
    height: auto !important;
  }

  .scrolly__sticky {
    position: static;
    height: auto;
    display: block;
    padding-bottom: 40px;
  }

  .scrolly__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .scrolly__text,
  .scrolly__visual {
    display: block;
  }

  .step {
    opacity: 1;
    transform: none;
    padding: 34px 0;
    border-top: 1px solid var(--c-line);
  }

  .step__title {
    font-size: 26px;
  }

  .visual {
    opacity: 1;
    transform: none;
  }
}
</style>
