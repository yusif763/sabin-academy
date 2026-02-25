'use client'

import { useState } from 'react'
import { updateSetting } from '@/actions/settings'
import ImageUpload from '@/components/admin/ImageUpload'
import { Save } from 'lucide-react'

const SETTINGS_CONFIG = [
    {
        key: 'hero_image',
        label: 'Ana Səhifə Hero Şəkli',
        type: 'image',
        description: 'Ana səhifədə göstəriləcək əsas şəkil',
        default: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800'
    },
]

export default function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [settings, setSettings] = useState<Record<string, string>>(initialSettings)
    const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({})

    const handleImageChange = (key: string, url: string) => {
        setSettings({ ...settings, [key]: url })
        setPendingChanges({ ...pendingChanges, [key]: url })
    }

    const handleSave = async (key: string) => {
        if (!pendingChanges[key]) return

        setLoading(true)
        setError('')
        setSuccess('')

        try {
            await updateSetting(key, pendingChanges[key])
            const newPending = { ...pendingChanges }
            delete newPending[key]
            setPendingChanges(newPending)
            setSuccess('Parametr uğurla yadda saxlanıldı')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: any) {
            setError(err.message || 'Xəta baş verdi')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    {success}
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    {error}
                </div>
            )}

            {SETTINGS_CONFIG.map((config) => (
                <div key={config.key} className="bg-white rounded-xl border border-secondary-200 p-6">
                    <h3 className="text-lg font-bold text-secondary-900 mb-2">{config.label}</h3>
                    {config.description && (
                        <p className="text-sm text-secondary-600 mb-4">{config.description}</p>
                    )}

                    {config.type === 'image' && (
                        <div>
                            <ImageUpload
                                value={settings[config.key] || config.default}
                                onChange={(url) => handleImageChange(config.key, url)}
                                label="Şəkil Yüklə"
                            />
                            {(settings[config.key] || config.default) && (
                                <div className="mt-4">
                                    <p className="text-sm text-secondary-600 mb-2">Şəkil:</p>
                                    <img
                                        src={settings[config.key] || config.default}
                                        alt={config.label}
                                        className="w-full max-w-md h-48 object-cover rounded-lg border border-secondary-200"
                                    />
                                </div>
                            )}

                            {pendingChanges[config.key] && (
                                <button
                                    onClick={() => handleSave(config.key)}
                                    disabled={loading}
                                    className="mt-4 btn-primary inline-flex items-center space-x-2 disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>{loading ? 'Yadda saxlanılır...' : 'Yadda Saxla'}</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}