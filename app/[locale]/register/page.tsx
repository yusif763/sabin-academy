import { getTranslations } from 'next-intl/server'
import PreRegistrationSection from '@/components/forms/PreRegistrationSection'

export async function generateMetadata() {
  const t = await getTranslations('register')
  return {
    title: `${t('title')} | Sabina Academy`,
    description: t('subtitle'),
  }
}

export default async function RegisterPage() {
  const t = await getTranslations('register')

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">{t('title')}</h1>
          <p className="text-xl max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <PreRegistrationSection variant="plain" />
        </div>
      </section>
    </div>
  )
}
