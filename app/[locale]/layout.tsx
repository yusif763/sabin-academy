import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/routing'
import { Toaster } from 'react-hot-toast'
import LocaleShell from './LocaleShell'

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
                                               children,
                                               params: { locale },
                                           }: {
    children: React.ReactNode
    params: { locale: string }
}) {
    let messages
    try {
        messages = (await import(`@/messages/${locale}.json`)).default
    } catch (error) {
        notFound()
    }

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <LocaleShell locale={locale}>
                {children}
            </LocaleShell>

            {/* toaster admin-də də işləsin deyə burada saxladım */}
            <Toaster position="top-right" />
        </NextIntlClientProvider>
    )
}
