import type { Metadata } from 'next'
import { i18n } from '@/lib/i18n'
import { basePath } from '@/lib/shared'

const target = `${basePath}/${i18n.defaultLanguage}/docs/`

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function RootRedirectPage() {
  return (
    <html lang={i18n.defaultLanguage}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
      </head>
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <p>Перенаправление…</p>
        <a href={target}>
          {target}
        </a>
      </body>
    </html>
  )
}
