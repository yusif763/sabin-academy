import { getTranslations } from 'next-intl/server'
import { getTeamMembers } from '@/actions/team'
import { Users } from 'lucide-react'
import TeamGrid from '@/components/TeamGrid'

export default async function TeamPage({ params }: { params: { locale: string } }) {
    const t = await getTranslations('team')
    const members = await getTeamMembers(params.locale)

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="container-custom relative z-10 text-center">
                    <Users className="w-16 h-16 mx-auto mb-6 animate-bounce" />
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                        Komandamız
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        Təcrübəli və peşəkar müəllimlərimizdən ibarət komandamızla tanış olun
                    </p>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-20">
                <div className="container-custom">
                    {members.length > 0 ? (
                        <TeamGrid members={members} />
                    ) : (
                        <div className="text-center py-20">
                            <Users className="w-16 h-16 mx-auto mb-4 text-secondary-300" />
                            <h3 className="text-2xl font-bold mb-2">Hələ komanda üzvü yoxdur</h3>
                            <p className="text-secondary-600">Tezliklə komandamızı təqdim edəcəyik</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-display font-bold mb-6">Komandamıza Qoşul</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Peşəkar müəllimlərdən ibarət komandamızın bir hissəsi olmaq istəyirsiniz?
                    </p>
                    <a
                        href="/contact"
                        className="btn-primary inline-block bg-white text-primary-600 hover:bg-secondary-50"
                    >
                        Müraciət Et
                    </a>
                </div>
            </section>
        </div>
    )
}