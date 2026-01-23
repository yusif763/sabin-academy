'use client'

import { Bell, Search } from 'lucide-react'

export default function AdminHeader({ title }: { title: string }) {
    return (
        <header className="bg-white border-b border-secondary-200 px-8 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
                {/* Title */}
                <div>
                    <h1 className="text-2xl font-bold text-secondary-900">{title}</h1>
                    <p className="text-sm text-secondary-500 mt-1">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <Search className="w-5 h-5 text-secondary-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </div>
            </div>
        </header>
    )
}