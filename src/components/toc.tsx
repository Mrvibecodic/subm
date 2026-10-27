'use client'
import type { TOCItemType } from 'fumadocs-core/toc'
import { useEffect, useState } from 'react'
import { IcoChev, IcoToc } from '@/components/icons'

export function Toc({ items }: { items: TOCItemType[] }) {
  const [on, setOn] = useState('')
  useEffect(() => {
    const els = items.map((t) => document.getElementById(t.url.slice(1))).filter(Boolean) as HTMLElement[]
    if (!els.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setOn(`#${e.target.id}`)),
      { rootMargin: '-80px 0px -70% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])
  if (!items.length) return <aside className="toc" />
  return (
    <aside className="toc" aria-label="На этой странице">
      <b>
        <IcoToc />
        На этой странице
      </b>
      {items.map((t) => (
        <a key={t.url} href={t.url} className={[t.depth >= 3 ? 'l3' : '', on === t.url ? 'on' : ''].join(' ').trim() || undefined}>
          {t.title}
        </a>
      ))}
    </aside>
  )
}

export function TocInline({ items }: { items: TOCItemType[] }) {
  if (!items.length) return null
  return (
    <details className="tocm">
      <summary>
        <IcoToc />
        На этой странице
        <IcoChev className="i chev" />
      </summary>
      <nav>
        {items.map((t) => (
          <a key={t.url} href={t.url} className={t.depth >= 3 ? 'l3' : undefined}>
            {t.title}
          </a>
        ))}
      </nav>
    </details>
  )
}
