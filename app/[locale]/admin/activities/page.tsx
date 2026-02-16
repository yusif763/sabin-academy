import { prisma } from '@/lib/prisma'
import AdminHeader from '@/components/admin/Header'
import { Link } from '@/routing'
import { Plus, Edit, Trash2, Eye, Star } from 'lucide-react'

async function getActivities() {
    const activities = await prisma.activity.findMany({
        include: {
            translations: { where: { locale: 'en' }, take: 1 },
            images: true
        },
        orderBy: [{ featured: 'desc' }, { order: 'asc' }]
    })
    return JSON.parse(JSON.stringify(activities))
}

export default async function ActivitiesAdminPage() {
    const activities = await getActivities()

    return (
        <div>
            <AdminHeader title="Activities Management" />
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-secondary-900">All Activities</h2>
                        <p className="text-secondary-600 mt-1">{activities.length} total activities</p>
                    </div>
                    <Link href="/admin/activities/new" className="btn-primary inline-flex items-center space-x-2">
                        <Plus className="w-5 h-5" />
                        <span>Add New Activity</span>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activities.map((activity: any) => {
                        const trans = activity.translations[0]
                        return (
                            <div key={activity.id} className="bg-white rounded-xl border border-secondary-200 overflow-hidden hover:shadow-lg transition-shadow">
                                {activity.image && (
                                    <div className="relative h-48 overflow-hidden bg-secondary-100">
                                        <img
                                            src={activity.image}
                                            alt={trans?.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {activity.featured && (
                                            <div className="absolute top-4 right-4 bg-yellow-400 text-secondary-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                                                <Star className="w-3 h-3 mr-1 fill-current" />
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        activity.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {activity.active ? 'Active' : 'Inactive'}
                    </span>
                                        <span className="text-xs text-secondary-500">{activity.images.length} images</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-secondary-900 mb-2">{trans?.title || 'Untitled'}</h3>
                                    <p className="text-sm text-secondary-600 line-clamp-2 mb-4">{trans?.description}</p>
                                    <div className="flex items-center justify-end space-x-2 pt-4 border-t border-secondary-100">
                                        <Link
                                            href={`/activities/${activity.slug}`}
                                            target="_blank"
                                            className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/activities/${activity.id}`}
                                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {activities.length === 0 && (
                    <div className="bg-white rounded-xl border border-secondary-200 p-12 text-center">
                        <p className="text-secondary-500">No activities yet. Create your first one!</p>
                    </div>
                )}
            </div>
        </div>
    )
}