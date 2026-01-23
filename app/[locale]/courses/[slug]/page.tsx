import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getCourseBySlug } from '@/actions/courses'
import { Link } from '@/routing'
import { Clock, Calendar, CheckCircle, Award, ArrowLeft, Users, BookOpen } from 'lucide-react'

export default async function CourseDetailPage({ 
  params 
}: { 
  params: { locale: string; slug: string } 
}) {
  const course = await getCourseBySlug(params.slug, params.locale)
  const t = await getTranslations('courses')

  if (!course) notFound()

  const trans = course.translations.find((t: any) => t.locale === params.locale)
  if (!trans) notFound()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            {course.featured && (
              <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full mb-4">
                <Award className="w-4 h-4 mr-2" />
                <span className="font-semibold text-sm">{t('featured')}</span>
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {trans.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              {trans.description}
            </p>

            <div className="flex flex-wrap gap-6 text-white/90">
              {trans.duration && (
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{trans.duration}</span>
                </div>
              )}
              {trans.schedule && (
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{trans.schedule}</span>
                </div>
              )}
              {trans.price && (
                <div className="bg-white/20 px-4 py-2 rounded-lg font-bold text-lg">
                  {trans.price}
                </div>
              )}
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
              {/* What You'll Learn */}
              {trans.highlights && trans.highlights.length > 0 && (
                <div className="card p-8">
                  <h2 className="text-3xl font-display font-bold text-secondary-900 mb-6 flex items-center">
                    <BookOpen className="w-8 h-8 mr-3 text-primary-500" />
                    {t('whatYouLearn')}
                  </h2>
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

              {/* Course Details */}
              <div className="card p-8">
                <h2 className="text-3xl font-display font-bold text-secondary-900 mb-6">
                  {t('courseDetails')}
                </h2>
                <div className="prose prose-lg max-w-none text-secondary-700">
                  <p className="whitespace-pre-line">{trans.description}</p>
                </div>
              </div>

              {/* Why Choose This Course */}
              <div className="card p-8 bg-gradient-to-br from-primary-50 to-white border-2 border-primary-100">
                <h3 className="text-2xl font-bold mb-4 text-secondary-900">Why Choose This Course?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Expert Instructors</h4>
                      <p className="text-sm text-secondary-600">Learn from industry professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Proven Results</h4>
                      <p className="text-sm text-secondary-600">95% success rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Enroll Card */}
              <div className="card p-6 sticky top-24 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                <h3 className="text-2xl font-bold mb-4">{t('enrollNow')}</h3>
                
                {trans.price && (
                  <div className="bg-white/20 rounded-lg p-4 mb-4">
                    <p className="text-sm opacity-90">{t('coursePrice')}</p>
                    <p className="text-3xl font-bold">{trans.price}</p>
                  </div>
                )}

                <Link
                  href="/contact"
                  className="block w-full bg-white text-primary-600 text-center py-3 rounded-lg font-bold hover:shadow-xl transition-all"
                >
                  {t('enrollButton')}
                </Link>

                <p className="text-sm text-center mt-4 opacity-90">
                  {t('enrollInfo')}
                </p>
              </div>

              {/* Course Info */}
              <div className="card p-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                  {t('courseInfo')}
                </h3>
                <div className="space-y-3 text-sm">
                  {trans.duration && (
                    <div className="flex justify-between py-2 border-b border-secondary-100">
                      <span className="text-secondary-600">{t('duration')}</span>
                      <span className="font-semibold">{trans.duration}</span>
                    </div>
                  )}
                  {trans.schedule && (
                    <div className="flex justify-between py-2 border-b border-secondary-100">
                      <span className="text-secondary-600">{t('schedule')}</span>
                      <span className="font-semibold">{trans.schedule}</span>
                    </div>
                  )}
                  {trans.price && (
                    <div className="flex justify-between py-2">
                      <span className="text-secondary-600">{t('price')}</span>
                      <span className="font-semibold text-primary-600">{trans.price}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-12 bg-secondary-50">
        <div className="container-custom text-center">
          <Link href="/courses" className="btn-outline inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToCourses')}
          </Link>
        </div>
      </section>
    </div>
  )
}
