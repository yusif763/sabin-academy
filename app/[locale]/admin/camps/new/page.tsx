'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '@/components/admin/Header'
import ImageUpload from '@/components/admin/ImageUpload'
import { createCamp, addGalleryImage } from '@/actions/camps'
import { Save, ArrowLeft, Plus, X } from 'lucide-react'
import { Link } from '@/routing'

export default function NewCampPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState('')
    const [error, setError] = useState('')
    const [galleryImages, setGalleryImages] = useState<string[]>([])
    const [currentGalleryImage, setCurrentGalleryImage] = useState('')

    const [formData, setFormData] = useState({
        slug: '',
        year: new Date().getFullYear(),
        location: '',
        startDate: '',
        endDate: '',
        image: '',
        featured: false,
        active: true,
        spots: 30,
        price: '',
        ageRange: '',
        translations: {
            en: { title: '', description: '', activities: [''], includes: [''], highlights: [''] },
            az: { title: '', description: '', activities: [''], includes: [''], highlights: [''] },
            ru: { title: '', description: '', activities: [''], includes: [''], highlights: [''] }
        }
    })

    const handleAddGalleryImage = () => {
        if (!currentGalleryImage) return
        setGalleryImages(prev => [...prev, currentGalleryImage])
        setCurrentGalleryImage('')
    }

    const handleRemoveGalleryImage = (index: number) => {
        setGalleryImages(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // Step 1: Camp yarat
            setLoadingText('Creating camp...')
            const translations = [
                { locale: 'en', ...formData.translations.en },
                { locale: 'az', ...formData.translations.az },
                { locale: 'ru', ...formData.translations.ru }
            ]
            const camp = await createCamp({ ...formData, translations })
            console.log('Camp created:', camp.id)           // ← LOG
            console.log('Gallery images:', galleryImages)   // ← LOG
            // Step 2: Gallery şəkilləri əlavə et
            if (galleryImages.length > 0) {
                setLoadingText(`Uploading gallery (0/${galleryImages.length})...`)
                for (let i = 0; i < galleryImages.length; i++) {
                    setLoadingText(`Uploading gallery (${i + 1}/${galleryImages.length})...`)
                    await addGalleryImage(camp.id, galleryImages[i])
                }
            }

            // Step 3: Redirect
            setLoadingText('Done! Redirecting...')
            router.push('/admin/camps')
        } catch (err: any) {
            setError(err.message || 'Failed to create camp')
            setLoading(false)
            setLoadingText('')
        }
    }

    const addItem = (locale: 'en' | 'az' | 'ru', field: 'activities' | 'includes' | 'highlights') => {
        setFormData({
            ...formData,
            translations: {
                ...formData.translations,
                [locale]: {
                    ...formData.translations[locale],
                    [field]: [...formData.translations[locale][field], '']
                }
            }
        })
    }

    const removeItem = (locale: 'en' | 'az' | 'ru', field: 'activities' | 'includes' | 'highlights', index: number) => {
        setFormData({
            ...formData,
            translations: {
                ...formData.translations,
                [locale]: {
                    ...formData.translations[locale],
                    [field]: formData.translations[locale][field].filter((_, i) => i !== index)
                }
            }
        })
    }

    const updateItem = (locale: 'en' | 'az' | 'ru', field: 'activities' | 'includes' | 'highlights', index: number, value: string) => {
        const newItems = [...formData.translations[locale][field]]
        newItems[index] = value
        setFormData({
            ...formData,
            translations: {
                ...formData.translations,
                [locale]: { ...formData.translations[locale], [field]: newItems }
            }
        })
    }

    return (
        <div>
            <AdminHeader title="Add New Summer Camp" />

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm w-full mx-4">
                        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-lg font-semibold text-secondary-900 mb-1">Please wait...</p>
                        <p className="text-sm text-secondary-500">{loadingText}</p>
                    </div>
                </div>
            )}

            <div className="p-8">
                <div className="mb-6">
                    <Link href="/admin/camps" className="inline-flex items-center text-primary-600 hover:text-primary-700">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Camps
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="max-w-5xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                            {error}
                        </div>
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
                                    placeholder="london-2026"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Year *</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Location *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    placeholder="London, UK"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Age Range</label>
                                <input
                                    type="text"
                                    value={formData.ageRange}
                                    onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    placeholder="12-17"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Start Date *</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">End Date *</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Price</label>
                                <input
                                    type="text"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    placeholder="2500 EUR"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Available Spots</label>
                                <input
                                    type="number"
                                    value={formData.spots}
                                    onChange={(e) => setFormData({ ...formData, spots: parseInt(e.target.value) })}
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
                                    label="Camp Main Image"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gallery Section */}
                    <div className="bg-white rounded-xl border border-secondary-200 p-6 mb-6">
                        <h3 className="text-lg font-bold text-secondary-900 mb-4">
                            Gallery Images
                            <span className="ml-2 text-sm font-normal text-secondary-500">
                                ({galleryImages.length} images added)
                            </span>
                        </h3>

                        {/* ← DƏYİŞ: onChange-də birbaşa galleryImages-ə əlavə et */}
                        <ImageUpload
                            value=""
                            onChange={(url) => {
                                if (url) setGalleryImages(prev => [...prev, url])
                            }}
                            label="Upload Gallery Image"
                        />

                        {/* Preview grid */}
                        {galleryImages.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                {galleryImages.map((img, index) => (
                                    <div key={index} className="relative group aspect-square rounded-xl overflow-hidden bg-secondary-100">
                                        <img
                                            src={img}
                                            alt={`Gallery ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveGalleryImage(index)}
                                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-secondary-400 italic mt-3">
                                No gallery images yet. Upload images above.
                            </p>
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
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Description *</label>
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
                                {(['activities', 'includes', 'highlights'] as const).map((field) => (
                                    <div key={field}>
                                        <label className="block text-sm font-medium text-secondary-700 mb-2 capitalize">
                                            {field === 'includes' ? "What's Included" : field}
                                        </label>
                                        <div className="space-y-2">
                                            {formData.translations[locale][field].map((item, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        value={item}
                                                        onChange={(e) => updateItem(locale, field, index, e.target.value)}
                                                        className="flex-1 px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                        placeholder={field}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(locale, field, index)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => addItem(locale, field)}
                                                className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center"
                                            >
                                                <Plus className="w-4 h-4 mr-1" />
                                                Add {field === 'includes' ? 'Item' : field.slice(0, -1)}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center justify-end space-x-4">
                        <Link
                            href="/admin/camps"
                            className="px-6 py-2 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary inline-flex items-center space-x-2 disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            <span>Create Camp</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}