import { prisma } from '@/lib/prisma'
import AdminHeader from '@/components/admin/Header'
import StatsCard from '@/components/admin/StatsCard'
import { BookOpen, Tent, Trophy, Mail } from 'lucide-react'
import { Link } from '@/routing'

async function getStats() {
    const [
        totalCourses,
        activeCourses,
        totalCamps,
        activeCamps,
        totalResults,
        totalContacts,
        unreadContacts
    ] = await Promise.all([
        prisma.course.count(),
        prisma.course.count({ where: { active: true } }),
        prisma.summerCamp.count(),
        prisma.summerCamp.count({ where: { active: true } }),
        prisma.result.count(),
        prisma.contact.count(),
        prisma.contact.count({ where: { read: false } })
    ])

    return {
        totalCourses,
        activeCourses,
        totalCamps,
        activeCamps,
        totalResults,
        totalContacts,
        unreadContacts
    }
}

export default async function AdminDashboard() {
    const stats = await getStats()

    return (
        <div>
            <AdminHeader title="Dashboard" />

            <div className="p-8">
                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Courses"
                        value={stats.totalCourses}
                        icon={BookOpen}
                        color="blue"
                        trend={{ value: `${stats.activeCourses} active`, isPositive: true }}
                    />
                    <StatsCard
                        title="Summer Camps"
                        value={stats.totalCamps}
                        icon={Tent}
                        color="green"
                        trend={{ value: `${stats.activeCamps} active`, isPositive: true }}
                    />
                    <StatsCard
                        title="Student Results"
                        value={stats.totalResults}
                        icon={Trophy}
                        color="orange"
                    />
                    <StatsCard
                        title="Contact Messages"
                        value={stats.totalContacts}
                        icon={Mail}
                        color="purple"
                        trend={{ value: `${stats.unreadContacts} unread`, isPositive: stats.unreadContacts === 0 }}
                    />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-secondary-200 p-6 mb-8">
                    <h2 className="text-xl font-bold text-secondary-900 mb-4">Quick Actions</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Link
                            href="/admin/courses/new"
                            className="p-4 border-2 border-dashed border-secondary-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
                        >
                            <BookOpen className="w-8 h-8 text-secondary-400 group-hover:text-primary-500 mb-2" />
                            <h3 className="font-semibold text-secondary-900">Add New Course</h3>
                            <p className="text-sm text-secondary-600">Create a new course offering</p>
                        </Link>

                        <Link
                            href="/admin/camps/new"
                            className="p-4 border-2 border-dashed border-secondary-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
                        >
                            <Tent className="w-8 h-8 text-secondary-400 group-hover:text-green-500 mb-2" />
                            <h3 className="font-semibold text-secondary-900">Add Summer Camp</h3>
                            <p className="text-sm text-secondary-600">Create new camp program</p>
                        </Link>

                        <Link
                            href="/admin/results/new"
                            className="p-4 border-2 border-dashed border-secondary-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group"
                        >
                            <Trophy className="w-8 h-8 text-secondary-400 group-hover:text-orange-500 mb-2" />
                            <h3 className="font-semibold text-secondary-900">Add Result</h3>
                            <p className="text-sm text-secondary-600">Add student achievement</p>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl border border-secondary-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-secondary-900">Recent Courses</h2>
                            <Link href="/admin/courses" className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                                View All →
                            </Link>
                        </div>
                        <RecentCourses />
                    </div>

                    <div className="bg-white rounded-xl border border-secondary-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-secondary-900">Recent Messages</h2>
                            <Link href="/admin/contacts" className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                                View All →
                            </Link>
                        </div>
                        <RecentContacts />
                    </div>
                </div>
            </div>
        </div>
    )
}

async function RecentCourses() {
    const courses = await prisma.course.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            translations: {
                where: { locale: 'en' },
                take: 1
            }
        }
    })

    if (courses.length === 0) {
        return <p className="text-secondary-500 text-sm">No courses yet</p>
    }

    return (
        <div className="space-y-3">
            {courses.map(course => (
                <div key={course.id} className="flex items-center justify-between py-2 border-b border-secondary-100 last:border-0">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-xl">
                            {course.icon || '📚'}
                        </div>
                        <div>
                            <p className="font-medium text-secondary-900">{course.translations[0]?.title || 'Untitled'}</p>
                            <p className="text-xs text-secondary-500">
                                {course.featured ? '⭐ Featured' : 'Regular'}
                            </p>
                        </div>
                    </div>
                    <Link
                        href={`/admin/courses/${course.id}`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                        Edit
                    </Link>
                </div>
            ))}
        </div>
    )
}

async function RecentContacts() {
    const contacts = await prisma.contact.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    })

    if (contacts.length === 0) {
        return <p className="text-secondary-500 text-sm">No messages yet</p>
    }

    return (
        <div className="space-y-3">
            {contacts.map(contact => (
                <div key={contact.id} className="py-2 border-b border-secondary-100 last:border-0">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className="font-medium text-secondary-900">{contact.name}</p>
                            <p className="text-sm text-secondary-600 line-clamp-1">{contact.message}</p>
                            <p className="text-xs text-secondary-400 mt-1">
                                {new Date(contact.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        {!contact.read && (
                            <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}