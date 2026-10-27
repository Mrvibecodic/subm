# Документация Remnawave Subscription Middleware

Исходники сайта документации прослойки подписки Remnawave: **https://mrvibecodic.github.io/subm/**

Сам проект — [Mrvibecodic/remnawave-subscription-middleware](https://github.com/Mrvibecodic/remnawave-subscription-middleware). Вопросы и помощь — в [Telegram-чате](https://t.me/+8BJQXYXYLqM4YWYy), новости и релизы — в [Telegram-группе](https://t.me/+2lmP1yhxpCE3MDcy).

## Как устроено

* [Fumadocs](https://fumadocs.dev) на Next.js, статическая сборка для GitHub Pages.
* Страницы — `content/docs/ru/*.mdx`, порядок в меню — `content/docs/ru/meta.json`.
* Скриншоты — `public/screenshots/<имя>-<light|dark>-<d|m>.webp`: светлая и тёмная тема, ПК и телефон. Вставляются компонентом `<Shot name="<имя>" alt="…" />`, размеры — в `src/lib/shots.json`.
* Сборка и публикация — `.github/workflows/pages.yml` при пуше в `main`.

## Локально

```bash
pnpm install
pnpm dev                                  # http://localhost:3000/ru/docs
SITE_BASE_PATH=/subm pnpm build           # статика в out/
```
