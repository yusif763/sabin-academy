'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '@/components/admin/Header'
import ImageUpload from '@/components/admin/ImageUpload'
import { createTeamMember } from '@/actions/team'
import { Save, ArrowLeft } from 'lucide-react'
import { Link } from '@/routing'

export default function NewTeamMemberPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        email: '',
        active: true,
        order: 0,
        translations: {
            en: { position: '', bio: '' },
            az: { position: '', bio: '' },
            ru: { position: '', bio: '' }
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.image) {
            setError('Ad və şəkil mütləqdir')
            return
        }
        setLoading(true)
        setError('')

        try {
            const translations = [
                { locale: 'en', ...formData.translations.en },
                { locale: 'az', ...formData.translations.az },
                { locale: 'ru', ...formData.translations.ru }
            ]
            await createTeamMember({ ...formData, translations })
            router.push('/admin/team')
        } catch (err: any) {
            setError(err.message || 'Komanda üzvü yaradılarkən xəta baş verdi')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <AdminHeader title="Yeni Komanda Üzvü" />

            <div className="p-8">
                <div className="mb-6">
                    <Link href="/admin/team" className="inline-flex items-center text-primary-600 hover:text-primary-700">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Komandaya Qayıt
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="max-w-5xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                            {error}
                        </div>
                    )}

                    {/* Photo */}
                    <div className="bg-white rounded-xl border border-secondary-200 p-6 mb-6">
                        <h3 className="text-lg font-bold text-secondary-900 mb-4">Şəkil</h3>
                        <ImageUpload
                            value={formData.image}
                            onChange={(url) => setFormData({ ...formData, image: url })}
                            label="Üzv Şəkli"
                        />
                    </div>

                    {/* General Info */}
                    <div className="bg-white rounded-xl border border-secondary-200 p-6 mb-6">
                        <h3 className="text-lg font-bold text-secondary-900 mb-4">Ümumi Məlumat</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Ad Soyad *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    placeholder="Ayşə Məmmədova"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Email (Opsional)
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    placeholder="ayse@example.com"
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
                                        Vəzifə *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.translations[locale].position}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            translations: {
                                                ...formData.translations,
                                                [locale]: { ...formData.translations[locale], position: e.target.value }
                                            }
                                        })}
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                        placeholder="Direktor / Director"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                                        Qısa Təqdimat (Opsional)
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={formData.translations[locale].bio}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            translations: {
                                                ...formData.translations,
                                                [locale]: { ...formData.translations[locale], bio: e.target.value }
                                            }
                                        })}
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                        placeholder="Təhsil, təcrübə və s."
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Settings */}
                    <div className="bg-white rounded-xl border border-secondary-200 p-6 mb-6">
                        <h3 className="text-lg font-bold text-secondary-900 mb-4">Parametrlər</h3>
                        <div className="flex items-center space-x-6 mb-4">
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
                        <div>
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

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-4">
                        <Link
                            href="/admin/team"
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
                            <span>{loading ? 'Saxlanılır...' : 'Saxla'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}