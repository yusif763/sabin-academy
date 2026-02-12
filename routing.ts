import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
    locales: ['en', 'az', 'ru'],
    defaultLocale: 'en',
    localePrefix: 'always' // ← bu qalır
})

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)