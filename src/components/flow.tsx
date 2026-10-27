import { ArrowRight } from 'lucide-react'

function Node({ label, title, note, accent }: { label?: string; title: string; note?: string; accent?: boolean }) {
  return (
    <div
      className={`min-w-0 rounded-xl border p-3 leading-snug ${accent ? 'border-fd-primary bg-fd-primary/10' : 'border-fd-border bg-fd-card'}`}
    >
      {label && <div className="mb-1 text-[0.7rem] uppercase tracking-wider text-fd-muted-foreground">{label}</div>}
      <div className={`text-sm font-semibold ${accent ? 'text-fd-primary' : 'text-fd-foreground'}`}>{title}</div>
      {note && <div className="mt-0.5 break-words text-xs text-fd-muted-foreground">{note}</div>}
    </div>
  )
}

function Arrow() {
  return (
    <div className="grid place-items-center text-fd-muted-foreground max-sm:rotate-90">
      <ArrowRight className="size-5" />
    </div>
  )
}

// Путь запроса подписки: клиент → реверс-прокси → прослойка → панель и страница подписки.
export function Flow() {
  return (
    <div className="not-prose my-6 grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1.1fr]">
      <Node label="Клиент" title="VPN-приложение или браузер" />
      <Arrow />
      <Node label="HTTPS" title="Реверс-прокси" note="sub.example.com" />
      <Arrow />
      <Node title="Прослойка" note="и её дополнительные функции" accent />
      <Arrow />
      <div className="grid gap-2">
        <Node label="API" title="Панель Remnawave" />
        <Node label="для браузера" title="Страница подписки" />
      </div>
    </div>
  )
}
