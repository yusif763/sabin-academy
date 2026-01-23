import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    color: 'blue' | 'green' | 'orange' | 'purple' | 'red'
    trend?: {
        value: string
        isPositive: boolean
    }
}

const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
    red: 'bg-red-100 text-red-600',
}

export default function StatsCard({ title, value, icon: Icon, color, trend }: StatsCardProps) {
    return (
        <div className="bg-white rounded-xl border border-secondary-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-secondary-600 mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-secondary-900 mb-2">{value}</h3>
                    {trend && (
                        <p className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.isPositive ? '↑' : '↓'} {trend.value}
                        </p>
                    )}
                </div>
                <div className={`w-14 h-14 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
                    <Icon className="w-7 h-7" />
                </div>
            </div>
        </div>
    )
}