import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getActivityBySlug } from '@/actions/activities'
import { Link } from '@/routing'
import { ArrowLeft } from 'lucide-react'

export default async function ActivityDetailPage({
                                                     params
                                                 }: {
    params: { locale: string; slug: string }
}) {
    const activity = await getActivityBySlug(params.slug, params.locale)
    const t = await getTranslations('activities')

    if (!activity) notFound()

    const trans = activity.translations.find((tr: any) => tr.locale === params.locale)
    if (!trans) notFound()

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">{trans.title}</h1>
                        <p className="text-xl text-white/90">{trans.description}</p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Main Image */}
                        {activity.image && (
                            <div className="relative h-96 overflow-hidden rounded-2xl shadow-xl">
                                <img
                                    src={activity.image}
                                    alt={trans.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Content */}
                        {trans.content && (
                            <div className="card p-8">
                                <div
                                    className="prose prose-lg max-w-none text-secondary-700"
                                    dangerouslySetInnerHTML={{ __html: trans.content }}
                                />
                            </div>
                        )}

                        {/* Image Gallery */}
                        {activity.images && activity.images.length > 0 && (
                            <div className="card p-8">
                                <h2 className="text-3xl font-display font-bold mb-6">{t('gallery')}</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {activity.images.map((img: any, index: number) => (
                                        <div key={img.id || index} className="space-y-2">
                                            <div className="relative h-52 overflow-hidden rounded-xl">
                                                <img
                                                    src={img.image}
                                                    alt={img.caption || `Image ${index + 1}`}
                                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            {img.caption && (
                                                <p className="text-sm text-secondary-600 text-center">{img.caption}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-secondary-50">
                <div className="container-custom text-center">
                    <Link href="/activities" className="btn-outline inline-flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t('backToActivities')}
                    </Link>
                </div>
            </section>
        </div>
    )
}