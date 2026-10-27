export const appName = 'Subscription Middleware'
export const docsRoute = '/docs'

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const gitConfig = {
  user: 'Mrvibecodic',
  repo: 'remnawave-subscription-middleware',
  branch: 'dev',
}

export const docsRepo = 'https://github.com/Mrvibecodic/subm'

export const community = {
  group: 'https://t.me/+2lmP1yhxpCE3MDcy',
  chat: 'https://t.me/+8BJQXYXYLqM4YWYy',
}

export const siteOrigin = `https://${gitConfig.user.toLowerCase()}.github.io`
export const promoUrl = `${basePath}/og.png`

export const siteMeta = {
  ru: {
    title: 'Remnawave Subscription Middleware — прослойка подписки',
    description:
      'Прослойка подписки для панели Remnawave: работает на домене подписки или зеркалом на своём домене. Грейс, блокировка устройств, доп. конфиги, лог запросов и веб-админка.',
  },
} as const

export type SiteLang = keyof typeof siteMeta

export function metaFor(lang: string) {
  return siteMeta[lang as SiteLang] ?? siteMeta.ru
}
