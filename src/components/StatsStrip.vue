<script setup lang="ts">
import CountUp from './CountUp.vue'

const items = [
  { value: 198, suffix: '套', label: '历年真题', note: '四级 / 六级 / 考研' },
  { value: 9196, suffix: '题', label: '题目总量', note: '客观 8645 · 主观 551' },
  { value: 2558, suffix: '词', label: '核心词汇', note: '按真题句频排序' },
  { value: 100, suffix: '%', label: '解析覆盖', note: '客观题逐题有据' }
]
</script>

<template>
  <section class="stats">
    <div class="wrap">
      <ul class="stats__list" v-reveal data-stagger>
        <li v-for="it in items" :key="it.label" class="stats__item">
          <div class="stats__num">
            <CountUp :value="it.value" :suffix="it.suffix" />
          </div>
          <div class="stats__label">{{ it.label }}</div>
          <div class="stats__note">{{ it.note }}</div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.stats {
  position: relative;
  padding: clamp(48px, 6vw, 76px) 0;
  border-top: 1px solid var(--c-line);
  border-bottom: 1px solid var(--c-line);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.016), transparent);
}

.stats__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(20px, 3vw, 44px);
}

.stats__item {
  position: relative;
  text-align: center;
  padding: 0 4px;

  /* 竖分隔线用伪元素画，最后一项不要 */
  & + &::before {
    content: '';
    position: absolute;
    left: calc(clamp(20px, 3vw, 44px) / -2);
    top: 12%;
    bottom: 12%;
    width: 1px;
    background: var(--c-line);
  }
}

.stats__num {
  font-size: clamp(30px, 4.2vw, 54px);
  font-weight: 650;
  line-height: 1.05;
  letter-spacing: -0.03em;
  background: linear-gradient(180deg, #ffffff 24%, #cfd7e6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stats__label {
  margin-top: 12px;
  font-size: 14.5px;
  font-weight: 550;
  color: var(--c-text);
}

.stats__note {
  margin-top: 5px;
  font-size: 12px;
  color: var(--c-text-3);
  letter-spacing: 0.01em;
}

@media (max-width: 760px) {
  .stats__list {
    grid-template-columns: repeat(2, 1fr);
    gap: 34px 18px;
  }
  .stats__item:nth-child(3)::before {
    display: none;
  }
}
</style>
