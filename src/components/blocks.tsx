'use client'
import {
  type ComponentProps,
  createContext,
  isValidElement,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { IcoCheck, IcoCopy, IcoFile, IcoTerm } from '@/components/icons'

// Вкладки: одна группа (groupId) переключается на всей странице и запоминается.
const TabCtx = createContext<string>('')
const EVT = 'submw-tab'

export function Tabs({ items, groupId, children }: { items: string[]; groupId?: string; persist?: boolean; children: ReactNode }) {
  const [cur, setCur] = useState(items[0])
  const key = groupId ? `submw_docs_tab_${groupId}` : ''
  useEffect(() => {
    if (!key) return
    try {
      const v = localStorage.getItem(key)
      if (v && items.includes(v)) setCur(v)
    } catch {}
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ key: string; v: string }>).detail
      if (d.key === key && items.includes(d.v)) setCur(d.v)
    }
    addEventListener(EVT, on)
    return () => removeEventListener(EVT, on)
  }, [key, items])
  const pick = (v: string) => {
    setCur(v)
    if (!key) return
    try {
      localStorage.setItem(key, v)
    } catch {}
    dispatchEvent(new CustomEvent(EVT, { detail: { key, v } }))
  }
  return (
    <div className="tabs">
      <div className="tablist" role="tablist">
        {items.map((v) => (
          <button key={v} type="button" role="tab" aria-selected={v === cur} tabIndex={v === cur ? 0 : -1} onClick={() => pick(v)}>
            {v}
          </button>
        ))}
      </div>
      <TabCtx.Provider value={cur}>{children}</TabCtx.Provider>
    </div>
  )
}

export function Tab({ value, children }: { value: string; children: ReactNode }) {
  const cur = useContext(TabCtx)
  return (
    <div className="tabpanel" role="tabpanel" hidden={cur !== value}>
      {children}
    </div>
  )
}

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement(node)) return textOf((node.props as { children?: ReactNode }).children)
  return ''
}

// Блок кода: заголовок файла или «Терминал», кнопка «Копировать».
export function CodeBlock({ title, children, ...rest }: ComponentProps<'pre'> & { title?: string }) {
  const ref = useRef<HTMLPreElement>(null)
  const [done, setDone] = useState(false)
  const copy = () => {
    const txt = (ref.current?.textContent ?? textOf(children)).replace(/\n+$/, '')
    const ok = () => {
      setDone(true)
      setTimeout(() => setDone(false), 1500)
    }
    const fb = () => {
      if (!ref.current) return
      const r = document.createRange()
      r.selectNodeContents(ref.current)
      const s = getSelection()
      s?.removeAllRanges()
      s?.addRange(r)
    }
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(txt).then(ok, fb)
    else fb()
  }
  const term = !title || /^(Терминал|Вывод|cron)/.test(title)
  const btn = (
    <button type="button" className="cp" onClick={copy}>
      {done ? <IcoCheck /> : <IcoCopy />}
      <span>{done ? 'Скопировано' : 'Копировать'}</span>
    </button>
  )
  const { style, className, tabIndex, ...pre } = rest as ComponentProps<'pre'>
  void style
  void tabIndex
  return (
    <div className={`code${title ? '' : ' nobar'}`}>
      {title ? (
        <div className="bar">
          {term ? <IcoTerm /> : <IcoFile />}
          <span className="t">{title}</span>
          {btn}
        </div>
      ) : (
        btn
      )}
      <pre ref={ref} className={className} {...pre}>
        {children}
      </pre>
    </div>
  )
}

