'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Trophy } from 'lucide-react'

const CATEGORIES = [
    { key: 'ALL', label: 'Hamısı' },
    { key: 'IELTS', label: 'IELTS' },
    { key: 'DIM9', label: 'DIM 9' },
    { key: 'DIM11', label: 'DIM 11' },
    { key: 'CAMBRIDGE', label: 'Cambridge' },
]

const CATEGORY_COLORS: Record<string, string> = {
    IELTS: 'bg-blue-100 text-blue-700',
    DIM9: 'bg-purple-100 text-purple-700',
    DIM11: 'bg-orange-100 text-orange-700',
    CAMBRIDGE: 'bg-green-100 text-green-700',
}

interface Result {
    id: string
    image: string
    category: string
    note?: string
    active: boolean
    order: number
    createdAt: string
}

interface Props {
    results: Result[]
    noResultsTitle: string
    noResultsDesc: string
}

export default function ResultsGallery({ results, noResultsTitle, noResultsDesc }: Props) {
    const [activeCategory, setActiveCategory] = useState('ALL')

    const filtered = activeCategory === 'ALL'
        ? results
        : results.filter((r) => r.category === activeCategory)

    return (
        <div>
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
                {CATEGORIES.map((cat) => {
                    const count = cat.key === 'ALL'
                        ? results.length
                        : results.filter((r) => r.category === cat.key).length
                    return (
                        <button
                            key={cat.key}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                                activeCategory === cat.key
                                    ? 'bg-green-600 text-white shadow-lg shadow-green-200 scale-105'
                                    : 'bg-white text-secondary-600 border border-secondary-200 hover:border-green-400 hover:text-green-600'
                            }`}
                        >
                            {cat.label}
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                activeCategory === cat.key
                                    ? 'bg-white/20 text-white'
                                    : 'bg-secondary-100 text-secondary-500'
                            }`}>
                                {count}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* Gallery */}
            {filtered.length > 0 ? (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {filtered.map((result) => (
                        <div
                            key={result.id}
                            className="break-inside-avoid overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 group relative"
                        >
                            <Image
                                src={result.image}
                                alt={result.category}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover"
                                unoptimized
                            />
                            {/* Category badge on hover */}
                            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[result.category] || 'bg-gray-100 text-gray-700'}`}>
                                    {result.category === 'DIM9' ? 'DIM 9' : result.category === 'DIM11' ? 'DIM 11' : result.category}
                                </span>
                            </div>
                            {/* Note section at bottom */}
                            {result.note && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <p className="text-white text-sm leading-relaxed italic">
                                        &ldquo;{result.note}&rdquo;
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-secondary-300" />
                    <h3 className="text-2xl font-bold mb-2">{noResultsTitle}</h3>
                    <p className="text-secondary-600">{noResultsDesc}</p>
                </div>
            )}
        </div>
    )
}