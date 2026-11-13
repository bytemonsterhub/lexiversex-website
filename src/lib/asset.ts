/**
 * public/ 下静态资源的 URL 拼装。
 *
 * 为什么需要它：站点最终部署在 GitHub Pages 的项目子路径上
 * （https://<user>.github.io/<repo>/），模板里直接写 "/img/x.webp"
 * 会解析到域名根目录，图片全 404。这里统一用 Vite 的 BASE_URL 前缀，
 * 配合 vite.config.ts 里的 base: './'，本地 dev 和线上子路径都能命中。
 */
const BASE = import.meta.env.BASE_URL || './'

export function asset(relativePath: string): string {
  return BASE + relativePath.replace(/^\/+/, '')
}
