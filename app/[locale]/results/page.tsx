import { getTranslations } from 'next-intl/server'
import { getResults } from '@/actions/results'
import ResultCard from '@/components/ResultCard'
import { Trophy, Star, Award, TrendingUp, Target } from 'lucide-react'

export default async function ResultsPage({ params }: { params: { locale: string } }) {
    const t = await getTranslations('results')
    const results = await getResults(params.locale)
    const featured = results.filter((r: any) => r.featured)
    const regular = results.filter((r: any) => !r.featured)

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

                    {/* Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                            <p className="text-3xl font-bold">{results.length}+</p>
                            <p className="text-sm opacity-90">Success Stories</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                            <p className="text-3xl font-bold">95%</p>
                            <p className="text-sm opacity-90">Achievement Rate</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <Target className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                            <p className="text-3xl font-bold">8.5</p>
                            <p className="text-sm opacity-90">Average Score</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Results */}
            {featured.length > 0 && (
                <section className="py-20 bg-gradient-to-b from-white to-green-50">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-4">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="font-semibold">Featured</span>
                            </div>
                            <h2 className="text-4xl font-display font-bold text-secondary-900 mb-4">
                                {t('topAchievers')}
                            </h2>
                            <p className="text-xl text-secondary-600">
                                Our highest achieving students
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featured.map((result: any) => {
                                const trans = result.translations[0]
                                return (
                                    <ResultCard
                                        key={result.id}
                                        studentName={result.studentName}
                                        score={result.score}
                                        testType={result.testType}
                                        image={result.image}
                                        certificate={result.certificate}
                                        courseType={trans?.courseType}
                                        testimonial={trans?.testimonial}
                                        date={new Date(result.date)}
                                        featured={true}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* All Results */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold text-secondary-900 mb-4">
                            {t('allResults')}
                        </h2>
                        <p className="text-xl text-secondary-600">
                            Celebrating every student's success
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regular.map((result: any) => {
                            const trans = result.translations[0]
                            return (
                                <ResultCard
                                    key={result.id}
                                    studentName={result.studentName}
                                    score={result.score}
                                    testType={result.testType}
                                    image={result.image}
                                    certificate={result.certificate}
                                    courseType={trans?.courseType}
                                    testimonial={trans?.testimonial}
                                    date={new Date(result.date)}
                                    featured={false}
                                />
                            )
                        })}
                    </div>

                    {results.length === 0 && (
                        <div className="text-center py-20">
                            <Trophy className="w-16 h-16 mx-auto mb-4 text-secondary-300" />
                            <h3 className="text-2xl font-bold mb-2">{t('noResults')}</h3>
                            <p className="text-secondary-600">{t('noResultsDescription')}</p>
                        </div>
                    )}
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