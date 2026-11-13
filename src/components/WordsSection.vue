<script setup lang="ts">
import { asset } from '../lib/asset'
/** 词汇区：词库是「材料」，闪卡与默写是「动作」，间隔重复是「节奏」 */

const ladder = [
  { t: '10 分', d: '刚见过' },
  { t: '1 天', d: '当日巩固' },
  { t: '3 天', d: '' },
  { t: '7 天', d: '' },
  { t: '16 天', d: '' },
  { t: '35 天', d: '' },
  { t: '90 天', d: '毕业' }
]

const lists = [
  { name: '四级', count: 1616, note: 'CET-4' },
  { name: '六级', count: 2143, note: 'CET-6' },
  { name: '考研', count: 1199, note: 'POSTGRAD' }
]
</script>

<template>
  <section id="words" class="words">
    <div class="wrap">
      <header class="words__head" v-reveal>
        <span class="eyebrow">Lexicon &amp; Drill</span>
        <h2 class="h2">认得、写得出，<em>才算真的会。</em></h2>
        <p class="lede">
          2558 个词不是从词典抄来的，是从 9196 道真题里数出来的 —— 每个词都带着它在真题里出现过的句子数。
          词频高的先学，做过真题的词优先复习。
        </p>
      </header>

      <div class="words__split">
        <div class="words__copy" v-reveal>
          <h3 class="h3">词库按真题句频排序</h3>
          <p>
            常见词书按字母表排版，结果你背了三个月的 abandon。这里按「在真题里出现过多少句」排序，
            每个词条各自标注 CEFR 等级与词性，配合 A1 到 C1 的分段筛选，你可以只啃最该啃的那一档。
          </p>

          <ul class="lists">
            <li v-for="l in lists" :key="l.name">
              <span class="lists__name">{{ l.name }}</span>
              <span class="lists__note mono">{{ l.note }}</span>
              <span class="lists__count mono">{{ l.count.toLocaleString('en-US') }}</span>
            </li>
          </ul>

          <p class="words__foot mono">三级词库合计 4958 条 · 去重后 2558 词</p>
        </div>

        <div class="words__shot" v-reveal>
          <div class="shot">
            <img
              :src="asset('img/lexicon.webp')"
              width="1320"
              height="800"
              alt="真题词库：按句频排序的词条列表，带 CEFR 等级标签"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- 间隔重复：用刻度尺画出来，比一段文字更容易理解「什么时候会再见到它」 -->
      <div class="srs" v-reveal>
        <div class="srs__head">
          <h3 class="h3">它会自己回来找你</h3>
          <p>
            自评「认识」前进一档，「模糊」退一档，「不认识」打回起点。走到最后一档算毕业，不再排进队列。
            默写写错一次，毕业身份立刻作废 —— 提笔写不出，就不算会。
          </p>
        </div>

        <div class="srs__ladder">
          <span class="srs__line" aria-hidden="true" />
          <div
            v-for="(s, i) in ladder"
            :key="s.t"
            class="srs__node"
            :style="{ '--i': i }"
          >
            <span class="srs__dot" />
            <span class="srs__t mono">{{ s.t }}</span>
            <span v-if="s.d" class="srs__d">{{ s.d }}</span>
          </div>
        </div>
      </div>

      <div class="duo">
        <figure class="duo__item" v-reveal>
          <div class="shot">
            <img
              :src="asset('img/words-card.webp')"
              width="1320"
              height="730"
              alt="背单词闪卡：翻面后显示单词与全部释义"
              loading="lazy"
            />
          </div>
          <figcaption>
            <b>闪卡</b>
            看词回忆，<kbd>空格</kbd> 翻面，<kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> 自评。三档都记进同一份进度。
          </figcaption>
        </figure>

        <figure class="duo__item" v-reveal>
          <div class="shot">
            <img
              :src="asset('img/words-spell.webp')"
              width="1320"
              height="650"
              alt="默写：给出释义拼写单词，答错时逐字母标出差异"
              loading="lazy"
            />
          </div>
          <figcaption>
            <b>默写</b>
            只给中文释义，把词拼出来。错了逐字母标差异 —— 差两个字母以内算「差一点」，不跟手滑混为一谈。
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.words {
  position: relative;
  padding: clamp(76px, 10vw, 132px) 0;
}

.words__head {
  max-width: 800px;
}

.words__split {
  margin-top: clamp(44px, 6vw, 76px);
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(32px, 5vw, 68px);
  align-items: center;
}

.words__copy {
  p {
    margin-top: 16px;
    font-size: 15px;
    line-height: 1.78;
    color: var(--c-text-2);
    text-wrap: pretty;
  }
}

.lists {
  margin-top: 26px;
  display: flex;
  flex-direction: column;

  li {
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--c-line);
  }
}

.lists__name {
  font-size: 15px;
  font-weight: 550;
}

.lists__note {
  font-size: 10.5px;
  letter-spacing: 0.11em;
  color: var(--c-text-3);
}

.lists__count {
  margin-left: auto;
  font-size: 15px;
  color: var(--c-text);
  font-variant-numeric: tabular-nums;
}

.words__foot {
  margin-top: 16px;
  font-size: 11.5px;
  color: var(--c-text-3);
}

/* ---------- 间隔重复刻度 ---------- */

.srs {
  margin-top: clamp(60px, 8vw, 104px);
  padding: clamp(28px, 4vw, 46px);
  border-radius: 22px;
  border: 1px solid var(--c-line);
  background:
    radial-gradient(90% 120% at 100% 0%, rgba(70, 216, 172, 0.09), transparent 58%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.022), transparent);
}

.srs__head {
  max-width: 620px;

  p {
    margin-top: 14px;
    font-size: 15px;
    line-height: 1.78;
    color: var(--c-text-2);
    text-wrap: pretty;
  }
}

.srs__ladder {
  position: relative;
  margin-top: clamp(38px, 5vw, 56px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: start;
}

.srs__line {
  position: absolute;
  left: 6%;
  right: 6%;
  top: 7px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05),
    rgba(110, 168, 255, 0.42) 42%,
    rgba(231, 178, 92, 0.72)
  );
  box-shadow: 0 0 18px rgba(110, 168, 255, 0.22);
}

.srs__node {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 11px;
}

/*
 * 外框固定 16px、圆点靠 ::before 递增 —— 
 * 否则每个节点高度不同，下面的时间标签就会参差不齐。
 */
.srs__dot {
  width: 16px;
  height: 16px;
  display: grid;
  place-items: center;
  transition: transform 0.3s var(--ease-out);

  &::before {
    content: '';
    width: calc(7px + var(--i) * 1.1px);
    height: calc(7px + var(--i) * 1.1px);
    border-radius: 50%;
    background: #0a0a0e;
    border: 1.5px solid rgba(150, 180, 230, calc(0.3 + var(--i) * 0.09));
    transition: all 0.3s var(--ease-out);
  }
}

.srs__node:hover .srs__dot {
  transform: scale(1.2);

  &::before {
    border-color: rgba(255, 255, 255, 0.85);
  }
}

.srs__node:last-child .srs__dot::before {
  background: var(--c-warm);
  border-color: var(--c-warm);
  box-shadow: 0 0 20px rgba(231, 178, 92, 0.75);
}

.srs__node:first-child .srs__dot::before {
  background: rgba(255, 255, 255, 0.75);
  border-color: transparent;
  box-shadow: 0 0 14px rgba(255, 255, 255, 0.35);
}

.srs__t {
  font-size: 12.5px;
  color: var(--c-text-2);
  white-space: nowrap;
}

.srs__d {
  min-height: 14px;
  margin-top: -4px;
  font-size: 10.5px;
  color: var(--c-text-3);
  white-space: nowrap;
}

/* ---------- 两张演示图 ---------- */

.duo {
  margin-top: clamp(56px, 7vw, 92px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(20px, 3vw, 36px);
}

.duo__item {
  /* 两张图原始高度不同，用统一比例容器 + 顶部对齐裁切，保证并排时底边齐平 */
  .shot {
    aspect-ratio: 1320 / 700;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }

  figcaption {
    margin-top: 18px;
    font-size: 14px;
    line-height: 1.7;
    color: var(--c-text-2);

    b {
      display: block;
      margin-bottom: 4px;
      font-size: 15.5px;
      color: var(--c-text);
    }
  }

  kbd {
    display: inline-block;
    padding: 1px 6px;
    margin: 0 1px;
    border-radius: 5px;
    border: 1px solid var(--c-line-strong);
    background: rgba(255, 255, 255, 0.06);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--c-text-2);
  }
}

@media (max-width: 880px) {
  .words__split,
  .duo {
    grid-template-columns: 1fr;
  }

  .srs__ladder {
    grid-template-columns: repeat(4, 1fr);
    gap: 26px 0;
  }

  .srs__line {
    display: none;
  }
}
</style>
