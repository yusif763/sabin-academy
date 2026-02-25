'use client'

import { X, Mail } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

interface TeamMemberModalProps {
    member: {
        id: string
        name: string
        image: string
        email?: string
        translations: Array<{
            position: string
            bio?: string
        }>
    }
    isOpen: boolean
    onClose: () => void
}

export default function TeamMemberModal({ member, isOpen, onClose }: TeamMemberModalProps) {
    const trans = member.translations[0]

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-secondary-50 transition-colors"
                >
                    <X className="w-5 h-5 text-secondary-900" />
                </button>

                {/* Image */}
                <div className="relative h-80 md:h-96 overflow-hidden bg-secondary-100">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-transparent to-transparent opacity-60"></div>

                    {/* Name and Position Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {member.name}
                        </h2>
                        <p className="text-xl text-primary-300 font-semibold">
                            {trans?.position}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {/* Bio */}
                    {trans?.bio && (
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-secondary-900 mb-3">
                                Haqqında
                            </h3>
                            <p className="text-secondary-700 leading-relaxed whitespace-pre-line">
                                {trans.bio}
                            </p>
                        </div>
                    )}

                    {/* Contact */}
                    {member.email && (
                        <div className="pt-6 border-t border-secondary-200">
                            <h3 className="text-xl font-bold text-secondary-900 mb-3">
                                Əlaqə
                            </h3>
                            <a
                                href={`mailto:${member.email}`}
                                className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                {member.email}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}