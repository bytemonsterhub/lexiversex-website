<script setup lang="ts">
import { asset } from '../lib/asset'
/** 首屏：文字先行、产品随后浮现 —— 苹果式排法，注意力先落在主张上再落到东西上 */
</script>

<template>
  <section id="top" class="hero">
    <div class="hero__glow" aria-hidden="true" />
    <div class="hero__grid" aria-hidden="true" />

    <div class="wrap hero__copy">
      <span class="hero__eyebrow intro-rise">LEXIVERSE X · 英语训练桌面应用</span>

      <h1 class="hero__title intro-rise" style="animation-delay: 0.06s">
        把每一套题<br />
        <span class="hero__title-grad">点亮成一颗星。</span>
      </h1>

      <p class="hero__lede intro-rise" style="animation-delay: 0.14s">
        把你的材料变成能做的卷子：导入、精读、判分、复盘，配上间隔重复与逐题解析，
        全部装进一台<span class="nowrap">断网也能用</span>的桌面应用。
      </p>

      <div class="hero__actions intro-rise" style="animation-delay: 0.22s">
        <a class="btn btn--fill" href="#download">
          下载 Windows 版
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 2v8m0 0L4.8 6.8M8 10l3.2-3.2M3 13h10"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <a class="btn btn--ghost" href="#stations">先看看它长什么样</a>
      </div>
    </div>

    <div class="hero__stage intro-rise" style="animation-delay: 0.34s">
      <div class="hero__shot">
        <img
          :src="asset('img/hero-galaxy.webp')"
          width="1320"
          height="796"
          alt="LexiVerse X 星港首页：七个训练站点悬浮在星图上"
          fetchpriority="high"
        />
      </div>
      <div class="hero__fade" aria-hidden="true" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  padding-top: clamp(112px, 15vh, 168px);
  overflow: hidden;
}

/* 星云：两层极淡的径向光，负责给纯黑底一点颜色倾向 */
.hero__glow {
  position: absolute;
  inset: -20% -10% auto;
  height: 900px;
  pointer-events: none;
  background:
    radial-gradient(680px 420px at 50% 8%, rgba(84, 122, 214, 0.3), transparent 68%),
    radial-gradient(520px 380px at 22% 30%, rgba(231, 178, 92, 0.12), transparent 70%),
    radial-gradient(620px 400px at 82% 18%, rgba(96, 216, 180, 0.1), transparent 72%);
  filter: blur(6px);
}

/* 极细网格：只在光晕范围内可见，制造「仪器面板」的暗示 */
.hero__grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 76px 76px;
  mask-image: radial-gradient(620px 520px at 50% 26%, #000 8%, transparent 78%);
  -webkit-mask-image: radial-gradient(620px 520px at 50% 26%, #000 8%, transparent 78%);
}

.hero__copy {
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero__eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--c-text-3);
  text-transform: uppercase;
}

.hero__title {
  margin-top: 22px;
  font-size: clamp(38px, 6.6vw, 88px);
  font-weight: 700;
  line-height: 1.16;
  letter-spacing: -0.012em;
  text-wrap: balance;
}

.hero__title-grad {
  background: linear-gradient(96deg, #ffffff 4%, #a9c6ff 44%, #e7b25c 92%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__lede {
  margin-top: 26px;
  max-width: 37em;
  font-size: clamp(15.5px, 1.45vw, 18.5px);
  line-height: 1.72;
  color: var(--c-text-2);
  letter-spacing: -0.008em;
  text-wrap: pretty;
}

/* 中文可以在任意字间断行，"断网"被拆成两行就很难看，这里锁死它 */
.nowrap {
  white-space: nowrap;
}

.hero__actions {
  margin-top: 34px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
}

.hero__stage {
  position: relative;
  z-index: 1;
  margin-top: clamp(52px, 7vw, 88px);
  padding: 0 clamp(16px, 4vw, 48px);
  max-width: 1180px;
  margin-left: auto;
  margin-right: auto;
}

.hero__shot {
  position: relative;
  aspect-ratio: 1320 / 838;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 2px 0 0 rgba(255, 255, 255, 0.06) inset,
    0 60px 140px -40px rgba(60, 100, 200, 0.4),
    0 30px 80px -20px rgba(0, 0, 0, 0.95);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
  }
}

/* 底部渐隐：让产品图「融进」下方黑色，而不是被硬边切断 */
.hero__fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 46%;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.72) 52%, #000 88%);
}

@media (max-width: 680px) {
  .br-lg {
    display: none;
  }
  .hero__actions .btn {
    flex: 1 1 100%;
  }

  /* 手机上整窗截图缩到 360px 宽就什么都看不清了，
     改容器比例逼 cover 放大，只保留界面左上角这块信息最密的区域 */
  .hero__shot {
    aspect-ratio: 1.18;
  }
}
</style>
