import { prisma } from '@/lib/prisma'
import AdminHeader from '@/components/admin/Header'
import { Link } from '@/routing'
import { Plus, Edit, Trash2, Eye, Star } from 'lucide-react'
import Image from "next/image"

async function getResults() {
    const results = await prisma.result.findMany({
        include: {
            translations: {
                where: { locale: 'en' },
                take: 1
            }
        },
        orderBy: [
            { featured: 'desc' },
            { date: 'desc' }
        ]
    })
    return JSON.parse(JSON.stringify(results))
}

export default async function ResultsAdminPage() {
    const results = await getResults()

    return (
        <div>
            <AdminHeader title="Student Results Management" />

            <div className="p-8">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-secondary-900">All Results</h2>
                        <p className="text-secondary-600 mt-1">{results.length} total student results</p>
                    </div>
                    <Link
                        href="/admin/results/new"
                        className="btn-primary inline-flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add New Result</span>
                    </Link>
                </div>

                {/* Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.map((result: any) => {
                        const trans = result.translations[0]
                        return (
                            <div key={result.id} className="bg-white rounded-xl border border-secondary-200 overflow-hidden hover:shadow-lg transition-shadow">
                                {/* Image */}
                                {result.image && (
                                    <div className="relative h-48 overflow-hidden bg-secondary-100">
                                        <Image
                                            src={result.image}
                                            alt={result.studentName}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            unoptimized
                                        />
                                        {result.featured && (
                                            <div className="absolute top-4 right-4 bg-yellow-400 text-secondary-900 px-3 py-1 rounded-full text-xs font-bold flex items-center z-10">
                                                <Star className="w-3 h-3 mr-1 fill-current" />
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                                            result.active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {result.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-lg text-secondary-900 mb-2">
                                        {result.studentName}
                                    </h3>

                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="bg-gradient-to-r from-green-100 to-green-50 px-4 py-2 rounded-lg">
                                            <span className="font-bold text-green-600 text-2xl">{result.score}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-secondary-700">{result.testType}</p>
                                            <p className="text-xs text-secondary-500">
                                                {new Date(result.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    {trans?.courseType && (
                                        <p className="text-xs text-secondary-600 mb-3 bg-secondary-50 px-3 py-1 rounded-full inline-block">
                                            {trans.courseType}
                                        </p>
                                    )}

                                    {trans?.testimonial && (
                                        <p className="text-sm text-secondary-600 italic line-clamp-2 mb-4 border-l-2 border-primary-500 pl-3">
                                            &quot;{trans.testimonial}&quot;
                                        </p>
                                    )}

                                    <div className="flex items-center justify-end space-x-2 pt-4 border-t border-secondary-100">
                                        <Link
                                            href="/results"
                                            target="_blank"
                                            className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                                            title="View"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/results/${result.id}`}
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
                        )
                    })}
                </div>

                {results.length === 0 && (
                    <div className="bg-white rounded-xl border border-secondary-200 p-12 text-center">
                        <p className="text-secondary-500">No results yet. Add your first student result!</p>
                    </div>
                )}
            </div>
        </div>
    )
}