import Link from 'next/link'
import { Logo } from '@/components/logo'
import { basePath, community, gitConfig } from '@/lib/shared'

const points = [
  ['Вместо текущей подписки', 'Встаёт на домен подписки панели. Ссылки у пользователей остаются прежними.'],
  ['Зеркало подписки', 'Работает на своём домене и берёт подписки с домена подписки панели.'],
  ['Веб-админка', 'Пользователи, устройства, грейс, доп. конфиги, логи и чат поддержки поверх API панели.'],
] as const

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-16">
      <div className="flex w-full max-w-5xl flex-col items-center gap-10">
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Logo className="size-16 rounded-2xl shadow-lg" />
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Subscription Middleware</h1>
          </div>
          <p className="text-xl text-fd-muted-foreground">
            Прослойка подписки для панели Remnawave: на домене подписки или зеркалом на своём домене
          </p>
          <div className="flex flex-row flex-wrap justify-center gap-3">
            <Link
              href={`/${lang}/docs`}
              className="rounded-full bg-fd-primary px-6 py-2.5 font-medium text-fd-primary-foreground"
            >
              Документация
            </Link>
            <a
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
              className="rounded-full border border-fd-border px-6 py-2.5 font-medium"
            >
              GitHub
            </a>
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-x-2 gap-y-1 text-sm text-fd-muted-foreground">
            <a href={community.group} className="font-medium text-fd-foreground underline underline-offset-4">
              Telegram-группа
            </a>
            <span>— новости и релизы</span>
            <span aria-hidden>·</span>
            <a href={community.chat} className="font-medium text-fd-foreground underline underline-offset-4">
              Telegram-чат
            </a>
            <span>— помощь и обсуждение</span>
          </div>
        </div>
        <img
          src={`${basePath}/og.png`}
          alt="Remnawave Subscription Middleware"
          width={1280}
          height={640}
          className="h-auto w-full max-w-4xl rounded-2xl border border-fd-border shadow-2xl"
        />
      </div>

      <div className="mt-16 grid w-full max-w-5xl gap-6 md:grid-cols-3">
        {points.map(([title, description]) => (
          <div key={title} className="rounded-2xl border border-fd-border p-6">
            <h2 className="mb-2 font-semibold">{title}</h2>
            <p className="text-sm text-fd-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
