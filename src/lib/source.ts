import { loader } from 'fumadocs-core/source'
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons'
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema'
import { defineDocs } from 'fumadocs-mdx/macro'
import { i18n } from './i18n'
import { docsRoute } from './shared'

const docs = defineDocs({
  dir: 'content/docs',
  docs: { schema: pageSchema },
  meta: { schema: metaSchema },
})

// Короткие названия пунктов меню, где заголовок страницы длиннее (как в утверждённом мокапе).
const navNames: Record<string, string> = { '/ru/docs/install/script': 'Скриптом' }

export const source = loader({
  baseUrl: docsRoute,
  i18n,
  source: docs.toFumadocsSource(),
  plugins: [
    lucideIconsPlugin(),
    {
      name: 'nav-names',
      transformPageTree: {
        file(node) {
          const n = navNames[node.url]
          return n ? { ...node, name: n } : node
        },
      },
    },
  ],
})
