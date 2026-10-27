import type { Metadata } from 'next'
import { basePath } from '@/lib/shared'

export const metadata: Metadata = { robots: { index: false, follow: true } }

export default async function LangHome({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  const target = `${basePath}/${lang}/docs/`
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <p style={{ padding: 24 }}>
        <a href={target}>Документация</a>
      </p>
    </>
  )
}
