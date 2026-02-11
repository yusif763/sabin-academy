import { getTranslations } from 'next-intl/server'
import { getCourses } from '@/actions/courses'
import { Link } from '@/routing'
import { BookOpen, Clock, Users, CheckCircle, Award, TrendingUp, Star } from 'lucide-react'
import Image from "next/image";

export default async function CoursesPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations('courses')
  const courses = await getCourses(params.locale)
  const featured = courses.filter((c: any) => c.featured)
  const regular = courses.filter((c: any) => !c.featured)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-secondary-900 to-secondary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">{t('title')}</h1>
          <p className="text-xl max-w-2xl mx-auto mb-12">{t('subtitle')}</p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary-400" />
              <p className="text-2xl font-bold">{courses.length}+</p>
              <p className="text-sm opacity-80">{t('totalCourses')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Award className="w-8 h-8 mx-auto mb-2 text-primary-400" />
              <p className="text-2xl font-bold">95%</p>
              <p className="text-sm opacity-80">{t('successRate')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary-400" />
              <p className="text-2xl font-bold">5K+</p>
              <p className="text-sm opacity-80">{t('students')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary-400" />
              <p className="text-2xl font-bold">10+</p>
              <p className="text-sm opacity-80">{t('years')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {featured.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-primary-50">
          <div className="container-custom">
            <h2 className="text-4xl font-display font-bold text-center mb-4">{t('featured')}</h2>
            <p className="text-xl text-secondary-600 text-center mb-12">{t('featuredSubtitle')}</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((course: any) => {
                const trans = course.translations[0]
                return (
                  <Link href={`/courses/${course.slug}`} key={course.id}>
                    <div className="card hover:shadow-2xl transition-all group h-full">
                      {course.image && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={course.image} 
                            alt={trans?.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                          />
                          <div className="absolute top-4 right-4 bg-yellow-400 text-secondary-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                            <Star className="w-4 h-4 fill-current" />
                            {t('featured')}
                          </div>
                          {course.icon && (
                            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-lg">
                              {course.icon}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                          {trans?.title}
                        </h3>
                        <p className="text-secondary-600 mb-4 line-clamp-2">{trans?.description}</p>
                        
                        {trans?.highlights && trans.highlights.length > 0 && (
                          <div className="space-y-2 mb-4">
                            {trans.highlights.slice(0, 3).map((h: string, i: number) => (
                              <div key={i} className="flex items-start text-sm">
                                <CheckCircle className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-secondary-700">{h}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
                          {trans?.duration && (
                            <div className="flex items-center text-sm text-secondary-600">
                              <Clock className="w-4 h-4 mr-1" />
                              {trans.duration}
                            </div>
                          )}
                          {trans?.price && (
                            <div className="text-xl font-bold text-primary-600">{trans.price}</div>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <span className="text-primary-600 font-semibold group-hover:underline inline-flex items-center">
                            {t('learnMore')} →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Courses */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-4xl font-display font-bold text-center mb-4">{t('allCourses')}</h2>
          <p className="text-xl text-secondary-600 text-center mb-12">{t('allCoursesSubtitle')}</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regular.map((course: any) => {
              const trans = course.translations[0]
              return (
                <Link href={`/courses/${course.slug}`} key={course.id}>
                  <div className="card hover:shadow-2xl transition-all h-full">
                    {course.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={course.image} 
                          alt={trans?.title} 
                          className="w-full h-full object-cover" 
                        />
                        {course.icon && (
                          <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-lg">
                            {course.icon}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3">{trans?.title}</h3>
                      <p className="text-secondary-600 mb-4 line-clamp-2">{trans?.description}</p>
                      
                      <div className="flex items-center justify-between">
                        {trans?.duration && (
                          <div className="flex items-center text-sm text-secondary-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {trans.duration}
                          </div>
                        )}
                        {trans?.price && (
                          <div className="text-xl font-bold text-primary-600">{trans.price}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-secondary-300" />
              <h3 className="text-2xl font-bold mb-2">{t('noCourses')}</h3>
              <p className="text-secondary-600">{t('noCoursesDescription')}</p>
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
