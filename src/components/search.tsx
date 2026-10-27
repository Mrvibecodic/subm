'use client'
import { useDocsSearch } from 'fumadocs-core/search/client'
import { staticClient } from 'fumadocs-core/search/client/orama-static'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { IcoSearch, IcoX } from '@/components/icons'
import { basePath } from '@/lib/shared'

type Hit = { id: string; url: string; type: string; content: string }

// Поиск отдаёт совпадения, обёрнутые в <mark>, — показываем их без вставки HTML.
function Marked({ text }: { text: string }) {
  const parts = text.split(/(<mark>.*?<\/mark>)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('<mark>') ? <mark key={i}>{p.slice(6, -7)}</mark> : <span key={i}>{p}</span>,
      )}
    </>
  )
}

export function SearchDialog({ open, onClose, titles }: { open: boolean; onClose: () => void; titles: Record<string, string> }) {
  const router = useRouter()
  const input = useRef<HTMLInputElement>(null)
  const { search, setSearch, query } = useDocsSearch({
    client: staticClient({ locale: 'ru', from: `${basePath}/api/search` }),
  })
  useEffect(() => {
    if (!open) return
    setSearch('')
    setTimeout(() => input.current?.focus(), 0)
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [open, onClose, setSearch])
  if (!open) return null
  const hits = (query.data !== 'empty' && Array.isArray(query.data) ? (query.data as Hit[]) : []).slice(0, 12)
  const go = (url: string) => {
    onClose()
    router.push(url)
  }
  return (
    <div className="sdlg" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sbox" role="dialog" aria-label="Поиск">
        <div className="in">
          <IcoSearch />
          <input
            ref={input}
            type="text"
            placeholder="Поиск по документации"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && hits[0] && go(hits[0].url)}
          />
          <button className="cp" type="button" aria-label="Закрыть" onClick={onClose}>
            <IcoX />
          </button>
        </div>
        <ul>
          {search && !query.isLoading && hits.length === 0 && <li className="none">Ничего не нашлось</li>}
          {!search && <li className="none">Начните вводить: например, «cookie» или «вебхук»</li>}
          {hits.map((h, i) => (
            <li key={h.id}>
              <a
                href={`${basePath}${h.url}`}
                className={i === 0 ? 'on' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  go(h.url)
                }}
              >
                <Marked text={h.content} />
                <small>{h.type === 'page' ? 'Страница' : (titles[h.url.split('#')[0].replace(/\/$/, '')] ?? '')}</small>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
