import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { highlight } from 'fumadocs-core/highlight'
import type { ComponentProps } from 'react'
import { CodeBlock } from '@/components/blocks'

// Целиком показывает файл установки из files/ (копии из репозитория прослойки, обновляются scripts/sync-files.sh).
export async function SourceFile({ name, lang, title }: { name: string; lang: string; title?: string }) {
  const code = (await readFile(join(process.cwd(), 'files', name), 'utf8')).replace(/\n+$/, '')
  return highlight(code, {
    lang,
    fallbackLanguage: 'text',
    components: { pre: (p: ComponentProps<'pre'>) => <CodeBlock {...p} title={title ?? name} /> },
  })
}
