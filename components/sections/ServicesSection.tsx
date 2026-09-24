import { getTranslations } from 'next-intl/server'
import { PROGRAM_GROUPS } from '@/lib/catalog'

/** Akademiyanın xidmət kataloqu — kod içindəki sabit siyahıdan render olunur. */
export default async function ServicesSection() {
  const t = await getTranslations('services')

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {PROGRAM_GROUPS.map((group) => (
            <div key={group.key} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                {t(`groups.${group.key}`)}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.code} className="flex items-start gap-3 text-secondary-700">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
