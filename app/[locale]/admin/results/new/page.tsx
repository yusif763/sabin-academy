'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '@/components/admin/Header'
import ImageUpload from '@/components/admin/ImageUpload'
import { createResult } from '@/actions/results'
import { Save, ArrowLeft } from 'lucide-react'
import { Link } from '@/routing'

export default function NewResultPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        studentName: '',
        score: '',
        testType: '',
        image: '',
        featured: false,
        active: true,
        date: new Date().toISOString().split('T')[0],
        translations: {
            en: {
                testimonial: '',
                courseType: ''
            },
            az: {
                testimonial: '',
                courseType: ''
            },
            ru: {
                testimonial: '',
                courseType: ''
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

            await createResult({ ...formData, translations })
            router.push('/admin/results')
        } catch (err: any) {
            setError(err.message || 'Failed to create result')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <AdminHeader title="Add New Result" />

            <div className="p-8">
                <div className="mb-6">
                    <Link href="/admin/results" className="inline-flex items-center text-primary-600 hover:text-primary-700">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Results
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
                        <h3 className="text-lg font-bold text-secondary-900 mb-4">Student Information</h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Student Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.studentName}
                                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    placeholder="Aysel Məmmədova"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Score *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.score}
                                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    placeholder="8.5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Test Type *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.testType}
                                    onChange={(e) => setFormData({ ...formData, testType: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    placeholder="IELTS"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                                    label="Student Photo"
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
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        Course Type
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.translations[locale].courseType}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            translations: {
                                                ...formData.translations,
                                                [locale]: { ...formData.translations[locale], courseType: e.target.value }
                                            }
                                        })}
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                        placeholder="IELTS Preparation"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        Testimonial
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={formData.translations[locale].testimonial}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            translations: {
                                                ...formData.translations,
                                                [locale]: { ...formData.translations[locale], testimonial: e.target.value }
                                            }
                                        })}
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                        placeholder="Student's testimonial..."
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-4">
                        <Link
                            href="/admin/results"
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
                            <span>{loading ? 'Creating...' : 'Create Result'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}