import Link from 'next/link'
import type * as PageTree from 'fumadocs-core/page-tree'
import { findNeighbour } from 'fumadocs-core/page-tree'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { IcoChev, IcoLeft, IcoRight } from '@/components/icons'
import { getMDXComponents } from '@/components/mdx'
import { Toc, TocInline } from '@/components/toc'
import { appName, community, gitConfig } from '@/lib/shared'
import { source } from '@/lib/source'

// Группа страницы в меню — ближайший разделитель выше неё.
function groupOf(nodes: PageTree.Node[], url: string, sep = ''): string | null {
  let cur = sep
  for (const n of nodes) {
    if (n.type === 'separator') cur = String(n.name ?? '')
    else if (n.type === 'page' && n.url === url) return cur
    else if (n.type === 'folder') {
      if (n.index?.url === url) return cur
      const g = groupOf(n.children, url, cur)
      if (g !== null) return g
    }
  }
  return null
}

export default async function Page(props: PageProps<'/[lang]/docs/[[...slug]]'>) {
  const params = await props.params
  const page = source.getPage(params.slug, params.lang)
  if (!page) notFound()

  const MDX = page.data.body
  const tree = source.getPageTree(params.lang)
  const group = groupOf(tree.children, page.url) ?? ''
  const nb = findNeighbour(tree, page.url)
  const toc = page.data.toc

  return (
    <div className="main">
      <article>
        <div className="crumbs">
          {group}
          {group && <IcoChev />}
          {page.data.title}
        </div>
        <h1>{page.data.title}</h1>
        {page.data.description && <p className="desc">{page.data.description}</p>}
        <TocInline items={toc} />
        <MDX components={getMDXComponents()} />
        <nav className="pager">
          {nb.previous && (
            <Link href={nb.previous.url}>
              <small>
                <IcoLeft />
                Назад
              </small>
              <b>{nb.previous.name}</b>
            </Link>
          )}
          {nb.next && (
            <Link className="nx" href={nb.next.url}>
              <small>
                Далее
                <IcoRight />
              </small>
              <b>{nb.next.name}</b>
            </Link>
          )}
        </nav>
        <div className="foot">
          <span>Remnawave {appName}</span>
          <a href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`} target="_blank" rel="noopener">
            Исходный код на GitHub
          </a>
          <a href={community.chat} target="_blank" rel="noopener">
            Помощь в Telegram
          </a>
        </div>
      </article>
      <Toc items={toc} />
    </div>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: PageProps<'/[lang]/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug, params.lang)
  if (!page) notFound()
  return { title: page.data.title, description: page.data.description }
}
