import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const base = (p: P) => ({ className: 'i', viewBox: '0 0 24 24', 'aria-hidden': true, ...p })

export const IcoSearch = (p: P) => (<svg {...base(p)}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>)
export const IcoMenu = (p: P) => (<svg {...base(p)}><path d="M4 6h16M4 12h16M4 18h16" /></svg>)
export const IcoX = (p: P) => (<svg {...base(p)}><path d="M18 6 6 18M6 6l12 12" /></svg>)
export const IcoSun = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>)
export const IcoMoon = (p: P) => (<svg {...base(p)}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>)
export const IcoMonitor = (p: P) => (<svg {...base(p)}><rect width="20" height="14" x="2" y="3" rx="2" /><path d="M8 21h8M12 17v4" /></svg>)
export const IcoChev = (p: P) => (<svg {...base(p)}><path d="m9 18 6-6-6-6" /></svg>)
export const IcoLeft = (p: P) => (<svg {...base(p)}><path d="m12 19-7-7 7-7M19 12H5" /></svg>)
export const IcoRight = (p: P) => (<svg {...base(p)}><path d="M5 12h14M12 5l7 7-7 7" /></svg>)
export const IcoToc = (p: P) => (<svg {...base(p)}><path d="M15 12H3M17 18H3M21 6H3" /></svg>)
export const IcoTerm = (p: P) => (<svg {...base(p)}><path d="m4 17 6-6-6-6" /><path d="M12 19h8" /></svg>)
export const IcoFile = (p: P) => (<svg {...base(p)}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>)
export const IcoCopy = (p: P) => (<svg {...base(p)}><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>)
export const IcoCheck = (p: P) => (<svg {...base(p)}><path d="M20 6 9 17l-5-5" /></svg>)
export const IcoInfo = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>)
export const IcoWarn = (p: P) => (<svg {...base(p)}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4M12 17h.01" /></svg>)

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <rect width="512" height="512" rx="112" fill="#0b1020" />
      <g transform="translate(96 96) scale(13.33)" fill="none" stroke="#14b8a6" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
        <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
      </g>
    </svg>
  )
}
