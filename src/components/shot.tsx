import shots from '@/lib/shots.json'
import { basePath } from '@/lib/shared'

type Size = { w: number; h: number; mw: number; mh: number }

// Снимок экрана в двух темах и двух размерах: тема выбирает картинку, узкий экран — мобильную версию.
export function Shot({ name, alt }: { name: string; alt: string }) {
  const s = (shots as Record<string, Size>)[name]
  const src = (theme: string, dev: string) => `${basePath}/screenshots/${name}-${theme}-${dev}.webp`
  const pic = (theme: 'light' | 'dark', cls: string) => (
    <picture className={cls}>
      <source media="(max-width: 640px)" srcSet={src(theme, 'm')} width={s?.mw} height={s?.mh} />
      <img
        src={src(theme, 'd')}
        alt={alt}
        width={s?.w}
        height={s?.h}
        loading="lazy"
        decoding="async"
        className="!my-0 h-auto max-w-full rounded-xl border border-fd-border shadow-xl"
      />
    </picture>
  )
  return (
    <figure className="not-prose my-6 flex flex-col items-center gap-3">
      {pic('light', 'block dark:hidden')}
      {pic('dark', 'hidden dark:block')}
      <figcaption className="text-center text-sm text-fd-muted-foreground">{alt}</figcaption>
    </figure>
  )
}
