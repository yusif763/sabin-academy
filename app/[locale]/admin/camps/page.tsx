import { prisma } from '@/lib/prisma'
import AdminHeader from '@/components/admin/Header'
import { Link } from '@/routing'
import { Plus, Edit, Trash2, Eye, Star, Calendar } from 'lucide-react'
import Image from "next/image";

async function getCamps() {
    const camps = await prisma.summerCamp.findMany({
        include: {
            translations: {
                where: { locale: 'en' },
                take: 1
            }
        },
        orderBy: [
            { featured: 'desc' },
            { year: 'desc' }
        ]
    })
    return JSON.parse(JSON.stringify(camps))
}

export default async function CampsAdminPage() {
    const camps = await getCamps()

    return (
        <div>
            <AdminHeader title="Summer Camps Management" />

            <div className="p-8">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-secondary-900">All Summer Camps</h2>
                        <p className="text-secondary-600 mt-1">{camps.length} total camps</p>
                    </div>
                    <Link
                        href="/admin/camps/new"
                        className="btn-primary inline-flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add New Camp</span>
                    </Link>
                </div>

                {/* Camps Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {camps.map((camp: any) => {
                        const trans = camp.translations[0]
                        return (
                            <div key={camp.id} className="bg-white rounded-xl border border-secondary-200 overflow-hidden hover:shadow-lg transition-shadow">
                                {/* Image */}
                                {camp.image && (
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={camp.image}
                                            alt={trans?.title}
                                            fill
                                            className="w-full h-full object-cover"
                                        />
                                        {camp.featured && (
                                            <div className="absolute top-4 right-4 bg-yellow-400 text-secondary-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                                                <Star className="w-3 h-3 mr-1 fill-current" />
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      <Calendar className="w-3 h-3 mr-1" />
                        {camp.year}
                    </span>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                                            camp.active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                      {camp.active ? 'Active' : 'Inactive'}
                    </span>
                                    </div>

                                    <h3 className="font-bold text-lg text-secondary-900 mb-2">
                                        {trans?.title || 'Untitled'}
                                    </h3>
                                    <p className="text-sm text-secondary-600 mb-3">
                                        📍 {camp.location}
                                    </p>
                                    <p className="text-sm text-secondary-500 line-clamp-2 mb-4">
                                        {trans?.description}
                                    </p>

                                    <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-secondary-600">
                      {new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}
                    </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
                                        <span className="font-bold text-primary-600">{camp.price}</span>
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                href={`/camps/${camp.slug}`}
                                                target="_blank"
                                                className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={`/admin/camps/${camp.id}`}
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
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {camps.length === 0 && (
                    <div className="bg-white rounded-xl border border-secondary-200 p-12 text-center">
                        <p className="text-secondary-500">No camps yet. Create your first summer camp!</p>
                    </div>
                )}
            </div>
        </div>
    )
}