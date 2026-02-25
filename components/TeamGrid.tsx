'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Mail } from 'lucide-react'
import TeamMemberModal from './TeamMemberModal'

interface TeamMember {
    id: string
    name: string
    image: string
    email?: string
    translations: Array<{
        position: string
        bio?: string
    }>
}

interface TeamGridProps {
    members: TeamMember[]
}

export default function TeamGrid({ members }: TeamGridProps) {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {members.map((member) => {
                    const trans = member.translations[0]
                    return (
                        <div
                            key={member.id}
                            onClick={() => setSelectedMember(member)}
                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        >
                            {/* Photo */}
                            <div className="relative h-80 overflow-hidden bg-secondary-100">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Click hint */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/90 px-4 py-2 rounded-full text-sm font-semibold text-secondary-900">
                                        Daha ətraflı
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-secondary-900 mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-primary-600 font-semibold mb-3">
                                    {trans?.position}
                                </p>

                                {trans?.bio && (
                                    <p className="text-sm text-secondary-600 mb-4 line-clamp-3">
                                        {trans.bio}
                                    </p>
                                )}

                                {member.email && (
                                    <div className="pt-4 border-t border-secondary-100">
                                        <div className="inline-flex items-center text-sm text-secondary-600">
                                            <Mail className="w-4 h-4 mr-2" />
                                            {member.email}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Modal */}
            {selectedMember && (
                <TeamMemberModal
                    member={selectedMember}
                    isOpen={!!selectedMember}
                    onClose={() => setSelectedMember(null)}
                />
            )}
        </>
    )
}