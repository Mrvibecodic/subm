import { Shell } from '@/components/shell'
import { source } from '@/lib/source'

export default async function Layout({ params, children }: LayoutProps<'/[lang]/docs'>) {
  const { lang } = await params
  return <Shell tree={source.getPageTree(lang)}>{children}</Shell>
}
