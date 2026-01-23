'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export default function LocaleShell({
                                        children,
                                        locale,
                                    }: {
    children: React.ReactNode
    locale: string
}) {
    const pathname = usePathname()

    // admin route-lar: /az/admin..., /en/admin...
    const isAdminRoute = pathname.startsWith(`/${locale}/admin`)

    if (isAdminRoute) {
        // ✅ admin-də yalnız admin layout görünsün
        return <>{children}</>
    }

    // ✅ public layout
    return (
        <div className="flex flex-col min-h-screen">
            <Navigation locale={locale} />
            <main className="flex-grow">{children}</main>
            <Footer locale={locale} />
        </div>
    )
}
