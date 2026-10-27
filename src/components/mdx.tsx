import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'
import type { ComponentProps, ReactNode } from 'react'
import { CodeBlock, Tab, Tabs } from '@/components/blocks'
import { Flow } from '@/components/flow'
import { IcoCheck, IcoInfo, IcoWarn } from '@/components/icons'
import { Shot } from '@/components/shot'

function Callout({ type, title, children }: { type?: 'info' | 'warn' | 'success'; title?: ReactNode; children: ReactNode }) {
  const kind = type === 'warn' ? 'warn' : type === 'success' ? 'ok' : 'info'
  const icon = kind === 'warn' ? <IcoWarn /> : kind === 'ok' ? <IcoCheck /> : <IcoInfo />
  return (
    <div className={`callout ${kind}`}>
      {icon}
      <div>
        {title && <b className="t">{title}</b>}
        {children}
      </div>
    </div>
  )
}

function Steps({ children }: { children: ReactNode }) {
  return <ol className="steps">{children}</ol>
}
function Step({ children }: { children: ReactNode }) {
  return <li>{children}</li>
}

function Cards({ children }: { children: ReactNode }) {
  return <div className="cards">{children}</div>
}
function Card({ title, href, icon, children }: { title: string; href?: string; icon?: ReactNode; children?: ReactNode }) {
  const body = (
    <>
      {icon && <div className="ic">{icon}</div>}
      <b>{title}</b>
      {children && <span>{children}</span>}
    </>
  )
  return href ? (
    <Link className="cardlink" href={href}>
      {body}
    </Link>
  ) : (
    <div className="cardlink">{body}</div>
  )
}

function Accordions({ children }: { children: ReactNode; type?: string }) {
  return <>{children}</>
}
function Accordion({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="more">
      <summary>
        <svg className="i chev" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
        {title}
      </summary>
      <div className="more-body">{children}</div>
    </details>
  )
}

function heading(Tag: 'h2' | 'h3') {
  return function H({ id, children }: ComponentProps<'h2'>) {
    return (
      <Tag id={id}>
        {children}
        {id && (
          <a className="anchor" href={`#${id}`} aria-hidden="true">
            #
          </a>
        )}
      </Tag>
    )
  }
}

function A({ href = '', children, ...rest }: ComponentProps<'a'>) {
  if (href.startsWith('/')) return <Link href={href}>{children}</Link>
  if (href.startsWith('#')) return <a href={href}>{children}</a>
  return (
    <a href={href} target="_blank" rel="noopener" {...rest}>
      {children}
    </a>
  )
}

function Table(props: ComponentProps<'table'>) {
  return (
    <div className="tablewrap">
      <table {...props} />
    </div>
  )
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    a: A,
    h2: heading('h2'),
    h3: heading('h3'),
    pre: CodeBlock,
    table: Table,
    Accordion,
    Accordions,
    Callout,
    Card,
    Cards,
    Flow,
    Shot,
    Step,
    Steps,
    Tab,
    Tabs,
    ...components,
  } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
