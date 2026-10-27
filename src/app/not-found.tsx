import type { Metadata } from 'next'
import { i18n } from '@/lib/i18n'
import { basePath } from '@/lib/shared'

const home = `${basePath}/${i18n.defaultLanguage}/`

export const metadata: Metadata = {
  title: '404',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <html lang={i18n.defaultLanguage}>
      <body className="flex flex-col min-h-screen items-center justify-center gap-2 text-center">
        <h1 className="text-2xl font-bold">404</h1>
        <p>
          Страница не найдена — <a href={home}>{home}</a>
        </p>
      </body>
    </html>
  )
}
