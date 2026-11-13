#!/usr/bin/env node
/**
 * 一键发布官网到 GitHub Pages。
 *
 * 为什么不用 git push：
 *   本机网络里 github.com 的 CONNECT 被代理拒绝（502），
 *   但 api.github.com 直通。所以整条推送链路改走 Git Database API：
 *   建 blob → 拼 tree → 建 commit → 更新 ref。
 *
 * 用法：
 *   GITHUB_TOKEN=ghp_xxx node scripts/publish.mjs [owner/repo]
 *   （owner 省略时用 token 对应的账号）
 *
 * token 需要 classic 的 repo 权限，或 fine-grained 的
 *   Contents: Read and write + Pages: Read and write + Administration: Read and write
 */
import { readFile, readdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const API = 'https://api.github.com'
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
const repoArg = process.argv[2] || 'lexiversex-website'
const REPO = repoArg.includes('/') ? repoArg.split('/')[1] : repoArg
const OWNER_ARG = repoArg.includes('/') ? repoArg.split('/')[0] : null
let OWNER = ''

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.idea', '.vscode'])
const SKIP_FILES = new Set(['.DS_Store', 'Thumbs.db'])

if (!TOKEN) {
  console.error('✗ 缺少 GITHUB_TOKEN 环境变量')
  process.exit(1)
}

async function api(pathname, { method = 'GET', body, allow404 = false } = {}) {
  const res = await fetch(API + pathname, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'lexiversex-site-publisher',
      ...(body ? { 'Content-Type': 'application/json' } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  })
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { raw: text }
  }
  if (!res.ok) {
    if (allow404 && res.status === 404) return null
    const msg = data?.message || text.slice(0, 300)
    const err = new Error(`${method} ${pathname} → ${res.status} ${msg}`)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

/** 收集要上传的文件（相对路径 + Buffer） */
async function collect(dir, base = '') {
  const out = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const abs = path.join(dir, e.name)
    const rel = base ? `${base}/${e.name}` : e.name
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      out.push(...(await collect(abs, rel)))
    } else if (e.isFile()) {
      if (SKIP_FILES.has(e.name)) continue
      out.push({ rel, abs })
    }
  }
  return out
}

async function uploadBlobs(files) {
  const result = new Array(files.length)
  let cursor = 0
  const workers = Array.from({ length: 6 }, async () => {
    while (cursor < files.length) {
      const i = cursor++
      const { rel, abs } = files[i]
      const content = (await readFile(abs)).toString('base64')
      const blob = await api(`/repos/${OWNER}/${REPO}/git/blobs`, {
        method: 'POST',
        body: { content, encoding: 'base64' }
      })
      result[i] = { path: rel, mode: '100644', type: 'blob', sha: blob.sha }
      process.stdout.write(`  · ${rel}\n`)
    }
  })
  await Promise.all(workers)
  return result
}

async function headSha() {
  for (const ref of ['heads/main', 'heads/master']) {
    try {
      const r = await api(`/repos/${OWNER}/${REPO}/git/ref/${ref}`)
      if (r?.object?.sha) return r.object.sha
    } catch (e) {
      // 空仓库这里返回的是 409 Git Repository is empty，不是 404
      if (e.status !== 404 && e.status !== 409) throw e
    }
  }
  return null
}

/**
 * 全新的空仓库不能直接 POST /git/blobs（返回 409 Git Repository is empty），
 * 得先用 Contents API 落一个文件把分支撑起来，之后才能走 Git Data API。
 */
async function ensureInitialized() {
  if (await headSha()) return
  console.log('· 空仓库，先落一个初始提交')
  await api(`/repos/${OWNER}/${REPO}/contents/README.md`, {
    method: 'PUT',
    body: {
      message: 'chore: 初始化仓库',
      content: Buffer.from('# LexiVerse X\n\n占位提交，随后由 scripts/publish.mjs 覆盖。\n').toString(
        'base64'
      ),
      branch: 'main'
    }
  })
}

async function main() {
  // 1. 校验 token、拿到账号
  const me = await api('/user')
  OWNER = OWNER_ARG || me.login
  console.log(`\n账号：${me.login}   目标仓库：${OWNER}/${REPO}\n`)

  // 2. 仓库不存在就建
  let repo = await api(`/repos/${OWNER}/${REPO}`, { allow404: true })
  if (!repo) {
    repo = await api('/user/repos', {
      method: 'POST',
      body: {
        name: REPO,
        description: 'LexiVerse X 产品官网 —— 阿亮同学',
        private: false,
        has_issues: true,
        has_wiki: false,
        has_projects: false,
        auto_init: false
      }
    })
    console.log(`✓ 已创建仓库 ${repo.full_name}`)
  } else {
    console.log(`· 仓库已存在 ${repo.full_name}，直接覆盖内容`)
  }

  // 3. 必须先有 docs 才推，否则 Pages 会空
  const docsIndex = path.join(root, 'docs', 'index.html')
  try {
    await stat(docsIndex)
  } catch {
    console.error('✗ 缺少 docs/index.html，先跑 npm run build:docs')
    process.exit(1)
  }

  // 4. 空仓库要先初始化出 main 分支
  await ensureInitialized()

  // 5. 上传所有 blob
  const files = await collect(root)
  console.log(`↑ 上传 ${files.length} 个文件…`)
  const tree = await uploadBlobs(files)

  const newTree = await api(`/repos/${OWNER}/${REPO}/git/trees`, {
    method: 'POST',
    body: { tree }
  })

  // 5. 建 commit（有历史就接在后面，保持线性）
  const parent = await headSha()
  const stamp = new Date().toISOString().replace('T', ' ').slice(0, 16)
  const commit = await api(`/repos/${OWNER}/${REPO}/git/commits`, {
    method: 'POST',
    body: {
      message: parent ? `chore: 更新官网产物 (${stamp})` : 'feat: LexiVerse X 官网首版',
      tree: newTree.sha,
      parents: parent ? [parent] : []
    }
  })

  // 6. 建/移动 main 分支
  const existing = await headSha()
  if (existing) {
    await api(`/repos/${OWNER}/${REPO}/git/refs/heads/main`, {
      method: 'PATCH',
      body: { sha: commit.sha, force: true }
    })
  } else {
    await api(`/repos/${OWNER}/${REPO}/git/refs`, {
      method: 'POST',
      body: { ref: 'refs/heads/main', sha: commit.sha }
    })
  }
  console.log(`✓ 已提交 ${commit.sha.slice(0, 7)} → main`)

  await api(`/repos/${OWNER}/${REPO}`, {
    method: 'PATCH',
    body: { default_branch: 'main' }
  }).catch(() => {})

  // 7. 开启 / 更新 Pages（从 main 的 /docs 目录发布）
  const source = { branch: 'main', path: '/docs' }
  const pages = await api(`/repos/${OWNER}/${REPO}/pages`, { allow404: true })
  if (pages) {
    await api(`/repos/${OWNER}/${REPO}/pages`, { method: 'PUT', body: { source } })
    console.log('· Pages 已存在，已把发布源切到 main:/docs')
  } else {
    await api(`/repos/${OWNER}/${REPO}/pages`, {
      method: 'POST',
      body: { source }
    })
    console.log('✓ 已开启 GitHub Pages（main:/docs）')
  }

  // 8. 等首次构建
  const url = `https://${OWNER.toLowerCase()}.github.io/${REPO}/`
  console.log(`\n等待 Pages 构建… ${url}`)
  let status = ''
  for (let i = 0; i < 40; i++) {
    const b = await api(`/repos/${OWNER}/${REPO}/pages/builds/latest`, { allow404: true })
    status = b?.status || 'queued'
    if (status === 'built') {
      console.log('✓ 构建完成')
      break
    }
    if (status === 'errored') {
      console.error(`✗ Pages 构建失败：${b?.error?.message || '未知原因'}`)
      break
    }
    await new Promise((r) => setTimeout(r, 4000))
  }

  console.log(`\n仓库地址：${repo.html_url}`)
  console.log(`站点地址：${url}\n`)
}

main().catch((e) => {
  console.error(`\n✗ ${e.message}`)
  if (e.data?.errors) console.error(JSON.stringify(e.data.errors, null, 2))
  process.exit(1)
})
