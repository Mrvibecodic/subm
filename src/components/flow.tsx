import { IcoRight } from '@/components/icons'

function Arr() {
  return (
    <div className="arr">
      <IcoRight />
    </div>
  )
}

// Путь запроса подписки: клиент → реверс-прокси → прослойка → панель и страница подписки.
export function Flow() {
  return (
    <div className="flow" role="img" aria-label="Клиент → реверс-прокси → прослойка → панель и страница подписки">
      <div className="node">
        <small>Клиент</small>
        <b>VPN-приложение или браузер</b>
      </div>
      <Arr />
      <div className="node">
        <small>HTTPS</small>
        <b>Реверс-прокси</b>
        <span>sub.example.com</span>
      </div>
      <Arr />
      <div className="node me">
        <b>Прослойка</b>
        <span>и её дополнительные функции</span>
      </div>
      <Arr />
      <div className="stack">
        <div className="node">
          <small>API</small>
          <b>Панель Remnawave</b>
        </div>
        <div className="node">
          <small>для браузера</small>
          <b>Страница подписки</b>
        </div>
      </div>
    </div>
  )
}
