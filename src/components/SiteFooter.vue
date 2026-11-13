<script setup lang="ts">
const year = new Date().getFullYear()

const columns = [
  {
    title: '产品',
    links: [
      { label: '星港与真题', href: '#stations' },
      { label: '词汇与背词', href: '#words' },
      { label: '逐题解析', href: '#explain' }
    ]
  },
  {
    title: '更多',
    links: [
      { label: '技术说明', href: '#tech' },
      { label: '下载', href: '#download' }
    ]
  }
]
</script>

<template>
  <footer class="foot">
    <div class="wrap">
      <div class="foot__top">
        <div class="foot__brand">
          <svg class="foot__mark" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id="footGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#f3cd8a" />
                <stop offset="1" stop-color="#7fb0ff" />
              </linearGradient>
            </defs>
            <path
              d="M12 1.6l2.35 6.9 6.9 2.35-6.9 2.35L12 20.1l-2.35-6.9-6.9-2.35 6.9-2.35z"
              fill="url(#footGrad)"
            />
          </svg>
          <div>
            <b>LexiVerse X</b>
            <span>语穹 · 英语训练桌面应用</span>
          </div>
        </div>

        <nav class="foot__cols" aria-label="页脚导航">
          <div v-for="col in columns" :key="col.title" class="foot__col">
            <h4>{{ col.title }}</h4>
            <ul>
              <li v-for="l in col.links" :key="l.label">
                <a :href="l.href">{{ l.label }}</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="author">
        <div class="author__avatar" aria-hidden="true">阿</div>
        <div class="author__text">
          <b>阿亮同学</b>
          <span>设计与开发</span>
        </div>
        <p class="author__note">
          「做过很多套卷子，也用过很多背单词软件。想做一个自己能天天打开的，于是就有了它。」
        </p>
      </div>

      <div class="foot__bottom">
        <span>© {{ year }} LexiVerse X · 保留所有权利</span>
        <span class="foot__built">
          真题内容著作权归原考试机构，仅面向个人学习使用
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.foot {
  position: relative;
  padding: clamp(52px, 6vw, 76px) 0 40px;
  border-top: 1px solid var(--c-line);
  background: linear-gradient(180deg, #020204, #000);
}

.foot__top {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.foot__brand {
  display: flex;
  gap: 12px;
  align-items: flex-start;

  b {
    display: block;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 12.5px;
    color: var(--c-text-3);
  }
}

.foot__mark {
  width: 20px;
  height: 20px;
  margin-top: 1px;
  filter: drop-shadow(0 0 10px rgba(231, 178, 92, 0.35));
}

.foot__cols {
  display: flex;
  gap: clamp(40px, 6vw, 90px);
}

.foot__col {
  h4 {
    font-size: 12px;
    font-weight: 600;
    color: var(--c-text-3);
    letter-spacing: 0.06em;
  }

  ul {
    margin-top: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  a {
    font-size: 13px;
    color: var(--c-text-2);
    transition: color 0.25s var(--ease-soft);

    &:hover {
      color: var(--c-text);
    }
  }
}

/* 作者署名：单独一块，不做成小字塞在角落 */
.author {
  margin-top: clamp(38px, 4.6vw, 54px);
  padding-top: clamp(24px, 3vw, 34px);
  border-top: 1px solid var(--c-line);
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.author__avatar {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 600;
  color: #16130c;
  background: linear-gradient(140deg, #f3cd8a, #d9a24e);
  box-shadow: 0 0 24px rgba(231, 178, 92, 0.28);
}

.author__text {
  b {
    display: block;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  span {
    display: block;
    margin-top: 3px;
    font-size: 12px;
    color: var(--c-text-3);
  }
}

.author__note {
  flex: 1 1 320px;
  min-width: 260px;
  font-size: 13px;
  line-height: 1.72;
  color: var(--c-text-3);
  padding-left: clamp(0px, 2vw, 24px);
  border-left: 1px solid var(--c-line);
}

.foot__bottom {
  margin-top: 34px;
  padding-top: 22px;
  border-top: 1px solid var(--c-line);
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 11.5px;
  color: var(--c-text-3);
}

.foot__built {
  opacity: 0.8;
}

@media (max-width: 720px) {
  .author__note {
    border-left: 0;
    padding-left: 0;
  }

  .foot__col h4 {
    margin-bottom: 2px;
  }
}
</style>
