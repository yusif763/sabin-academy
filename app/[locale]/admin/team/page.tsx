'use client'

import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/Header'
import { Link } from '@/routing'
import { Plus, Edit, Trash2, Eye, Mail } from 'lucide-react'
import Image from 'next/image'
import { getAllTeamMembers, deleteTeamMember } from '@/actions/team'

export default function TeamAdminPage() {
    const [members, setMembers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    useEffect(() => {
        loadMembers()
    }, [])

    async function loadMembers() {
        setLoading(true)
        const data = await getAllTeamMembers()
        setMembers(data)
        setLoading(false)
    }

    async function handleDelete(id: string) {
        if (!confirm('Bu komanda üzvünü silmək istədiyinizə əminsiniz?')) return
        setDeletingId(id)
        try {
            await deleteTeamMember(id)
            setMembers((prev) => prev.filter((m) => m.id !== id))
        } catch {
            alert('Silinmə zamanı xəta baş verdi')
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div>
            <AdminHeader title="Komanda" />

            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-secondary-900">Bütün Komanda Üzvləri</h2>
                        <p className="text-secondary-600 mt-1">{members.length} üzv</p>
                    </div>
                    <Link
                        href="/admin/team/new"
                        className="btn-primary inline-flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Yeni Üzv</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-secondary-100 rounded-xl h-80 animate-pulse" />
                        ))}
                    </div>
                ) : members.length === 0 ? (
                    <div className="bg-white rounded-xl border border-secondary-200 p-12 text-center">
                        <p className="text-secondary-500">Hələ komanda üzvü yoxdur. İlk üzvü əlavə edin!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {members.map((member: any) => {
                            const trans = member.translations.find((t: any) => t.locale === 'en') || member.translations[0]
                            return (
                                <div
                                    key={member.id}
                                    className="bg-white rounded-xl border border-secondary-200 overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    {/* Photo */}
                                    <div className="relative h-64 bg-secondary-100">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                        {/* Status badge */}
                                        <div className="absolute top-3 right-3">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                                                member.active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {member.active ? 'Aktiv' : 'Deaktiv'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-secondary-900 mb-1">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm text-primary-600 font-medium mb-2">
                                            {trans?.position || 'Position not set'}
                                        </p>

                                        {member.email && (
                                            <div className="flex items-center text-xs text-secondary-500 mb-3">
                                                <Mail className="w-3 h-3 mr-1" />
                                                {member.email}
                                            </div>
                                        )}

                                        {trans?.bio && (
                                            <p className="text-sm text-secondary-600 line-clamp-2 mb-4">
                                                {trans.bio}
                                            </p>
                                        )}

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-3 border-t border-secondary-100">
                                            <p className="text-xs text-secondary-400">
                                                Sıra: {member.order}
                                            </p>
                                            <div className="flex items-center space-x-1">
                                                <Link
                                                    href="/team"
                                                    target="_blank"
                                                    className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                                                    title="Bax"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/team/${member.id}`}
                                                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                    title="Redaktə et"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(member.id)}
                                                    disabled={deletingId === member.id}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Sil"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}