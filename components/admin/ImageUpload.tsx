'use client'

import { useState, useRef } from 'react'
import { Upload, X, FileText } from 'lucide-react'

interface ImageUploadProps {
    value: string
    onChange: (url: string) => void
    label?: string
    accept?: string
}

export default function ImageUpload({
                                        value,
                                        onChange,
                                        label = 'Upload Image',
                                        accept = 'image/*,.pdf'
                                    }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleUpload = async (file: File) => {
        setUploading(true)
        setError('')

        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error || 'Upload failed')

            onChange(data.url)
        } catch (err: any) {
            setError(err.message || 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const isPdf = value?.toLowerCase().endsWith('.pdf')

    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-secondary-700 mb-2">{label}</label>
            )}

            {/* Preview */}
            {value && (
                <div className="relative mb-3 inline-block">
                    {isPdf ? (
                        <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                            <FileText className="w-6 h-6 text-red-600" />
                            <span className="text-sm text-red-700 font-medium">PDF uploaded</span>
                        </div>
                    ) : (
                        <img
                            src={value}
                            alt="Preview"
                            className="h-32 w-auto rounded-lg object-cover border border-secondary-200"
                        />
                    )}
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            )}

            {/* Upload area */}
            <div
                onClick={() => inputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                    uploading
                        ? 'border-primary-300 bg-primary-50'
                        : 'border-secondary-300 hover:border-primary-400 hover:bg-primary-50'
                }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleUpload(file)
                        e.target.value = ''
                    }}
                />

                <Upload className="w-8 h-8 mx-auto mb-2 text-secondary-400" />

                {uploading ? (
                    <div>
                        <p className="text-sm font-semibold text-primary-600">Uploading...</p>
                        <div className="mt-2 h-1.5 bg-secondary-200 rounded-full overflow-hidden w-32 mx-auto">
                            <div className="h-full bg-primary-500 rounded-full animate-pulse w-2/3"></div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm font-semibold text-secondary-700">
                            Click to upload <span className="text-xs font-normal text-secondary-400 ml-1">{value ? '(change)' : ''}</span>
                        </p>
                        <p className="text-xs text-secondary-500 mt-1">PNG, JPG, WEBP, PDF up to 5MB</p>
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}