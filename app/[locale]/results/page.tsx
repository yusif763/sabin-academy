import { getTranslations } from 'next-intl/server'
import { getResults } from '@/actions/results'
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
            <h2 className="text-4xl font-display font-bold text-center mb-4">{t('topAchievers')}</h2>
            <p className="text-xl text-secondary-600 text-center mb-12">Our highest achieving students</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((result: any) => {
                const trans = result.translations[0]
                return (
                  <div 
                    key={result.id} 
                    className="card p-8 text-center relative overflow-hidden group hover:shadow-2xl transition-all"
                  >
                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4 bg-yellow-400 text-secondary-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {t('featured')}
                    </div>
                    
                    {/* Student Photo */}
                    {result.image && (
                      <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-500 shadow-lg">
                        <img 
                          src={result.image} 
                          alt={result.studentName} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    
                    {/* Student Name */}
                    <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                      {result.studentName}
                    </h3>
                    
                    {/* Score Badge */}
                    <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-100 to-green-50 px-6 py-3 rounded-full mb-4 shadow-md">
                      <Award className="w-6 h-6 text-green-600" />
                      <span className="font-bold text-green-600 text-3xl">{result.score}</span>
                    </div>
                    
                    {/* Test Type */}
                    <p className="text-secondary-600 font-semibold mb-4">{result.testType}</p>
                    
                    {/* Course Type */}
                    {trans?.courseType && (
                      <div className="inline-block bg-primary-100 text-primary-600 px-4 py-1 rounded-full text-sm mb-4">
                        {trans.courseType}
                      </div>
                    )}
                    
                    {/* Testimonial */}
                    {trans?.testimonial && (
                      <blockquote className="text-secondary-700 italic text-sm line-clamp-4 border-l-4 border-green-500 pl-4 mt-4">
                        "{trans.testimonial}"
                      </blockquote>
                    )}
                    
                    {/* Date */}
                    <p className="text-xs text-secondary-400 mt-4">
                      {new Date(result.date).toLocaleDateString(params.locale, {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Results */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-4xl font-display font-bold text-center mb-12">{t('allResults')}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regular.map((result: any) => {
              const trans = result.translations[0]
              return (
                <div 
                  key={result.id} 
                  className="card p-6 text-center hover:shadow-xl transition-all"
                >
                  {result.image && (
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-primary-500">
                      <img 
                        src={result.image} 
                        alt={result.studentName} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                  
                  <h3 className="font-bold text-lg mb-2">{result.studentName}</h3>
                  <div className="text-3xl font-bold text-primary-600 mb-2">{result.score}</div>
                  <p className="text-sm text-secondary-600 mb-2">{result.testType}</p>
                  
                  {trans?.courseType && (
                    <p className="text-xs text-secondary-500 bg-secondary-50 px-3 py-1 rounded-full inline-block">
                      {trans.courseType}
                    </p>
                  )}
                </div>
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
            href="#contact" 
            className="btn-primary inline-block bg-white text-green-600 hover:bg-secondary-50"
          >
            {t('ctaButton')}
          </a>
        </div>
      </section>
    </div>
  )
}
