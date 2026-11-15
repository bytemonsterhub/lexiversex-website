# LexiVerse X 官网

LexiVerse X（语穹）的产品介绍站。单页、纯静态、零后端依赖。

作者：**阿亮同学**

---

## 跑起来

```bash
cd website
npm install      # 首次
npm run dev      # 开发，http://localhost:5180
```

出正式版本：

```bash
npm run build    # 先类型检查再构建，产物在 website/dist
npm start        # 本地预览构建产物，http://localhost:4173
```

`dist/` 是纯静态目录，直接丢到任意静态托管（Nginx / OSS / Pages）即可。
**不能双击 `dist/index.html` 用 file:// 打开** —— 构建产物是 ES Module，
浏览器在 file:// 协议下会按跨域处理，脚本不会执行。

## 发布到 GitHub Pages

- 线上地址：<https://bytemonsterhub.github.io/lexiversex-website/>
- 仓库地址：<https://github.com/bytemonsterhub/lexiversex-website>
- 安装包：<https://github.com/bytemonsterhub/lexiversex-website/releases/latest>

站点由 GitHub Pages 直接从 `main` 分支的 `docs/` 目录发布，仓库里同时保存源码和构建产物。

```bash
npm run build:docs                          # 构建 → 同步到 docs/（含 .nojekyll）
GITHUB_TOKEN=ghp_xxx npm run publish        # 建仓库 / 推送 / 开启 Pages
```

`scripts/publish.mjs` 没有用 `git push`，而是走 GitHub 的 Git Database API
（建 blob → 拼 tree → 建 commit → 更新 ref）。原因很实际：这台机器上
`github.com` 的 CONNECT 被代理拒绝（502），只有 `api.github.com` 通。
换成网络正常的环境，用普通 `git push` 也一样能发布，`docs/` 的布局不用改。

改完页面重新发布，只要再跑上面两条命令——脚本会自动在上一个提交后追加，
并等 Pages 构建完成。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 框架 | Vue 3.5 `<script setup>` + TypeScript |
| 构建 | Vite 5 |
| 样式 | SCSS + 原生 CSS 变量 |
| 动效 | IntersectionObserver 滚动渐显 + Canvas 2D 星场 |

没有引入动画库、UI 库、字体库。所有视觉都是手写的，整站 JS 产物 88 KB（gzip 37 KB）。

## 目录

```
website/
├─ index.html              入口（含内联 SVG favicon）
├─ vite.config.ts
├─ public/img/*.webp       产品截图，由 _probe/build-site-images.mjs 生成
└─ src/
   ├─ App.vue              区块总装
   ├─ directives/reveal.ts 滚动渐显指令 v-reveal
   ├─ styles/global.scss   设计 token、排版尺度、按钮、窗口框
   └─ components/
      ├─ StarField.vue       全屏星场（预渲染辉光贴图 + drawImage）
      ├─ SiteNav.vue         玻璃导航条
      ├─ HeroSection.vue     首屏
      ├─ StatsStrip.vue      数字带 + CountUp.vue
      ├─ StationsSection.vue 星港三幕（滚动驱动的 sticky 叙事）
      ├─ WordsSection.vue    词库 / 闪卡 / 默写 / 间隔重复刻度
      ├─ ExplainSection.vue  逐题解析结构
      ├─ TechSection.vue     工程说明 + 规格表
      ├─ DownloadSection.vue 下载 CTA
      └─ SiteFooter.vue      页脚 + 作者署名
```

## 几处实现说明

**展示图从哪来**：`_probe/build-site-images.mjs` 读取应用截图，
裁掉 42px 的窗口标题栏、切掉滚动条边缘、必要时切掉底部空白，统一转 WebP（质量 94）。
源图在项目根的 `shots/` 与 `_probe/`。换图时改脚本里的 `JOBS` 再跑一次。

**星场为什么不用 Three.js**：400 颗星如果用 `createRadialGradient` 逐帧画，
主线程会稳定掉帧。改成启动时预渲染一张 32×32 辉光贴图，之后每帧只 `drawImage`，
是纯拷贝开销。`prefers-reduced-motion` 下只渲染一帧静态星图。

**sticky 三幕**：`StationsSection` 用 `(3 + 0.6) × 100vh` 的容器 + 内部 `sticky` 撑，
滚动时按「容器已滚过多少百分比」算当前幕次。没有引滚动库，
因为它只需要一个数，自己算比让第三方 rAF 和星场抢帧更可控。

**中文排版的三条硬规矩**（写在 `global.scss` 注释里）：
行高不低于 1.15、字距不能用英文那套 -0.03em、大标题加 `text-wrap: balance`。
中文正文另加 `text-wrap: pretty`，避免末行只剩一两个字。

## 数据出处

页面上出现的数字来自应用本身：

- 14 个原创训练包 / 198 道题 —— `builtin/content/*.json`
- 36 个自建词条 / 6 个主题 —— `builtin/lexicon.json`

程序不内置任何第三方试题；本站只介绍工具本身，不提供题库下载。
导入材料的版权归原权利人，由用户自行负责。
