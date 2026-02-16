'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateActivity, deleteActivity, addActivityImage, deleteActivityImage } from '@/actions/activities'
import ImageUpload from '@/components/admin/ImageUpload'
import { Save, ArrowLeft, Plus, X, Trash2 } from 'lucide-react'
import { Link } from '@/routing'
import toast from 'react-hot-toast'

export default function ActivityEditForm({ activity }: { activity: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [images, setImages] = useState<any[]>(activity.images || [])
  const [currentImage, setCurrentImage] = useState('')
  const [currentCaption, setCurrentCaption] = useState('')
  const [addingImage, setAddingImage] = useState(false)

  const [formData, setFormData] = useState(() => {
    const translations = {
      en: { title: '', description: '', content: '' },
      az: { title: '', description: '', content: '' },
      ru: { title: '', description: '', content: '' }
    }
    activity.translations.forEach((t: any) => {
      if (translations[t.locale as 'en' | 'az' | 'ru']) {
        translations[t.locale as 'en' | 'az' | 'ru'] = {
          title: t.title || '',
          description: t.description || '',
          content: t.content || ''
        }
      }
    })
    return {
      slug: activity.slug || '',
      image: activity.image || '',
      featured: activity.featured || false,
      active: activity.active !== undefined ? activity.active : true,
      order: activity.order || 0,
      translations
    }
  })

  const handleAddImage = async () => {
    if (!currentImage) return
    setAddingImage(true)
    try {
      const img = await addActivityImage(activity.id, currentImage, currentCaption)
      setImages(prev => [...prev, img])
      setCurrentImage('')
      setCurrentCaption('')
      toast.success('Image added!')
    } catch {
      toast.error('Failed to add image')
    } finally {
      setAddingImage(false)
    }
  }

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return
    try {
      await deleteActivityImage(id)
      setImages(prev => prev.filter(img => img.id !== id))
      toast.success('Image deleted!')
    } catch {
      toast.error('Failed to delete image')
    }
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
      await updateActivity(activity.id, { ...formData, translations })
      router.push('/admin/activities')
    } catch (err: any) {
      setError(err.message || 'Failed to update activity')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this activity?')) return
    setLoading(true)
    try {
      await deleteActivity(activity.id)
      router.push('/admin/activities')
    } catch (err: any) {
      setError(err.message || 'Failed to delete activity')
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/activities" className="inline-flex items-center text-primary-600 hover:text-primary-700">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Activities
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="btn-outline border-red-600 text-red-600 hover:bg-red-50 inline-flex items-center space-x-2"
        >
          <Trash2 className="w-5 h-5" />
          <span>Delete</span>
        </button>
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
            <span className="ml-2 text-sm font-normal text-secondary-500">({images.length} images)</span>
          </h3>

          <div className="space-y-3 mb-4">
            <ImageUpload value={currentImage} onChange={setCurrentImage} label="Upload New Image" />
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
                  disabled={addingImage}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm font-medium disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>{addingImage ? 'Adding...' : 'Add'}</span>
                </button>
              </div>
            )}
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div key={img.id} className="relative group">
                  <div className="aspect-square rounded-xl overflow-hidden bg-secondary-100">
                    <img src={img.image} alt={img.caption || `Image ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                  {img.caption && (
                    <p className="text-xs text-secondary-600 mt-1 text-center truncate">{img.caption}</p>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(img.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
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
                    translations: { ...formData.translations, [locale]: { ...formData.translations[locale], title: e.target.value } }
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
                    translations: { ...formData.translations, [locale]: { ...formData.translations[locale], description: e.target.value } }
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
                    translations: { ...formData.translations, [locale]: { ...formData.translations[locale], content: e.target.value } }
                  })}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                  placeholder="<p>Full content here...</p>"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-end space-x-4">
          <Link href="/admin/activities" className="px-6 py-2 border border-secondary-300 rounded-lg hover:bg-secondary-50">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary inline-flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'Updating...' : 'Update Activity'}</span>
          </button>
        </div>
      </form>
    </>
  )
}