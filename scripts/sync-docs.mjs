#!/usr/bin/env node
/**
 * 把 dist/ 同步到 docs/，供 GitHub Pages 直接从 docs 目录发布。
 * docs/ 是要提交进仓库的构建产物，别加进 .gitignore。
 */
import { cp, rm, writeFile, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const dist = path.join(root, 'dist')
const docs = path.join(root, 'docs')

await access(path.join(dist, 'index.html')).catch(() => {
  console.error('✗ 没找到 dist/index.html，先执行 npm run build')
  process.exit(1)
})

await rm(docs, { recursive: true, force: true })
await cp(dist, docs, { recursive: true })
// 关掉 Jekyll：省一次构建，也避免下划线开头的文件被吞掉
await writeFile(path.join(docs, '.nojekyll'), '')

console.log('✓ dist → docs 同步完成')
