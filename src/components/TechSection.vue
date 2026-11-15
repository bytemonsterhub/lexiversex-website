<script setup lang="ts">
/** 工程说明：不吹理念，只列能用来自查的事实 */

const cards = [
  {
    title: '离线优先',
    body: '题库、词库、解析全部随包分发，运行期零联网请求。飞机上、断网的教室、酒店 Wi-Fi 认证页卡住的时候，都不影响打开就练。',
    icon: 'offline'
  },
  {
    title: '数据在你手里',
    body: '进度存在 data/ 目录下的几个 JSON 里。整份拷走就是迁移，换台机器接着练；没有账号，也没有云端同步这一环。',
    icon: 'data'
  },
  {
    title: '单文件运行',
    body: '一个 portable exe，不写注册表，不装服务。放 U 盘里也能跑，删掉文件夹就是卸载干净。',
    icon: 'portable'
  }
]

const specs = [
  { k: '平台', v: 'Windows 10 / 11 · x64' },
  { k: '安装包', v: '约 81 MB（含 21 MB 原创录音）' },
  { k: '技术栈', v: 'Electron 33 · Vue 3.5 · Three.js' },
  { k: '网络', v: '运行期无需联网' }
]
</script>

<template>
  <section id="tech" class="tech">
    <div class="wrap">
      <header class="tech__head" v-reveal>
        <span class="eyebrow">Under the Hood</span>
        <h2 class="h2">它不联网，<em>也照样能用。</em></h2>
        <p class="lede">
          学习工具最不该在你想学的时候掉链子。所以这里没有登录、没有云同步、没有「正在加载」——
          只有一份躺在你硬盘上的内容库。
        </p>
      </header>

      <div class="tech__cards" v-reveal data-stagger>
        <article v-for="c in cards" :key="c.title" class="tcard">
          <div class="tcard__icon" aria-hidden="true">
            <svg v-if="c.icon === 'offline'" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 8.5A14 14 0 0121 8.5M6.2 12.4a9.5 9.5 0 0111.6 0M9.4 16.2a5 5 0 015.2 0"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <circle cx="12" cy="19.6" r="1.4" fill="currentColor" />
            </svg>
            <svg v-else-if="c.icon === 'data'" viewBox="0 0 24 24" fill="none">
              <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" stroke-width="1.5" />
              <path
                d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="3.5" stroke="currentColor" stroke-width="1.5" />
              <path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>
          <h3 class="tcard__title">{{ c.title }}</h3>
          <p class="tcard__body">{{ c.body }}</p>
        </article>
      </div>

      <dl class="specs" v-reveal>
        <div v-for="s in specs" :key="s.k" class="specs__row">
          <dt>{{ s.k }}</dt>
          <dd>{{ s.v }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped lang="scss">
.tech {
  position: relative;
  padding: clamp(76px, 10vw, 132px) 0;
  border-top: 1px solid var(--c-line);
}

.tech__head {
  max-width: 760px;
}

.tech__cards {
  margin-top: clamp(42px, 5.5vw, 66px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--c-line);
  border: 1px solid var(--c-line);
  border-radius: 18px;
  overflow: hidden;
}

.tcard {
  padding: clamp(24px, 2.6vw, 34px);
  background: #050508;
  transition: background-color 0.4s var(--ease-soft);

  &:hover {
    background: #0a0a10;
  }
}

.tcard__icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  border: 1px solid var(--c-line-strong);
  color: var(--c-blue);
  background: rgba(110, 168, 255, 0.07);

  svg {
    width: 19px;
    height: 19px;
  }
}

.tcard__title {
  margin-top: 22px;
  font-size: 17.5px;
  font-weight: 600;
  letter-spacing: -0.018em;
}

.tcard__body {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.72;
  color: var(--c-text-2);
  text-wrap: pretty;
  /* keep-all 不许在连字符处硬断，"Wi-Fi" 才不会被切成 "Wi-" / "Fi" */
  word-break: keep-all;
}

.specs {
  margin: clamp(36px, 4.5vw, 54px) 0 0;
  border-top: 1px solid var(--c-line);
}

.specs__row {
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 13px 0;
  border-bottom: 1px solid var(--c-line);

  dt {
    width: 96px;
    flex-shrink: 0;
    font-size: 13px;
    color: var(--c-text-3);
  }

  dd {
    margin: 0;
    font-size: 14px;
    color: var(--c-text-2);
    font-variant-numeric: tabular-nums;
  }
}

@media (max-width: 880px) {
  .tech__cards {
    grid-template-columns: 1fr;
  }
}
</style>
