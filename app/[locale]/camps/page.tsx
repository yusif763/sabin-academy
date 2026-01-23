import { getTranslations } from 'next-intl/server'
import { getCamps } from '@/actions/camps'
import { Link } from '@/routing'
import { MapPin, Calendar, Users, Sparkles, Star, ArrowRight } from 'lucide-react'
import Image from "next/image";

export default async function CampsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations('camps')
  const camps = await getCamps(params.locale)
  
  // Group by year
  const campsByYear: { [key: number]: any[] } = {}
  camps.forEach((camp: any) => {
    if (!campsByYear[camp.year]) {
      campsByYear[camp.year] = []
    }
    campsByYear[camp.year].push(camp)
  })
  
  const years = Object.keys(campsByYear).map(Number).sort((a, b) => b - a)
  const featured = camps.filter((c: any) => c.featured)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="font-semibold">{t('badge')}</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">{t('title')}</h1>
          <p className="text-xl max-w-3xl mx-auto mb-12">{t('subtitle')}</p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{camps.length}+</p>
              <p className="text-sm opacity-90">{t('availableCamps')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">15+</p>
              <p className="text-sm opacity-90">{t('worldwideLocations')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Camp */}
      {featured.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-primary-50">
          <div className="container-custom">
            <h2 className="text-4xl font-display font-bold text-center mb-12">{t('featured')}</h2>
            
            {featured.map((camp: any) => {
              const trans = camp.translations[0]
              return (
                <Link href={`/camps/${camp.slug}`} key={camp.id}>
                  <div className="card overflow-hidden hover:shadow-2xl transition-all max-w-5xl mx-auto group">
                    <div className="grid md:grid-cols-2 gap-0">
                      {camp.image && (
                        <div className="relative h-64 md:h-auto overflow-hidden">
                          <Image
                            src={camp.image} 
                            alt={trans?.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                          <div className="absolute top-4 left-4 bg-yellow-400 text-secondary-900 px-4 py-2 rounded-full font-bold flex items-center">
                            <Star className="w-4 h-4 mr-2 fill-current" />
                            {t('featured')}
                          </div>
                        </div>
                      )}
                      
                      <div className="p-8">
                        <div className="mb-4">
                          <span className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold">
                            {camp.year}
                          </span>
                        </div>
                        
                        <h3 className="text-3xl font-bold mb-4 group-hover:text-primary-600 transition-colors">
                          {trans?.title}
                        </h3>
                        
                        <p className="text-secondary-600 mb-6 line-clamp-3">{trans?.description}</p>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-secondary-700">
                            <MapPin className="w-5 h-5 mr-2 text-primary-500" />
                            {camp.location}
                          </div>
                          <div className="flex items-center text-secondary-700">
                            <Calendar className="w-5 h-5 mr-2 text-primary-500" />
                            {new Date(camp.startDate).toLocaleDateString(params.locale)} - {new Date(camp.endDate).toLocaleDateString(params.locale)}
                          </div>
                          <div className="flex items-center text-secondary-700">
                            <Users className="w-5 h-5 mr-2 text-primary-500" />
                            {t('ages')} {camp.ageRange}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-2xl font-bold text-primary-600">{camp.price}</div>
                          <span className="text-primary-600 font-semibold group-hover:underline inline-flex items-center">
                            {t('learnMore')} <ArrowRight className="w-4 h-4 ml-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Camps by Year */}
      <section className="py-20">
        <div className="container-custom">
          <div className="space-y-16">
            {years.map(year => (
              <div key={year}>
                <div className="flex items-center mb-8">
                  <div className="text-6xl font-bold text-primary-600 mr-6">{year}</div>
                  <div className="flex-1 h-1 bg-gradient-to-r from-primary-500 to-transparent"></div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {campsByYear[year].filter((c: any) => !c.featured).map((camp: any) => {
                    const trans = camp.translations[0]
                    return (
                      <Link href={`/camps/${camp.slug}`} key={camp.id}>
                        <div className="card hover:shadow-2xl transition-all h-full">
                          {camp.image && (
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={camp.image} 
                                alt={trans?.title} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          )}
                          
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-3">{trans?.title}</h3>
                            <p className="text-secondary-600 mb-4 line-clamp-2">{trans?.description}</p>
                            
                            <div className="space-y-2 text-sm mb-4">
                              <div className="flex items-center text-secondary-600">
                                <MapPin className="w-4 h-4 mr-2" />
                                {camp.location}
                              </div>
                              <div className="flex items-center text-secondary-600">
                                <Users className="w-4 h-4 mr-2" />
                                {camp.ageRange}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-4 border-t">
                              <div className="text-xl font-bold text-primary-600">{camp.price}</div>
                              <div className="text-sm text-secondary-500">{camp.spots} {t('spotsAvailable')}</div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {camps.length === 0 && (
            <div className="text-center py-20">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-secondary-300" />
              <h3 className="text-2xl font-bold mb-2">{t('noCamps')}</h3>
              <p className="text-secondary-600">{t('noCampsDescription')}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-6">{t('ctaTitle')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{t('ctaDescription')}</p>
          <Link href="/contact" className="btn-primary inline-block bg-white text-primary-600 hover:bg-secondary-50">
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  )
}
