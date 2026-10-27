import { i18nProvider } from 'fumadocs-ui/i18n'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Provider } from '@/components/provider'
import { i18n, translations } from '@/lib/i18n'
import { appName, basePath, metaFor, promoUrl, siteOrigin } from '@/lib/shared'

const onest = localFont({
  src: [
    { path: '../../fonts/onest-latin.woff2', weight: '100 900' },
    { path: '../../fonts/onest-cyrillic.woff2', weight: '100 900' },
  ],
  display: 'swap',
})

export async function generateMetadata({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  const meta = metaFor(lang)

  return {
    metadataBase: new URL(siteOrigin),
    alternates: { canonical: `${basePath}/${lang}/` },
    title: { default: meta.title, template: `%s · ${appName}` },
    description: meta.description,
    applicationName: appName,
    openGraph: {
      type: 'website',
      siteName: appName,
      locale: 'ru_RU',
      url: `${basePath}/${lang}/`,
      title: meta.title,
      description: meta.description,
      images: [{ url: promoUrl, alt: appName }],
    },
  }
}

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params

  return (
    <html lang={lang} className={onest.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider i18n={i18nProvider(translations, lang)}>{children}</Provider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }))
}
