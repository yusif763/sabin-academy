'use client'

import { useState, useEffect } from 'react'
import { Trash2, GripVertical, Plus } from 'lucide-react'
import ImageUpload from './ImageUpload'
import { addGalleryImage, deleteGalleryImage, getCampGallery } from '@/actions/camps'
import toast from 'react-hot-toast'

interface Props {
    campId: string
}

export default function CampGalleryManager({ campId }: Props) {
    const [images, setImages] = useState<any[]>([])
    const [newImage, setNewImage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadGallery()
    }, [])

    const loadGallery = async () => {
        const data = await getCampGallery(campId)
        setImages(data)
    }

    const handleAdd = async () => {
        if (!newImage) return
        setLoading(true)
        try {
            await addGalleryImage(campId, newImage)
            setNewImage('')
            await loadGallery()
            toast.success('Image added!')
        } catch {
            toast.error('Failed to add image')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this image?')) return
        try {
            await deleteGalleryImage(id)
            await loadGallery()
            toast.success('Image deleted!')
        } catch {
            toast.error('Failed to delete')
        }
    }

    return (
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
            <h3 className="text-lg font-bold text-secondary-900 mb-6">
                Gallery ({images.length} images)
            </h3>

            {/* Add New Image */}
            <div className="mb-6 pb-6 border-b border-secondary-200">
                <ImageUpload
                    value={newImage}
                    onChange={setNewImage}
                    label="Add New Image"
                />
                {newImage && (
                    <button
                        onClick={handleAdd}
                        disabled={loading}
                        className="mt-3 btn-primary inline-flex items-center space-x-2 disabled:opacity-50"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{loading ? 'Adding...' : 'Add to Gallery'}</span>
                    </button>
                )}
            </div>

            {/* Gallery Grid */}
            {images.length === 0 ? (
                <div className="text-center py-8 text-secondary-500">
                    No images yet. Add your first gallery image above.
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((img) => (
                        <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square bg-secondary-100">
                            <img
                                src={img.image}
                                alt="Gallery"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={() => handleDelete(img.id)}
                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}