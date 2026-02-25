'use client'

import Image from 'next/image'
import { Handshake, MapPin } from 'lucide-react'
import { useState } from 'react'

const partners = [
    { id: 1, name: 'Partner 1', logo: '/images/partners/1.jpeg', city: 'Bakı' },
    { id: 2, name: 'Partner 2', logo: '/images/partners/2.jpeg', city: 'London' },
    { id: 3, name: 'Partner 3', logo: '/images/partners/3.jpeg', city: 'New York' },
    { id: 4, name: 'Partner 4', logo: '/images/partners/4.jpeg', city: 'Paris' },
]

export default function PartnersSection() {
    const [hoveredPartnerId, setHoveredPartnerId] = useState<number | null>(null)
    return (
        <section className="py-20 bg-gradient-to-b from-white to-secondary-50">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center bg-primary-100 text-primary-600 px-4 py-2 rounded-full mb-4">
                        <Handshake className="w-5 h-5 mr-2" />
                        <span className="font-semibold">Bizimlə Əməkdaşlıq Edənlər</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
                        Etibarlı Partnyorlarımız
                    </h2>
                    <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
                        Beynəlxalq və yerli qurumlarla əməkdaşlıq edərək yüksək keyfiyyətli təhsil təqdim edirik
                    </p>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {partners.map((partner) => (
                        <div
                            key={partner.id}
                            className="group bg-white rounded-xl border-2 border-secondary-100 p-8 flex flex-col items-center justify-center transition-all duration-300 hover:border-primary-400 hover:shadow-xl relative cursor-pointer"
                            onMouseEnter={() => setHoveredPartnerId(partner.id)}
                            onMouseLeave={() => setHoveredPartnerId(null)}
                        >
                            <div className="relative w-full h-24 mb-2">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                                    unoptimized
                                />
                            </div>
                            {/* City display on hover */}
                            <div className={`flex items-center gap-1.5 transition-all duration-300 ${
                                hoveredPartnerId === partner.id
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-2'
                            }`}>
                                <MapPin className="w-4 h-4 text-primary-600" />
                                <span className="text-sm font-semibold text-secondary-700">
                                    {partner.city}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16 bg-primary-50 rounded-2xl p-8">
                    <p className="text-lg text-secondary-700 mb-4">
                        Bizimlə əməkdaşlıq etmək istəyirsiniz?
                    </p>
                    <a
                        href="/contact"
                        className="btn-primary inline-flex items-center space-x-2"
                    >
                        <Handshake className="w-5 h-5" />
                        <span>Əlaqə Saxlayın</span>
                    </a>
                </div>
            </div>
        </section>
    )
}