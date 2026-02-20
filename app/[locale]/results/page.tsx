import { getTranslations } from 'next-intl/server'
import { getResults } from '@/actions/results'
import { Trophy } from 'lucide-react'
import ResultsGallery from '@/components/ResultsGallery'

export default async function ResultsPage({ params }: { params: { locale: string } }) {
    const t = await getTranslations('results')
    const results = await getResults()

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="py-20 bg-gradient-to-br from-green-600 to-green-500 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="container-custom relative z-10 text-center">
                    <Trophy className="w-16 h-16 mx-auto mb-6 animate-bounce" />
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">{t('title')}</h1>
                    <p className="text-xl max-w-2xl mx-auto">{t('subtitle')}</p>
                </div>
            </section>

            {/* Gallery with category tabs */}
            <section className="py-20">
                <div className="container-custom">
                    <ResultsGallery results={results} noResultsTitle={t('noResults')} noResultsDesc={t('noResultsDescription')} />
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-green-600 to-green-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-display font-bold mb-6">{t('ctaTitle')}</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">{t('ctaDescription')}</p>
                    <a
                        href="/contact"
                        className="btn-primary inline-block bg-white text-green-600 hover:bg-secondary-50"
                    >
                        {t('ctaButton')}
                    </a>
                </div>
            </section>
        </div>
    )
}