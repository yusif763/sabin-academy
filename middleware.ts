import createIntlMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routing } from './routing'

// next-intl middleware
const intlMiddleware = createIntlMiddleware(routing)

export function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl

    // Locale-i path-dən götür
    const locale = pathname.split('/')[1]
    const isLocaleValid = routing.locales.includes(locale as any)
    const currentLocale = isLocaleValid ? locale : routing.defaultLocale

    // Admin route yoxlaması
    const isAdminRoute = pathname.includes('/admin')
    const isLoginPage = pathname.includes('/admin/login')

    if (isAdminRoute && !isLoginPage) {
        const token = request.cookies.get('admin-token')?.value

        if (!token) {
            const loginUrl = request.nextUrl.clone()
            loginUrl.pathname = `/${currentLocale}/admin/login`
            loginUrl.searchParams.set('redirect', `${pathname}${search || ''}`)
            return NextResponse.redirect(loginUrl)
        }
    }

    // next-intl middleware - bütün digər route-lar üçün
    return intlMiddleware(request)
}

export const config = {
    matcher: [
        // next-intl üçün lazım olan matcher
        '/',
        '/(en|az|ru)/:path*',
        '/((?!api|_next|_vercel|.*\\..*).*)'
    ]
}