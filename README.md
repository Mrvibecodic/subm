# Документация Remnawave Subscription Middleware

Исходники сайта документации прослойки подписки Remnawave: **https://mrvibecodic.github.io/subm/**

Сам проект — [Mrvibecodic/remnawave-subscription-middleware](https://github.com/Mrvibecodic/remnawave-subscription-middleware). Вопросы и помощь — в [Telegram-чате](https://t.me/+8BJQXYXYLqM4YWYy), новости и релизы — в [Telegram-группе](https://t.me/+2lmP1yhxpCE3MDcy).

## Как устроено

* Next.js со статической сборкой для GitHub Pages. Контент, меню и поиск — [fumadocs-core](https://fumadocs.dev) и fumadocs-mdx, оформление своё (`src/app/global.css`, `src/components/`) — один в один с утверждённым макетом.
* Страницы — `content/docs/ru/**/*.mdx`, порядок и группы меню — `meta.json`, иконки пунктов — поле `icon` (имя иконки Lucide).
* Скриншоты — `public/screenshots/<имя>-<light|dark>-<d|m>.webp`: светлая и тёмная тема, ПК и телефон. Вставляются компонентом `<Shot name="<имя>" alt="…" />`, размеры — в `src/lib/shots.json`.
* Сборка и публикация — `.github/workflows/pages.yml` при пуше в `main`.

## Локально

```bash
pnpm install
pnpm dev                                  # http://localhost:3000/ru/docs
SITE_BASE_PATH=/subm pnpm build           # статика в out/
```
