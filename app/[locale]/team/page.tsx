import { getTranslations } from 'next-intl/server'
import { getTeamMembers } from '@/actions/team'
import Image from 'next/image'
import { Users, Mail, Linkedin } from 'lucide-react'

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
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {members.map((member: any) => {
                                const trans = member.translations[0]
                                return (
                                    <div
                                        key={member.id}
                                        className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                                    >
                                        {/* Photo */}
                                        <div className="relative h-80 overflow-hidden bg-secondary-100">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                unoptimized
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-secondary-900 mb-1">
                                                {member.name}
                                            </h3>
                                            <p className="text-primary-600 font-semibold mb-3">
                                                {trans?.position}
                                            </p>

                                            {trans?.bio && (
                                                <p className="text-sm text-secondary-600 mb-4 line-clamp-3">
                                                    {trans.bio}
                                                </p>
                                            )}

                                            {member.email && (
                                                <div className="pt-4 border-t border-secondary-100">
                                                    <a
                                                        href={`mailto:${member.email}`}
                                                        className="inline-flex items-center text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                                                    >
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        {member.email}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
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