import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { Logo } from '@/components/logo'
import { appName, community, gitConfig } from './shared'

export function baseOptions(lang: string): BaseLayoutProps {
  return {
    i18n: false,
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold">
          <Logo className="size-6 rounded-md" />
          {appName}
        </span>
      ),
      url: `/${lang}`,
    },
    links: [
      { text: 'Группа', url: community.group },
      { text: 'Чат', url: community.chat },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  }
}
