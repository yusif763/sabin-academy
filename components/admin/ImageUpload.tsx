'use client'

import { useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import Image from "next/image";

interface ImageUploadProps {
    value?: string
    onChange: (url: string) => void
    label?: string
}

export default function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const [preview, setPreview] = useState(value || '')

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file')
            return
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB')
            return
        }

        setError('')
        setUploading(true)

        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (data.success) {
                setPreview(data.url)
                onChange(data.url)
            } else {
                setError(data.error || 'Upload failed')
            }
        } catch (err) {
            setError('Upload failed. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    const handleRemove = () => {
        setPreview('')
        onChange('')
    }

    return (
        <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
                {label}
            </label>

            {preview ? (
                <div className="relative">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-secondary-200">
                        <Image
                            fill
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-all
            ${uploading ? 'border-primary-500 bg-primary-50' : 'border-secondary-300 hover:border-primary-500 hover:bg-primary-50'}
          `}>
                        {uploading ? (
                            <div className="space-y-2">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                                <p className="text-sm text-primary-600 font-medium">Uploading...</p>
                            </div>
                        ) : (
                            <>
                                <Upload className="w-12 h-12 text-secondary-400 mx-auto mb-3" />
                                <p className="text-sm font-medium text-secondary-900 mb-1">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-secondary-500">
                                    PNG, JPG, WEBP up to 5MB
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}