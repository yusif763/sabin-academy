'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '@/components/admin/Header'
import ImageUpload from '@/components/admin/ImageUpload'
import { createCamp } from '@/actions/camps'
import { Save, ArrowLeft, Plus, X } from 'lucide-react'
import { Link } from '@/routing'

export default function NewCampPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        slug: '',
        year: new Date().getFullYear(),
        location: '',
        startDate: '',
        endDate: '',
        image: '',
        gallery: [] as string[],
        featured: false,
        active: true,
        spots: 30,
        price: '',
        ageRange: '',
        translations: {
            en: {
                title: '',
                description: '',
                activities: [''],
                includes: [''],
                highlights: ['']
            },
            az: {
                title: '',
                description: '',
                activities: [''],
                includes: [''],
                highlights: ['']
            },
            ru: {
                title: '',
                description: '',
                activities: [''],
                includes: [''],
                highlights: ['']
            }
        }
    })

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

            await createCamp({ ...formData, translations })
            router.push('/admin/camps')
        } catch (err: any) {
            setError(err.message || 'Failed to create camp')
        } finally {
            setLoading(false)
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
                [locale]: {
                    ...formData.translations[locale],
                    [field]: newItems
                }
            }
        })
    }

    return (
        <div>
            <AdminHeader title="Add New Summer Camp" />

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
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Slug (URL) *
                                </label>
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
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Year *
                                </label>
                                <input
                                    type="number"
                                    required
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Location *
                                </label>
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
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Age Range
                                </label>
                                <input
                                    type="text"
                                    value={formData.ageRange}
                                    onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    placeholder="12-17"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Start Date *
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    End Date *
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Price *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    placeholder="2500 EUR"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Available Spots
                                </label>
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

                                {/* Activities */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Activities</label>
                                    <div className="space-y-2">
                                        {formData.translations[locale].activities.map((activity, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={activity}
                                                    onChange={(e) => updateItem(locale, 'activities', index, e.target.value)}
                                                    className="flex-1 px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                    placeholder="Activity"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(locale, 'activities', index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => addItem(locale, 'activities')}
                                            className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center"
                                        >
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add Activity
                                        </button>
                                    </div>
                                </div>

                                {/* Includes */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">What&#39;s Included</label>
                                    <div className="space-y-2">
                                        {formData.translations[locale].includes.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={item}
                                                    onChange={(e) => updateItem(locale, 'includes', index, e.target.value)}
                                                    className="flex-1 px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                    placeholder="Included item"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(locale, 'includes', index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => addItem(locale, 'includes')}
                                            className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center"
                                        >
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add Item
                                        </button>
                                    </div>
                                </div>

                                {/* Highlights */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Highlights</label>
                                    <div className="space-y-2">
                                        {formData.translations[locale].highlights.map((highlight, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={highlight}
                                                    onChange={(e) => updateItem(locale, 'highlights', index, e.target.value)}
                                                    className="flex-1 px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                    placeholder="Highlight"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(locale, 'highlights', index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => addItem(locale, 'highlights')}
                                            className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center"
                                        >
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add Highlight
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Actions */}
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
                            <span>{loading ? 'Creating...' : 'Create Camp'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}