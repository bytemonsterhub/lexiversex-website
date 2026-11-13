<script setup lang="ts">
import { asset } from '../lib/asset'
/**
 * 解析区：产品最硬的一块差异。
 *
 * 布局改成「图在上、结构在下」—— 左右分栏时截图被压到 600px 宽，
 * 里面的字全糊了；这一节的说服力全在图里，必须让它占满。
 */

const parts = [
  { tag: '题目', desc: '题干原文与中文对照，先确认问的是什么' },
  { tag: '翻译', desc: '关键句逐句译出，不靠猜' },
  { tag: '答案', desc: '正确项 + 题型判定，知道自己在做哪类题' },
  { tag: '定位', desc: '出处精确到第几段第几句，能回去核对' },
  { tag: '信号', desc: '哪些词决定了这一题，把「语感」变成依据' },
  { tag: '替换', desc: '正确项与原文的同义改写对照' },
  { tag: '排除', desc: '每个错误项错在哪：未提及、张冠李戴还是相反' }
]
</script>

<template>
  <section id="explain" class="explain">
    <div class="wrap">
      <header class="explain__head" v-reveal>
        <span class="eyebrow">Every Question, Explained</span>
        <h2 class="h2">不是给个答案，<br /><em>是把这道题拆开给你看。</em></h2>
        <p class="lede">
          8645 道客观题，逐题都有解析。不是「选 A 因为 A 对」这种废话，
          而是把定位、信号、替换、排除一条条摆出来 —— 做错一道题，等于读完一篇小讲义。
        </p>
      </header>

      <figure class="explain__figure" v-reveal>
        <div class="shot">
          <img
            :src="asset('img/explain.webp')"
            width="1310"
            height="838"
            alt="做题界面：题卡下方已展开逐题解析，含题目、翻译、答案、定位、信号、替换、排除"
            loading="lazy"
          />
        </div>
        <figcaption>
          未交卷也能展开解析 · 中位长度 735 字
        </figcaption>
      </figure>

      <div class="explain__body">
        <div class="cover" v-reveal>
          <div class="cover__top">
            <b class="mono">8645<em>/8645</em></b>
            <span>客观题解析覆盖</span>
          </div>
          <div class="cover__bar"><i /></div>
          <dl class="cover__kv">
            <div>
              <dt>主观题</dt>
              <dd>551 道，对照参考不硬判分</dd>
            </div>
            <div>
              <dt>来源</dt>
              <dd>随包分发的 198 套真题</dd>
            </div>
          </dl>
        </div>

        <ul class="parts" v-reveal data-stagger>
          <li v-for="(p, i) in parts" :key="p.tag" class="part">
            <span class="part__idx mono">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <b>【{{ p.tag }}】</b>
              <span>{{ p.desc }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.explain {
  position: relative;
  padding: clamp(72px, 9vw, 118px) 0;
  border-top: 1px solid var(--c-line);
  background:
    radial-gradient(60% 50% at 78% 6%, rgba(231, 178, 92, 0.08), transparent 62%),
    linear-gradient(180deg, #05050a, #000);
}

.explain__head {
  max-width: 780px;
}

.explain__figure {
  margin: clamp(38px, 5vw, 58px) 0 0;

  figcaption {
    margin-top: 16px;
    text-align: center;
    font-size: 12px;
    color: var(--c-text-3);
    letter-spacing: 0.02em;
  }
}

.explain__body {
  margin-top: clamp(34px, 4.5vw, 52px);
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: clamp(24px, 3.5vw, 46px);
  align-items: stretch;
}

/* ---------- 覆盖率卡 ---------- */

.cover {
  padding: 22px 24px 20px;
  border-radius: 16px;
  border: 1px solid var(--c-line);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.008));
  display: flex;
  flex-direction: column;
}

.cover__top {
  display: flex;
  align-items: baseline;
  gap: 10px;

  b {
    font-size: 26px;
    font-weight: 600;
    letter-spacing: -0.02em;

    em {
      font-style: normal;
      font-size: 0.56em;
      color: var(--c-text-3);
      margin-left: 1px;
    }
  }

  span {
    font-size: 12.5px;
    color: var(--c-text-3);
  }
}

.cover__bar {
  margin-top: 14px;
  height: 5px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;

  i {
    display: block;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--c-blue), var(--c-warm));
  }
}

.cover__kv {
  margin: 20px 0 0;
  /* 与右侧网格等高时，把两条明细压到底部，卡片不会头重脚轻 */
  margin-top: auto;

  div {
    display: flex;
    gap: 12px;
    padding: 9px 0;
    border-top: 1px solid var(--c-line);
  }

  dt {
    width: 44px;
    flex-shrink: 0;
    font-size: 12px;
    color: var(--c-text-3);
  }

  dd {
    margin: 0;
    font-size: 12.5px;
    color: var(--c-text-2);
  }
}

/* ---------- 七个部件 ---------- */

.parts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--c-line);
  border: 1px solid var(--c-line);
  border-radius: 14px;
  overflow: hidden;
}

.part {
  display: flex;
  gap: 12px;
  padding: 17px 20px;
  background: #050508;
  transition: background-color 0.35s var(--ease-soft);

  &:hover {
    background: #0b0b11;
  }

  &:hover b {
    color: var(--c-warm);
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  b {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--c-text);
    transition: color 0.35s var(--ease-soft);
  }

  span {
    font-size: 12.5px;
    line-height: 1.6;
    color: var(--c-text-3);
    text-wrap: pretty;
  }
}

.part__idx {
  font-size: 10.5px;
  color: var(--c-text-3);
  padding-top: 2px;
}

/* 七项放进两列，最后一项独占整行 —— 否则右下角会空出半格 */
.part:last-child {
  grid-column: span 2;
}

@media (max-width: 900px) {
  .explain__body {
    grid-template-columns: 1fr;
  }

  .parts {
    grid-template-columns: 1fr;
  }

  .part:last-child {
    grid-column: auto;
  }
}
</style>
