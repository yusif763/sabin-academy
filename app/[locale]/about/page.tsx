import { getTranslations } from 'next-intl/server'
import { Award, Users, Target, Heart, TrendingUp, BookOpen, Globe, Star } from 'lucide-react'

export default async function AboutPage() {
  const t = await getTranslations('about')

  const values = [
    { 
      icon: Award, 
      title: t('values.excellence.title'), 
      description: t('values.excellence.description'),
      color: 'from-yellow-500 to-yellow-600'
    },
    { 
      icon: Users, 
      title: t('values.community.title'), 
      description: t('values.community.description'),
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: Target, 
      title: t('values.success.title'), 
      description: t('values.success.description'),
      color: 'from-green-500 to-green-600'
    },
    { 
      icon: Heart, 
      title: t('values.passion.title'), 
      description: t('values.passion.description'),
      color: 'from-red-500 to-red-600'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-secondary-900 to-secondary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">{t('title')}</h1>
          <p className="text-xl max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-8 text-center">{t('story.title')}</h2>
            <div className="prose prose-lg max-w-none text-secondary-700 space-y-6">
              <p className="text-lg leading-relaxed">{t('story.paragraph1')}</p>
              <p className="text-lg leading-relaxed">{t('story.paragraph2')}</p>
              <p className="text-lg leading-relaxed">{t('story.paragraph3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container-custom">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">{t('values.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="card p-8 text-center hover:shadow-2xl transition-all group"
              >
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-secondary-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                <Users className="w-10 h-10 text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <p className="text-5xl font-bold text-primary-600 mb-2">40K+</p>
              <p className="text-secondary-600">{t('stats.students')}</p>
            </div>
            <div className="group">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors">
                <TrendingUp className="w-10 h-10 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <p className="text-5xl font-bold text-green-600 mb-2">95%</p>
              <p className="text-secondary-600">{t('stats.success')}</p>
            </div>
            <div className="group">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <BookOpen className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <p className="text-5xl font-bold text-blue-600 mb-2">12+</p>
              <p className="text-secondary-600">{t('stats.courses')}</p>
            </div>
            <div className="group">
              <div className="w-20 h-20 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                <Star className="w-10 h-10 text-yellow-600 group-hover:text-white transition-colors" />
              </div>
              <p className="text-5xl font-bold text-yellow-600 mb-2">10+</p>
              <p className="text-secondary-600">{t('stats.years')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location with Google Maps */}
      <section className="py-20 bg-secondary-50">
        <div className="container-custom">
          <h2 className="text-4xl font-display font-bold mb-4 text-center">Our Location</h2>
          <p className="text-xl text-secondary-600 text-center mb-12">Visit us in Baku, Azerbaijan</p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="card p-0 overflow-hidden h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.2166134534886!2d49.8449!3d40.3777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDIyJzM5LjciTiA0OcKwNTAnNDEuNiJF!5e0!3m2!1sen!2saz!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Location Details */}
            <div className="space-y-6">
              <div className="card p-8">
                <h3 className="text-2xl font-bold mb-6">Sabina Academy</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Address</h4>
                      <p className="text-secondary-600">
                        Səttar Bəhlulzadə küçəsi 1<br />
                        Baku, Azerbaijan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Contact</h4>
                      <p className="text-secondary-600">
                        Phone: +994 (50) 123-45-67<br />
                        Email: info@sabina-academy.az
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Working Hours</h4>
                      <p className="text-secondary-600">
                        Monday - Friday: 9:00 AM - 7:00 PM<br />
                        Saturday: 10:00 AM - 5:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                <h4 className="text-xl font-bold mb-2">How to Find Us</h4>
                <p className="text-sm opacity-90">
                  We are located in the heart of Baku, easily accessible by public transport. 
                  The nearest metro station is just a 5-minute walk away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{t('cta.description')}</p>
          <a 
            href="#contact" 
            className="btn-primary inline-block bg-white text-primary-600 hover:bg-secondary-50"
          >
            {t('cta.button')}
          </a>
        </div>
      </section>
    </div>
  )
}
