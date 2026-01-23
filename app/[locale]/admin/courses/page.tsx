import { prisma } from '@/lib/prisma'
import AdminHeader from '@/components/admin/Header'
import { Link } from '@/routing'
import { Plus, Edit, Trash2, Eye, Star } from 'lucide-react'

async function getCourses() {
    const courses = await prisma.course.findMany({
        include: {
            translations: {
                where: { locale: 'en' },
                take: 1
            }
        },
        orderBy: [
            { featured: 'desc' },
            { order: 'asc' }
        ]
    })
    return JSON.parse(JSON.stringify(courses))
}

export default async function CoursesAdminPage() {
    const courses = await getCourses()

    return (
        <div>
            <AdminHeader title="Courses Management" />

            <div className="p-8">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-secondary-900">All Courses</h2>
                        <p className="text-secondary-600 mt-1">{courses.length} total courses</p>
                    </div>
                    <Link
                        href="/admin/courses/new"
                        className="btn-primary inline-flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add New Course</span>
                    </Link>
                </div>

                {/* Courses Table */}
                <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-secondary-50 border-b border-secondary-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Course</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Slug</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Price</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Status</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-secondary-900">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary-100">
                        {courses.map((course: any) => {
                            const trans = course.translations[0]
                            return (
                                <tr key={course.id} className="hover:bg-secondary-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary-100 flex items-center justify-center text-2xl">
                                                {course.icon || '📚'}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-secondary-900">{trans?.title || 'Untitled'}</p>
                                                <p className="text-sm text-secondary-500 line-clamp-1">{trans?.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <code className="text-sm bg-secondary-100 px-2 py-1 rounded">{course.slug}</code>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-primary-600">{trans?.price || '-'}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            {course.featured && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Featured
                          </span>
                                            )}
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                                                course.active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                          {course.active ? 'Active' : 'Inactive'}
                        </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link
                                                href={`/courses/${course.slug}`}
                                                target="_blank"
                                                className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={`/admin/courses/${course.id}`}
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                    {courses.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="text-secondary-500">No courses yet. Create your first course!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}