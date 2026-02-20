'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    BookOpen,
    Tent,
    Trophy,
    Mail,
    Settings,
    LogOut,
    ChevronRight,
    LucideActivity,
    Users
} from 'lucide-react'

const menuItems = [
    { label: 'Dashboard', href: '/en/admin', icon: LayoutDashboard, exact: true },
    { label: 'Courses', href: '/en/admin/courses', icon: BookOpen },
    { label: 'Summer Camps', href: '/en/admin/camps', icon: Tent },
    { label: 'Activities', href: '/en/admin/activities', icon: LucideActivity },
    { label: 'Results', href: '/en/admin/results', icon: Trophy },
    { label: 'Team', href: '/en/admin/team', icon: Users },
    { label: 'Contacts', href: '/en/admin/contacts', icon: Mail },
    { label: 'Settings', href: '/en/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
    const pathname = usePathname()

    const isActive = (href: string, exact?: boolean) => {
        if (exact) return pathname === href
        return pathname?.startsWith(href)
    }

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        window.location.href = '/admin/login'
    }

    return (
        <aside className="w-64 bg-secondary-900 text-white min-h-screen fixed left-0 top-0 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-secondary-700">
                <Link href="/en" className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        S
                    </div>
                    <div>
                        <div className="font-bold text-lg">Sabina Academy</div>
                        <div className="text-xs text-secondary-400">Admin Panel</div>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6">
                <div className="px-3 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.href, item.exact)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all group
                  ${
                                    active
                                        ? 'bg-primary-500 text-white shadow-lg'
                                        : 'text-secondary-300 hover:bg-secondary-800 hover:text-white'
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <Icon
                                        className={`w-5 h-5 ${
                                            active
                                                ? 'text-white'
                                                : 'text-secondary-400 group-hover:text-white'
                                        }`}
                                    />
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                {active && <ChevronRight className="w-4 h-4" />}
                            </Link>
                        )
                    })}
                </div>
            </nav>

            {/* User Info */}
            <div className="p-4 border-t border-secondary-700">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                            A
                        </div>
                        <div>
                            <div className="font-medium text-sm">Admin User</div>
                            <div className="text-xs text-secondary-400">Administrator</div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-secondary-400 hover:text-white transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </aside>
    )
}
