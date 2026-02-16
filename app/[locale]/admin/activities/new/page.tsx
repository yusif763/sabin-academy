'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '@/components/admin/Header'
import ImageUpload from '@/components/admin/ImageUpload'
import { createActivity, addActivityImage } from '@/actions/activities'
import { Save, ArrowLeft, Plus, X } from 'lucide-react'
import { Link } from '@/routing'

export default function NewActivityPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [galleryImages, setGalleryImages] = useState<{ image: string; caption: string }[]>([])
    const [currentImage, setCurrentImage] = useState('')
    const [currentCaption, setCurrentCaption] = useState('')

    const [formData, setFormData] = useState({
        slug: '',
        image: '',
        featured: false,
        active: true,
        order: 0,
        translations: {
            en: { title: '', description: '', content: '' },
            az: { title: '', description: '', content: '' },
            ru: { title: '', description: '', content: '' }
        }
    })

    const handleAddImage = () => {
        if (!currentImage) return
        setGalleryImages(prev => [...prev, { image: currentImage, caption: currentCaption }])
        setCurrentImage('')
        setCurrentCaption('')
    }

    const handleRemoveImage = (index: number) => {
        setGalleryImages(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const translations = [
                { locale: 'en', ...formData.translations.en },
                { locale: 'az', ...formData.translations.az },
                { locale: 'ru', ...formData.translations.ru }
            ]

            const activity = await createActivity({ ...formData, translations })

            if (galleryImages.length > 0) {
                await Promise.all(
                    galleryImages.map(({ image, caption }) =>
                        addActivityImage(activity.id, image, caption)
                    )
                )
            }

            router.push('/admin/activities')
        } catch (err: any) {
            setError(err.message || 'Failed to create activity')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <AdminHeader title="Add New Activity" />
            <div className="p-8">
                <div className="mb-6">
                    <Link href="/admin/activities" className="inline-flex items-center text-primary-600 hover:text-primary-700">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Activities
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="max-w-5xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">{error}</div>
                    )}

                    {/* General Info */}
                    <div className="bg-white rounded-xl border border-secondary-200 p-6 mb-6">
                        <h3 className="text-lg font-bold text-secondary-900 mb-4">General Information</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Slug (URL) *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    placeholder="swimming-lessons"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="flex items-center space-x-6">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-4 h-4 text-primary-600"
                                    />
                                    <span className="text-sm font-medium text-secondary-700">Featured</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.active}
                                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                        className="w-4 h-4 text-primary-600"
                                    />
                                    <span className="text-sm font-medium text-secondary-700">Active</span>
                                </label>
                            </div>
                            <div className="md:col-span-2">
                                <ImageUpload
                                    value={formData.image}
                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                    label="Main Image"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gallery Images */}
                    <div className="bg-white rounded-xl border border-secondary-200 p-6 mb-6">
                        <h3 className="text-lg font-bold text-secondary-900 mb-4">
                            Gallery Images
                            <span className="ml-2 text-sm font-normal text-secondary-500">({galleryImages.length} images)</span>
                        </h3>

                        <div className="space-y-4 mb-4">
                            <ImageUpload
                                value={currentImage}
                                onChange={setCurrentImage}
                                label="Upload Image"
                            />
                            {currentImage && (
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        value={currentCaption}
                                        onChange={(e) => setCurrentCaption(e.target.value)}
                                        className="flex-1 px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                        placeholder="Caption (optional)"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddImage}
                                        className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm font-medium"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Add</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {galleryImages.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {galleryImages.map((img, index) => (
                                    <div key={index} className="relative group">
                                        <div className="aspect-square rounded-xl overflow-hidden bg-secondary-100">
                                            <img src={img.image} alt={img.caption || `Image ${index + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                        {img.caption && (
                                            <p className="text-xs text-secondary-600 mt-1 text-center truncate">{img.caption}</p>
                                        )}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Translations */}
                    {(['en', 'az', 'ru'] as const).map((locale) => (
                        <div key={locale} className="bg-white rounded-xl border border-secondary-200 p-6 mb-6">
                            <h3 className="text-lg font-bold text-secondary-900 mb-4">
                                {locale === 'en' ? '🇬🇧 English' : locale === 'az' ? '🇦🇿 Azərbaycan' : '🇷🇺 Русский'}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.translations[locale].title}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            translations: {
                                                ...formData.translations,
                                                [locale]: { ...formData.translations[locale], title: e.target.value }
                                            }
                                        })}
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Short Description *</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.translations[locale].description}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            translations: {
                                                ...formData.translations,
                                                [locale]: { ...formData.translations[locale], description: e.target.value }
                                            }
                                        })}
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Full Content (HTML)</label>
                                    <textarea
                                        rows={8}
                                        value={formData.translations[locale].content}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            translations: {
                                                ...formData.translations,
                                                [locale]: { ...formData.translations[locale], content: e.target.value }
                                            }
                                        })}
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                                        placeholder="<p>Full content here...</p>"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center justify-end space-x-4">
                        <Link href="/admin/activities" className="px-6 py-2 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary inline-flex items-center space-x-2 disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            <span>{loading ? 'Creating...' : 'Create Activity'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}