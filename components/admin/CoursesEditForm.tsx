'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCourse, deleteCourse } from '@/actions/courses'
import { Save, ArrowLeft, Plus, X, Trash2 } from 'lucide-react'
import { Link } from '@/routing'
import ImageUpload from "@/components/admin/ImageUpload";

export default function CourseEditForm({ course }: { course: any }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState(() => {
        const translations = {
            en: { title: '', description: '', highlights: [''], duration: '', price: '', schedule: '' },
            az: { title: '', description: '', highlights: [''], duration: '', price: '', schedule: '' },
            ru: { title: '', description: '', highlights: [''], duration: '', price: '', schedule: '' }
        }

        course.translations.forEach((t: any) => {
            if (translations[t.locale as 'en' | 'az' | 'ru']) {
                translations[t.locale as 'en' | 'az' | 'ru'] = {
                    title: t.title || '',
                    description: t.description || '',
                    highlights: t.highlights?.length > 0 ? t.highlights : [''],
                    duration: t.duration || '',
                    price: t.price || '',
                    schedule: t.schedule || ''
                }
            }
        })

        return {
            slug: course.slug || '',
            image: course.image || '',
            icon: course.icon || '📚',
            featured: course.featured || false,
            active: course.active !== undefined ? course.active : true,
            order: course.order || 0,
            translations
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

            await updateCourse(course.id, { ...formData, translations })
            router.push('/en/admin/courses')
        } catch (err: any) {
            setError(err.message || 'Failed to update course')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this course?')) return

        setLoading(true)
        try {
            await deleteCourse(course.id)
            router.push('/en/admin/courses')
        } catch (err: any) {
            setError(err.message || 'Failed to delete course')
            setLoading(false)
        }
    }

    const addHighlight = (locale: 'en' | 'az' | 'ru') => {
        setFormData({
            ...formData,
            translations: {
                ...formData.translations,
                [locale]: {
                    ...formData.translations[locale],
                    highlights: [...formData.translations[locale].highlights, '']
                }
            }
        })
    }

    const removeHighlight = (locale: 'en' | 'az' | 'ru', index: number) => {
        setFormData({
            ...formData,
            translations: {
                ...formData.translations,
                [locale]: {
                    ...formData.translations[locale],
                    highlights: formData.translations[locale].highlights.filter((_, i) => i !== index)
                }
            }
        })
    }

    const updateHighlight = (locale: 'en' | 'az' | 'ru', index: number, value: string) => {
        const newHighlights = [...formData.translations[locale].highlights]
        newHighlights[index] = value
        setFormData({
            ...formData,
            translations: {
                ...formData.translations,
                [locale]: {
                    ...formData.translations[locale],
                    highlights: newHighlights
                }
            }
        })
    }

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <Link href="/en/admin/courses" className="inline-flex items-center text-primary-600 hover:text-primary-700">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Courses
                </Link>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="btn-outline border-red-600 text-red-600 hover:bg-red-50 inline-flex items-center space-x-2"
                >
                    <Trash2 className="w-5 h-5" />
                    <span>Delete Course</span>
                </button>
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
                            <label className="block text-sm font-medium text-secondary-700 mb-2">Slug *</label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-2">Icon</label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <ImageUpload
                                value={formData.image}
                                onChange={(url) => setFormData({ ...formData, image: url })}
                                label="Course Image"
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

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Highlights</label>
                                <div className="space-y-2">
                                    {formData.translations[locale].highlights.map((highlight, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={highlight}
                                                onChange={(e) => updateHighlight(locale, index, e.target.value)}
                                                className="flex-1 px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeHighlight(locale, index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addHighlight(locale)}
                                        className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add Highlight
                                    </button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Duration</label>
                                    <input
                                        type="text"
                                        value={formData.translations[locale].duration}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            translations: {
                                                ...formData.translations,
                                                [locale]: { ...formData.translations[locale], duration: e.target.value }
                                            }
                                        })}
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Price</label>
                                    <input
                                        type="text"
                                        value={formData.translations[locale].price}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            translations: {
                                                ...formData.translations,
                                                [locale]: { ...formData.translations[locale], price: e.target.value }
                                            }
                                        })}
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Schedule</label>
                                    <input
                                        type="text"
                                        value={formData.translations[locale].schedule}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            translations: {
                                                ...formData.translations,
                                                [locale]: { ...formData.translations[locale], schedule: e.target.value }
                                            }
                                        })}
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Actions */}
                <div className="flex items-center justify-end space-x-4">
                    <Link
                        href="/en/admin/courses"
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
                        <span>{loading ? 'Updating...' : 'Update Course'}</span>
                    </button>
                </div>
            </form>
        </>
    )
}