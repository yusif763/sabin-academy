import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getCampBySlug } from '@/actions/camps'
import { Link } from '@/routing'
import { MapPin, Calendar, Users, CheckCircle, ArrowLeft, Clock, Star } from 'lucide-react'

export default async function CampDetailPage({
                                                 params
                                             }: {
    params: { locale: string; slug: string }
}) {
    const camp = await getCampBySlug(params.slug, params.locale)
    const t = await getTranslations('camps')

    if (!camp) notFound()

    const trans = camp.translations.find((tr: any) => tr.locale === params.locale)
    if (!trans) notFound()

    const duration = Math.ceil(
        (new Date(camp.endDate).getTime() - new Date(camp.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    )

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl">
                        {camp.featured && (
                            <div className="inline-flex items-center bg-yellow-400 text-secondary-900 px-4 py-2 rounded-full mb-4">
                                <Star className="w-4 h-4 mr-2 fill-current" />
                                <span className="font-semibold text-sm">{t('featured')}</span>
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            {trans.title}
                        </h1>
                        <p className="text-xl text-white/90 mb-8">{trans.description}</p>
                        <div className="flex flex-wrap gap-6 text-white/90">
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5 mr-2" />
                                <span>{camp.location}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 mr-2" />
                                <span>
                  {new Date(camp.startDate).toLocaleDateString(params.locale)} -{' '}
                                    {new Date(camp.endDate).toLocaleDateString(params.locale)}
                </span>
                            </div>
                            {camp.ageRange && (
                                <div className="flex items-center">
                                    <Users className="w-5 h-5 mr-2" />
                                    <span>{t('ages')} {camp.ageRange}</span>
                                </div>
                            )}
                            <div className="flex items-center">
                                <Clock className="w-5 h-5 mr-2" />
                                <span>{duration} {t('days')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Gallery */}
                            {camp.gallery && camp.gallery.length > 0 && (
                                <div className="card p-8">
                                    <h2 className="text-3xl font-display font-bold mb-6">{t('gallery')}</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {camp.gallery.map((img: any, index: number) => (
                                            <div key={img.id || index} className="relative h-56 overflow-hidden rounded-xl">
                                                <img
                                                    src={img.image}
                                                    alt={`Gallery ${index + 1}`}
                                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Highlights */}
                            {trans.highlights && trans.highlights.length > 0 && (
                                <div className="card p-8">
                                    <h2 className="text-3xl font-display font-bold mb-6">{t('highlights')}</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {trans.highlights.map((highlight: string, index: number) => (
                                            <div key={index} className="flex items-start">
                                                <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1 mr-3" />
                                                <span className="text-secondary-700">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Activities */}
                            {trans.activities && trans.activities.length > 0 && (
                                <div className="card p-8">
                                    <h2 className="text-3xl font-display font-bold mb-6">{t('activities')}</h2>
                                    <div className="space-y-3">
                                        {trans.activities.map((activity: string, index: number) => (
                                            <div key={index} className="flex items-start bg-primary-50 p-4 rounded-lg">
                                                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0 text-sm">
                                                    {index + 1}
                                                </div>
                                                <span className="text-secondary-700">{activity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Includes */}
                            {trans.includes && trans.includes.length > 0 && (
                                <div className="card p-8 bg-gradient-to-br from-green-50 to-white border-2 border-green-100">
                                    <h2 className="text-3xl font-display font-bold mb-6 text-green-900">{t('whatsIncluded')}</h2>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {trans.includes.map((item: string, index: number) => (
                                            <div key={index} className="flex items-start">
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 mr-2" />
                                                <span className="text-secondary-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}

                        <div className="space-y-6">
                            {camp.isActive && (
                                <div className="card p-6 sticky top-24 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                                    <h3 className="text-2xl font-bold mb-4">{t('registerNow')}</h3>
                                    <div className="bg-white/20 rounded-lg p-4 mb-4">
                                        <p className="text-sm opacity-90">{t('totalPrice')}</p>
                                        <p className="text-3xl font-bold">{camp.price}</p>
                                    </div>
                                    {camp.spots && camp.spots < 10 && camp.isActive && (
                                        <div className="bg-yellow-400 text-secondary-900 rounded-lg p-3 mb-4 text-sm font-semibold text-center">
                                            {t('onlySpots', { count: camp.spots })}
                                        </div>
                                    )}
                                    <Link
                                        href="/contact"
                                        className="block w-full bg-white text-primary-600 text-center py-3 rounded-lg font-bold hover:shadow-xl transition-all"
                                    >
                                        {t('registerButton')}
                                    </Link>
                                    <p className="text-sm text-center mt-4 opacity-90">{t('registerInfo')}</p>
                                </div>
                            )}
                            <div className="card p-6">
                                <h3 className="text-xl font-bold mb-4">{t('quickFacts')}</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between py-2 border-b border-secondary-100">
                                        <span className="text-secondary-600">{t('year')}</span>
                                        <span className="font-semibold">{camp.year}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-secondary-100">
                                        <span className="text-secondary-600">{t('location')}</span>
                                        <span className="font-semibold">{camp.location}</span>
                                    </div>
                                    {camp.ageRange && (
                                        <div className="flex justify-between py-2 border-b border-secondary-100">
                                            <span className="text-secondary-600">{t('ageRange')}</span>
                                            <span className="font-semibold">{camp.ageRange}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between py-2 border-b border-secondary-100">
                                        <span className="text-secondary-600">{t('duration')}</span>
                                        <span className="font-semibold">{duration} {t('days')}</span>
                                    </div>
                                    {camp.spots && (
                                        <div className="flex justify-between py-2">
                                            <span className="text-secondary-600">{t('spots')}</span>
                                            <span className="font-semibold text-primary-600">{camp.spots}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-secondary-50">
                <div className="container-custom text-center">
                    <Link href="/camps" className="btn-outline inline-flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t('backToCamps')}
                    </Link>
                </div>
            </section>
        </div>
    )
}