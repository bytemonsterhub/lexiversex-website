<script setup lang="ts">
/** 收尾：只留一个动作，不给用户做选择的机会 */
</script>

<template>
  <section id="download" class="dl">
    <div class="dl__glow" aria-hidden="true" />
    <div class="wrap dl__inner" v-reveal>
      <span class="eyebrow">Get Started</span>
      <h2 class="dl__title">今晚就可以<br /><em>点亮第一颗星。</em></h2>
      <p class="dl__lede">
        下载、解压、双击。不需要注册账号，第一次打开就有 14 个原创训练包当示例，其余材料你自己导入。
      </p>

      <div class="dl__actions">
        <!-- 走 releases/latest/download：以后发新版本沿用同名资源，官网不用再改 -->
        <a
          class="btn btn--fill btn--lg"
          href="https://github.com/bytemonsterhub/lexiversex-website/releases/latest/download/LexiVerseX-0.1.0.exe"
          rel="noopener"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 2v8m0 0L4.8 6.8M8 10l3.2-3.2M3 13h10"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          下载 Windows 版
        </a>
        <span class="dl__meta mono">v0.1.0 · 81 MB · x64</span>
      </div>

      <p class="dl__tip">
        便携版无需安装，放在任意目录运行即可；进度保存在同级的 <code>data/</code> 目录。
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.dl {
  position: relative;
  padding: clamp(88px, 12vw, 150px) 0 clamp(80px, 10vw, 120px);
  overflow: hidden;
  border-top: 1px solid var(--c-line);
}

.dl__glow {
  position: absolute;
  left: 50%;
  top: 6%;
  width: 820px;
  height: 520px;
  transform: translateX(-50%);
  pointer-events: none;
  background:
    radial-gradient(closest-side, rgba(110, 168, 255, 0.22), transparent 72%),
    radial-gradient(closest-side at 70% 40%, rgba(231, 178, 92, 0.14), transparent 70%);
  filter: blur(10px);
}

.dl__inner {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dl__title {
  margin-top: 16px;
  font-size: clamp(34px, 5.4vw, 68px);
  font-weight: 700;
  line-height: 1.16;
  letter-spacing: -0.012em;
  text-wrap: balance;

  em {
    font-style: normal;
    background: linear-gradient(96deg, #fff 6%, #a9c6ff 48%, #e7b25c 94%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

.dl__lede {
  margin-top: 22px;
  max-width: 32em;
  font-size: clamp(15.5px, 1.5vw, 18px);
  line-height: 1.66;
  color: var(--c-text-2);
}

.dl__actions {
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.btn--lg {
  padding: 16px 34px;
  font-size: 17px;
}

.dl__meta {
  font-size: 12px;
  color: var(--c-text-3);
}

.dl__tip {
  margin-top: 26px;
  font-size: 12.5px;
  color: var(--c-text-3);

  code {
    font-family: var(--font-mono);
    font-size: 11.5px;
    padding: 2px 6px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.07);
    color: var(--c-text-2);
  }
}
</style>
