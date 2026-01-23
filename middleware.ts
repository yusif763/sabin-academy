
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routing } from './routing'

export function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl

    // 1) locale-i path-dən götür (/:locale/...)
    const locale = pathname.split('/')[1]
    const isLocaleValid = routing.locales.includes(locale as any)

    // locale yoxdursa / defaultLocale ilə yönləndir (istəsən bunu çıxarda bilərsən)
    if (!isLocaleValid) {
        const url = request.nextUrl.clone()
        url.pathname = `/en/${pathname}`
        return NextResponse.redirect(url)
    }

    // 2) Admin route-dadır?
    const isAdminRoute = pathname.startsWith(`/${locale}/admin`)

    // 3) Login səhifəsidirsə, auth yoxlamasını KEÇ (yoxsa loop olacaq)
    const isLoginPage = pathname === `/${locale}/admin/login`

    if (isAdminRoute && !isLoginPage) {
        const token = request.cookies.get('admin-token')?.value

        if (!token) {
            // istifadəçinin istədiyi route-u redirect param kimi saxla
            const loginUrl = request.nextUrl.clone()
            loginUrl.pathname = `/${locale}/admin/login`
            loginUrl.searchParams.set('redirect', `${pathname}${search || ''}`)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/:locale/admin/:path*'],
}
