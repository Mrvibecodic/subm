'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type * as PageTree from 'fumadocs-core/page-tree'
import { type ReactNode, useEffect, useState } from 'react'
import { IcoMenu, IcoMonitor, IcoMoon, IcoSearch, IcoSun, Logo } from '@/components/icons'
import { SearchDialog } from '@/components/search'
import { community, gitConfig } from '@/lib/shared'

const THEME_KEY = 'submw_docs_theme'

function norm(p: string) {
  return p.replace(/\/+$/, '')
}

function Brand({ sub }: { sub?: boolean }) {
  return (
    <Link className="brand" href="/ru/docs">
      <Logo />
      <span>
        Subscription Middleware{sub && <small>для Remnawave</small>}
      </span>
    </Link>
  )
}

function ThemeToggle() {
  const [t, setT] = useState('system')
  useEffect(() => {
    try {
      setT(localStorage.getItem(THEME_KEY) || 'system')
    } catch {}
  }, [])
  const set = (v: string) => {
    setT(v)
    try {
      if (v === 'system') localStorage.removeItem(THEME_KEY)
      else localStorage.setItem(THEME_KEY, v)
    } catch {}
    if (v === 'system') document.documentElement.removeAttribute('data-theme')
    else document.documentElement.setAttribute('data-theme', v)
  }
  const btn = (v: string, label: string, icon: ReactNode) => (
    <button type="button" aria-label={label} aria-pressed={t === v} onClick={() => set(v)}>
      {icon}
    </button>
  )
  return (
    <div className="theme" role="group" aria-label="Тема">
      {btn('light', 'Светлая', <IcoSun />)}
      {btn('system', 'Как в системе', <IcoMonitor />)}
      {btn('dark', 'Тёмная', <IcoMoon />)}
    </div>
  )
}

function TreeNodes({ nodes, path }: { nodes: PageTree.Node[]; path: string }) {
  return (
    <>
      {nodes.map((n, i) => {
        if (n.type === 'separator') return <h6 key={i}>{n.name}</h6>
        if (n.type === 'page')
          return (
            <Link key={n.url} href={n.url} className={norm(n.url) === path ? 'on' : undefined}>
              {n.icon}
              {n.name}
            </Link>
          )
        return (
          <div key={i}>
            {n.index && (
              <Link href={n.index.url} className={norm(n.index.url) === path ? 'on' : undefined}>
                {n.index.icon ?? n.icon}
                {n.index.name}
              </Link>
            )}
            <div className="sub">
              <TreeNodes nodes={n.children} path={path} />
            </div>
          </div>
        )
      })}
    </>
  )
}

function titlesOf(nodes: PageTree.Node[], out: Record<string, string> = {}) {
  for (const n of nodes) {
    if (n.type === 'page') out[norm(n.url)] = String(n.name)
    else if (n.type === 'folder') {
      if (n.index) out[norm(n.index.url)] = String(n.index.name)
      titlesOf(n.children, out)
    }
  }
  return out
}

export function Shell({ tree, children }: { tree: PageTree.Root; children: ReactNode }) {
  const pathname = usePathname()
  const path = norm(pathname)
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)

  useEffect(() => setMenu(false), [pathname])
  useEffect(() => {
    document.body.classList.toggle('menu', menu)
  }, [menu])
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearch(true)
      }
    }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [])

  return (
    <>
      <header className="mtop">
        <Brand />
        <button className="ib" type="button" aria-label="Поиск" onClick={() => setSearch(true)}>
          <IcoSearch />
        </button>
        <button className="ib" type="button" aria-label="Меню" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <IcoMenu />
        </button>
      </header>
      <div className="scrim" onClick={() => setMenu(false)} />
      <div className="layout">
        <aside className="side">
          <Brand sub />
          <button className="sbtn" type="button" onClick={() => setSearch(true)}>
            <IcoSearch />
            Поиск<kbd>Ctrl K</kbd>
          </button>
          <nav className="tree" aria-label="Разделы">
            <TreeNodes nodes={tree.children} path={path} />
          </nav>
          <div className="sfoot">
            <a href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`} target="_blank" rel="noopener">
              GitHub
            </a>
            <a href={community.group} target="_blank" rel="noopener">
              Группа
            </a>
            <a href={community.chat} target="_blank" rel="noopener">
              Чат
            </a>
            <ThemeToggle />
          </div>
        </aside>
        {children}
      </div>
      <SearchDialog open={search} onClose={() => setSearch(false)} titles={titlesOf(tree.children)} />
    </>
  )
}
