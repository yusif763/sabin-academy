import { getTranslations } from 'next-intl/server'
import { getActivities } from '@/actions/activities'
import { Link } from '@/routing'
import { ArrowRight, Zap } from 'lucide-react'

export default async function ActivitiesPage({ params }: { params: { locale: string } }) {
    const t = await getTranslations('activities')
    const activities = await getActivities(params.locale)
    const featured = activities.filter((a: any) => a.featured)
    const regular = activities.filter((a: any) => !a.featured)

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                </div>
                <div className="container-custom relative z-10 text-center">
                    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <Zap className="w-5 h-5 mr-2" />
                        <span className="font-semibold">{t('badge')}</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">{t('title')}</h1>
                    <p className="text-xl max-w-3xl mx-auto">{t('subtitle')}</p>
                </div>
            </section>

            {/* Featured */}
            {featured.length > 0 && (
                <section className="py-20 bg-gradient-to-b from-white to-primary-50">
                    <div className="container-custom">
                        <h2 className="text-4xl font-display font-bold text-center mb-12">{t('featured')}</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {featured.map((activity: any) => {
                                const trans = activity.translations[0]
                                return (
                                    <Link href={`/activities/${activity.slug}`} key={activity.id}>
                                        <div className="card overflow-hidden hover:shadow-2xl transition-all group h-full">
                                            {activity.image && (
                                                <div className="relative h-64 overflow-hidden">
                                                    <img
                                                        src={activity.image}
                                                        alt={trans?.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                                                    {trans?.title}
                                                </h3>
                                                <p className="text-secondary-600 line-clamp-3 mb-4">{trans?.description}</p>
                                                <span className="text-primary-600 font-semibold inline-flex items-center">
                          {t('learnMore')} <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* All Activities */}
            <section className="py-20">
                <div className="container-custom">
                    {regular.length > 0 && (
                        <>
                            <h2 className="text-4xl font-display font-bold text-center mb-12">{t('allActivities')}</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {regular.map((activity: any) => {
                                    const trans = activity.translations[0]
                                    return (
                                        <Link href={`/activities/${activity.slug}`} key={activity.id}>
                                            <div className="card overflow-hidden hover:shadow-xl transition-all group h-full">
                                                {activity.image && (
                                                    <div className="relative h-52 overflow-hidden">
                                                        <img
                                                            src={activity.image}
                                                            alt={trans?.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                )}
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                                                        {trans?.title}
                                                    </h3>
                                                    <p className="text-secondary-600 line-clamp-2 mb-4">{trans?.description}</p>
                                                    <span className="text-primary-600 font-semibold text-sm inline-flex items-center">
                            {t('learnMore')} <ArrowRight className="w-4 h-4 ml-1" />
                          </span>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </>
                    )}

                    {activities.length === 0 && (
                        <div className="text-center py-20">
                            <Zap className="w-16 h-16 mx-auto mb-4 text-secondary-300" />
                            <h3 className="text-2xl font-bold mb-2">{t('noActivities')}</h3>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}