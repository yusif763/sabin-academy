import { getTranslations } from 'next-intl/server'
import { fetchPreRegistrationOpen, fetchPublicCourses } from '@/lib/sabina-api'
import PreRegistrationForm from './PreRegistrationForm'

interface PreRegistrationSectionProps {
  /** `plain` ayrıca səhifə üçündür — orada başlıq hero bölməsində göstərilir. */
  variant?: 'section' | 'plain'
}

export default async function PreRegistrationSection({
  variant = 'section',
}: PreRegistrationSectionProps) {
  const t = await getTranslations('register')
  const [courses, isOpen] = await Promise.all([
    fetchPublicCourses(),
    fetchPreRegistrationOpen(),
  ])

  // Paneldən bağlananda form ümumiyyətlə render olunmur; server də
  // müraciəti rədd edir, ona görə bu yalnız izahlı mesajdır.
  const body = isOpen ? (
    <PreRegistrationForm courses={courses} />
  ) : (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 text-center">
      <h3 className="text-2xl font-bold text-secondary-900 mb-3">{t('closed.title')}</h3>
      <p className="text-secondary-600">{t('closed.body')}</p>
    </div>
  )

  if (variant === 'plain') {
    return (
      <div className="max-w-4xl mx-auto">
        {body}
      </div>
    )
  }

  return (
    <section id="qeydiyyat" className="py-20 bg-secondary-50 scroll-mt-24">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle !mb-0">{t('subtitle')}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {body}
        </div>
      </div>
    </section>
  )
}
