'use client'

import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/Header'
import { Link } from '@/routing'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Image from 'next/image'
import { getAllResults, deleteResult } from '@/actions/results'
import { useRouter } from 'next/navigation'

export default function ResultsAdminPage() {
    const router = useRouter()
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    useEffect(() => {
        loadResults()
    }, [])

    async function loadResults() {
        setLoading(true)
        const data = await getAllResults()
        setResults(data)
        setLoading(false)
    }

    async function handleDelete(id: string) {
        if (!confirm('Bu şəkili silmək istədiyinizə əminsiniz?')) return
        setDeletingId(id)
        try {
            await deleteResult(id)
            setResults((prev) => prev.filter((r) => r.id !== id))
        } catch (err) {
            alert('Silinmə zamanı xəta baş verdi')
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div>
            <AdminHeader title="Nəticələr" />

            <div className="p-8">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-secondary-900">Bütün Nəticələr</h2>
                        <p className="text-secondary-600 mt-1">{results.length} şəkil</p>
                    </div>
                    <Link
                        href="/admin/results/new"
                        className="btn-primary inline-flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Yeni Şəkil Əlavə Et</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-secondary-100 rounded-xl h-64 animate-pulse" />
                        ))}
                    </div>
                ) : results.length === 0 ? (
                    <div className="bg-white rounded-xl border border-secondary-200 p-12 text-center">
                        <p className="text-secondary-500">Hələ nəticə yoxdur. İlk şəkili əlavə edin!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {results.map((result: any) => (
                            <div
                                key={result.id}
                                className="bg-white rounded-xl border border-secondary-200 overflow-hidden hover:shadow-lg transition-shadow group"
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden bg-secondary-100">
                                    <Image
                                        src={result.image}
                                        alt="Result"
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        unoptimized
                                    />
                                    {/* Status badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                                            result.active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {result.active ? 'Aktiv' : 'Deaktiv'}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-4 flex items-center justify-between">
                                    <p className="text-xs text-secondary-400">
                                        {new Date(result.createdAt).toLocaleDateString('az-AZ')}
                                    </p>
                                    <div className="flex items-center space-x-1">
                                        <Link
                                            href="/results"
                                            target="_blank"
                                            className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                                            title="Bax"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/results/${result.id}`}
                                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                            title="Redaktə et"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(result.id)}
                                            disabled={deletingId === result.id}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                            title="Sil"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}