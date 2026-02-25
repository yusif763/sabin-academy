'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateResult, deleteResult } from '@/actions/results'
import ImageUpload from '@/components/admin/ImageUpload'
import { Save, ArrowLeft, Trash2 } from 'lucide-react'
import { Link } from '@/routing'

export default function ResultEditForm({ result }: { result: any }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const CATEGORIES = [
        { key: 'IELTS', label: 'IELTS' },
        { key: 'DIM9', label: 'DIM 9' },
        { key: 'DIM11', label: 'DIM 11' },
        { key: 'CAMBRIDGE', label: 'Cambridge' },
    ]

    const [formData, setFormData] = useState({
        image: result.image || '',
        category: result.category || 'IELTS',
        note: result.note || '',
        active: result.active !== undefined ? result.active : true,
        order: result.order || 0
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.image) {
            setError('Zəhmət olmasa şəkil yükləyin')
            return
        }
        setLoading(true)
        setError('')

        try {
            await updateResult(result.id, formData)
            router.push('/admin/results')
        } catch (err: any) {
            setError(err.message || 'Nəticə yenilənərkən xəta baş verdi')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Bu şəkili silmək istədiyinizə əminsiniz?')) return

        setLoading(true)
        try {
            await deleteResult(result.id)
            router.push('/admin/results')
        } catch (err: any) {
            setError(err.message || 'Silinmə zamanı xəta baş verdi')
            setLoading(false)
        }
    }

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <Link href="/admin/results" className="inline-flex items-center text-primary-600 hover:text-primary-700">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Nəticələrə Qayıt
                </Link>
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={loading}
                    className="btn-outline border-red-600 text-red-600 hover:bg-red-50 inline-flex items-center space-x-2 disabled:opacity-50"
                >
                    <Trash2 className="w-5 h-5" />
                    <span>Sil</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-xl border border-secondary-200 p-6 mb-6">
                    <h3 className="text-lg font-bold text-secondary-900 mb-4">Şəkil</h3>

                    <ImageUpload
                        value={formData.image}
                        onChange={(url) => setFormData({ ...formData, image: url })}
                        label="Nəticə Şəkili"
                    />
                </div>

                <div className="bg-white rounded-xl border border-secondary-200 p-6 mb-6">
                    <h3 className="text-lg font-bold text-secondary-900 mb-4">Parametrlər</h3>

                    {/* Category */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Kateqoriya *
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.key}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: cat.key })}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                        formData.category === cat.key
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Note */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Qeyd (İsteğe bağlı)
                        </label>
                        <textarea
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                            className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            rows={3}
                            placeholder="Tələbə haqqında qeyd və ya şərh"
                        />
                    </div>

                    <div className="flex items-center space-x-6">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.active}
                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                className="w-4 h-4 text-primary-600"
                            />
                            <span className="text-sm font-medium text-secondary-700">Aktiv</span>
                        </label>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Sıra
                        </label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                            className="w-32 px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            min={0}
                        />
                        <p className="text-xs text-secondary-500 mt-1">Kiçik rəqəm əvvəl göstərilir</p>
                    </div>
                </div>

                <div className="flex items-center justify-end space-x-4">
                    <Link
                        href="/admin/results"
                        className="px-6 py-2 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors"
                    >
                        Ləğv et
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary inline-flex items-center space-x-2 disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        <span>{loading ? 'Yenilənir...' : 'Yadda saxla'}</span>
                    </button>
                </div>
            </form>
        </>
    )
}