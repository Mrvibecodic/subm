import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { i18n } from '@/lib/i18n'
import { appName, basePath, metaFor, promoUrl, siteOrigin } from '@/lib/shared'

const onest = localFont({
  src: [
    { path: '../../fonts/onest-latin.woff2', weight: '100 900' },
    { path: '../../fonts/onest-cyrillic.woff2', weight: '100 900' },
  ],
  display: 'swap',
  variable: '--font-onest',
})

// Тема до первой отрисовки, чтобы не мигало: явный выбор хранится в браузере, иначе — как в системе.
const themeScript = `(function(){try{var t=localStorage.getItem('submw_docs_theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  const meta = metaFor(lang)
  return {
    metadataBase: new URL(siteOrigin),
    title: { default: meta.title, template: `%s — ${appName}` },
    description: meta.description,
    applicationName: appName,
    openGraph: {
      type: 'website',
      siteName: appName,
      locale: 'ru_RU',
      url: `${basePath}/${lang}/docs/`,
      title: meta.title,
      description: meta.description,
      images: [{ url: promoUrl, alt: appName }],
    },
  }
}

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  return (
    <html lang={lang} className={onest.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: статичный скрипт темы */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }))
}
