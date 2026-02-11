import { getTranslations } from 'next-intl/server'
import { ArrowRight, Award, BookOpen, Globe, Users } from 'lucide-react'
import { Link } from '@/routing'
import Image from "next/image";

export default async function HomePage() {
  const t = await getTranslations()

  const stats = [
    { icon: Users, label: t('home.stats.students'), value: '40K+' },
    { icon: Award, label: t('home.stats.successRate'), value: '95%' },
    { icon: BookOpen, label: t('home.stats.courses'), value: '12+' },
    { icon: Globe, label: t('home.stats.years'), value: '10+' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-400"></div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                  {t('home.hero.title')}{' '}
                  <span className="gradient-text">{t('home.hero.subtitle')}</span>
                </h1>
                <p className="text-lg md:text-xl text-secondary-600 leading-relaxed">
                  {t('home.hero.description')}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/courses" className="btn-primary group">
                  {t('home.hero.cta')}
                  <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/results" className="btn-outline">
                  {t('home.hero.ctaSecondary')}
                </Link>
              </div>
            </div>

            {/* Right Image/Illustration */}
            <div className="relative animate-fade-in animation-delay-200">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 opacity-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                  alt="Sabina Academy"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 animate-slide-up animation-delay-400">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-secondary-900">95%</p>
                    <p className="text-sm text-secondary-600">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center space-y-4 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-secondary-900">{stat.value}</p>
                  <p className="text-secondary-600 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Preview */}
      <section className="py-20 gradient-bg">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('courses.title')}</h2>
            <p className="section-subtitle">{t('courses.subtitle')}</p>
          </div>
          
          <div className="text-center">
            <Link href="/courses" className="btn-primary">
              View All Courses
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Summer Camps CTA */}
      <section className="py-20 bg-secondary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              {t('camps.title')}
            </h2>
            <p className="text-xl text-secondary-300">
              {t('camps.subtitle')}
            </p>
            <Link href="/camps" className="btn-primary inline-flex items-center">
              {t('camps.learnMore')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
