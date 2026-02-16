import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seeding...')

    // Admin credentials from .env
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    // if (!adminEmail || !adminPassword) {
    //     throw new Error('❌ ADMIN_EMAIL və ADMIN_PASSWORD .env faylında set olunmalıdır!')
    // }
    //
    // const hashedPassword = await bcrypt.hash(adminPassword, 10)
    //
    // const admin = await prisma.user.upsert({
    //     where: { email: adminEmail },
    //     update: {},
    //     create: {
    //         email: adminEmail,
    //         password: hashedPassword,
    //         name: 'Admin',
    //         role: 'admin',
    //     },
    // })
    //
    // console.log('✅ Admin user created:', admin.email)
    //
    // // Create sample course - IELTS
    // const ielts = await prisma.course.upsert({
    //     where: { slug: 'ielts-preparation' },
    //     update: {},
    //     create: {
    //         slug: 'ielts-preparation',
    //         image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
    //         icon: '📚',
    //         featured: true,
    //         active: true,
    //         order: 1,
    //         translations: {
    //             create: [
    //                 {
    //                     locale: 'en',
    //                     title: 'IELTS Preparation',
    //                     description: 'Comprehensive IELTS preparation course with expert instructors. Achieve your target band score with our proven methodology.',
    //                     highlights: [
    //                         'All 4 modules covered (Reading, Writing, Listening, Speaking)',
    //                         'Mock tests and practice materials',
    //                         'Personal feedback and guidance',
    //                         'Flexible schedule options'
    //                     ],
    //                     duration: '3 months',
    //                     price: '500 AZN',
    //                     schedule: 'Mon-Wed-Fri, 18:00-20:00'
    //                 },
    //                 {
    //                     locale: 'az',
    //                     title: 'IELTS Hazırlıq',
    //                     description: 'Mütəxəssis müəllimlərlə hərtərəfli IELTS hazırlıq kursu.',
    //                     highlights: [
    //                         'Bütün 4 modul (Oxu, Yaz, Dinlə, Danış)',
    //                         'Mock testlər',
    //                         'Şəxsi rəy',
    //                         'Çevik cədvəl'
    //                     ],
    //                     duration: '3 ay',
    //                     price: '500 AZN',
    //                     schedule: 'B.e-Ç.a-C, 18:00-20:00'
    //                 },
    //                 {
    //                     locale: 'ru',
    //                     title: 'Подготовка к IELTS',
    //                     description: 'Комплексный курс подготовки к IELTS.',
    //                     highlights: [
    //                         'Все 4 модуля',
    //                         'Пробные тесты',
    //                         'Личная обратная связь',
    //                         'Гибкий график'
    //                     ],
    //                     duration: '3 месяца',
    //                     price: '500 AZN',
    //                     schedule: 'Пн-Ср-Пт, 18:00-20:00'
    //                 }
    //             ]
    //         }
    //     }
    // })
    //
    // console.log('✅ Sample course created:', ielts.slug)
    //
    // // Create sample camp
    const londonCamp = await prisma.summerCamp.upsert({
        where: { slug: 'london-2026' },
        update: {},
        create: {
            slug: 'london-2026',
            year: 2026,
            location: 'London, UK',
            startDate: new Date('2026-07-01'),
            endDate: new Date('2026-07-21'),
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
            featured: true,
            active: true,
            spots: 25,
            price: '2500 EUR',
            ageRange: '12-17',
            // ✅ gallery - relation kimi əlavə et
            gallery: {
                create: [
                    {
                        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
                        order: 0
                    },
                    {
                        image: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800',
                        order: 1
                    },
                    {
                        image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800',
                        order: 2
                    }
                ]
            },
            translations: {
                create: [
                    {
                        locale: 'en',
                        title: 'London Summer Camp 2026',
                        description: 'Explore historic London while improving your English skills.',
                        activities: [
                            'Visit Big Ben',
                            'Tour British Museum',
                            'English classes',
                            'Thames cruise'
                        ],
                        includes: [
                            'Accommodation',
                            'All meals',
                            'Transportation',
                            'English classes'
                        ],
                        highlights: [
                            'Native teachers',
                            'International group',
                            'Safe environment'
                        ]
                    },
                    {
                        locale: 'az',
                        title: 'London Yay Düşərgəsi 2026',
                        description: 'İngilis dilini təkmilləşdirərkən London kəşf edin.',
                        activities: [
                            'Big Ben ziyarəti',
                            'Britaniya Muzeyi',
                            'İngilis dərsləri',
                            'Thames gəzintisi'
                        ],
                        includes: [
                            'Yerləşmə',
                            'Yeməklər',
                            'Nəqliyyat',
                            'Dərslər'
                        ],
                        highlights: [
                            'Doğma müəllimlər',
                            'Beynəlxalq qrup',
                            'Təhlükəsiz'
                        ]
                    },
                    {
                        locale: 'ru',
                        title: 'Лондонский Лагерь 2026',
                        description: 'Исследуйте Лондон изучая английский.',
                        activities: [
                            'Биг-Бен',
                            'Британский музей',
                            'Уроки английского',
                            'Круиз по Темзе'
                        ],
                        includes: [
                            'Проживание',
                            'Питание',
                            'Транспорт',
                            'Уроки'
                        ],
                        highlights: [
                            'Носители языка',
                            'Группа',
                            'Безопасно'
                        ]
                    }
                ]
            }
        }
    })

    // Activities seed
    const activities = [
        {
            slug: 'swimming',
            image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800',
            featured: true,
            active: true,
            order: 1,
            images: [
                { image: 'https://images.unsplash.com/photo-1560090995-01632a28895b?w=800', caption: 'Swimming pool', order: 0 },
                { image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800', caption: 'Training session', order: 1 },
                { image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800', caption: 'Group lessons', order: 2 },
            ],
            translations: [
                {
                    locale: 'en',
                    title: 'Swimming',
                    description: 'Professional swimming lessons for all ages and skill levels.',
                    content: '<p>Our swimming program offers professional instruction for beginners to advanced swimmers. Learn proper technique, build endurance, and enjoy the water safely.</p><p>Classes are available for all age groups with certified instructors.</p>'
                },
                {
                    locale: 'az',
                    title: 'Üzgüçülük',
                    description: 'Bütün yaş və bacarıq səviyyələri üçün peşəkar üzgüçülük dərsləri.',
                    content: '<p>Üzgüçülük proqramımız başlanğıcdan peşəkar səviyyəyə qədər təlim təklif edir. Düzgün texnika öyrənin, dözümlülük qurun və suda təhlükəsiz zövq alın.</p>'
                },
                {
                    locale: 'ru',
                    title: 'Плавание',
                    description: 'Профессиональные уроки плавания для всех возрастов.',
                    content: '<p>Наша программа плавания предлагает профессиональное обучение от начинающих до продвинутых пловцов.</p>'
                }
            ]
        },
        {
            slug: 'football',
            image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
            featured: true,
            active: true,
            order: 2,
            images: [
                { image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800', caption: 'Football training', order: 0 },
                { image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800', caption: 'Team practice', order: 1 },
                { image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800', caption: 'Match day', order: 2 },
            ],
            translations: [
                {
                    locale: 'en',
                    title: 'Football',
                    description: 'Develop your football skills with professional coaches.',
                    content: '<p>Our football program focuses on technical skills, teamwork, and tactical understanding. Suitable for all levels from beginners to competitive players.</p>'
                },
                {
                    locale: 'az',
                    title: 'Futbol',
                    description: 'Peşəkar məşqçilərlə futbol bacarıqlarınızı inkişaf etdirin.',
                    content: '<p>Futbol proqramımız texniki bacarıqlara, komanda işinə və taktiki anlayışa yönəlib. Başlanğıcdan rəqabətli oyunçulara qədər bütün səviyyələr üçün uyğundur.</p>'
                },
                {
                    locale: 'ru',
                    title: 'Футбол',
                    description: 'Развивайте навыки футбола с профессиональными тренерами.',
                    content: '<p>Наша футбольная программа ориентирована на технические навыки, командную работу и тактическое понимание игры.</p>'
                }
            ]
        },
        {
            slug: 'art-and-craft',
            image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
            featured: false,
            active: true,
            order: 3,
            images: [
                { image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800', caption: 'Art session', order: 0 },
                { image: 'https://images.unsplash.com/photo-1601623774506-7e5a2e2e0598?w=800', caption: 'Craft making', order: 1 },
            ],
            translations: [
                {
                    locale: 'en',
                    title: 'Art & Craft',
                    description: 'Express creativity through painting, drawing and handmade crafts.',
                    content: '<p>Our art and craft program encourages creativity and self-expression. Students explore various mediums including painting, drawing, sculpture, and mixed media.</p>'
                },
                {
                    locale: 'az',
                    title: 'İncəsənət və Əl İşi',
                    description: 'Rəsm, çertyoj və əl işi vasitəsilə yaradıcılığı ifadə edin.',
                    content: '<p>İncəsənət proqramımız yaradıcılığı və özünü ifadəni təşviq edir. Tələbələr rəsm, heykəltəraşlıq və qarışıq media daxil olmaqla müxtəlif materialları araşdırır.</p>'
                },
                {
                    locale: 'ru',
                    title: 'Искусство и Ремёсла',
                    description: 'Выражайте творчество через рисование и ручной труд.',
                    content: '<p>Наша программа поощряет творчество и самовыражение через живопись, скульптуру и смешанные техники.</p>'
                }
            ]
        },
        {
            slug: 'music',
            image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
            featured: false,
            active: true,
            order: 4,
            images: [
                { image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800', caption: 'Music lessons', order: 0 },
                { image: 'https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?w=800', caption: 'Band practice', order: 1 },
            ],
            translations: [
                {
                    locale: 'en',
                    title: 'Music',
                    description: 'Learn instruments, music theory and performance skills.',
                    content: '<p>Our music program covers a wide range of instruments and styles. From classical to contemporary, students develop their musical talents with experienced instructors.</p>'
                },
                {
                    locale: 'az',
                    title: 'Musiqi',
                    description: 'Musiqi alətlərini, musiqi nəzəriyyəsini və ifa bacarıqlarını öyrənin.',
                    content: '<p>Musiqi proqramımız geniş çeşiddə alətlər və üslubları əhatə edir. Klassikdən müasirə qədər tələbələr öz musiqi istedadlarını inkişaf etdirir.</p>'
                },
                {
                    locale: 'ru',
                    title: 'Музыка',
                    description: 'Изучайте инструменты, теорию музыки и навыки выступления.',
                    content: '<p>Наша музыкальная программа охватывает широкий спектр инструментов и стилей от классики до современной музыки.</p>'
                }
            ]
        },
        {
            slug: 'coding',
            image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800',
            featured: false,
            active: true,
            order: 5,
            images: [
                { image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800', caption: 'Coding class', order: 0 },
                { image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800', caption: 'Project work', order: 1 },
            ],
            translations: [
                {
                    locale: 'en',
                    title: 'Coding',
                    description: 'Learn programming and build real projects with modern technologies.',
                    content: '<p>Our coding program introduces students to programming fundamentals and modern technologies. Students build real projects and develop problem-solving skills.</p>'
                },
                {
                    locale: 'az',
                    title: 'Proqramlaşdırma',
                    description: 'Müasir texnologiyalarla proqramlaşdırma öyrənin və real layihələr qurun.',
                    content: '<p>Proqramlaşdırma proqramımız tələbələrə proqramlaşdırmanın əsaslarını və müasir texnologiyaları tanıdır. Tələbələr real layihələr qurur.</p>'
                },
                {
                    locale: 'ru',
                    title: 'Программирование',
                    description: 'Изучайте программирование и создавайте реальные проекты.',
                    content: '<p>Наша программа знакомит студентов с основами программирования и современными технологиями для создания реальных проектов.</p>'
                }
            ]
        }
    ]

    for (const activityData of activities) {
        const { images, translations, ...data } = activityData

        const existing = await prisma.activity.findUnique({
            where: { slug: data.slug }
        })

        if (existing) {
            console.log(`ℹ️  Activity already exists: ${data.slug}`)
            continue
        }

        const activity = await prisma.activity.create({
            data: {
                ...data,
                translations: {
                    create: translations
                },
                images: {
                    create: images
                }
            }
        })

        console.log(`✅ Activity created: ${activity.slug}`)
    }

    console.log('✅ Activities seeded successfully!')

    // // Create sample result
    // const existingResult = await prisma.result.findFirst({
    //     where: { studentName: 'Aysel Məmmədova' }
    // })
    //
    // if (!existingResult) {
    //     const result = await prisma.result.create({
    //         data: {
    //             studentName: 'Aysel Məmmədova',
    //             score: '8.5',
    //             testType: 'IELTS',
    //             image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    //             featured: true,
    //             active: true,
    //             date: new Date('2024-12-15'),
    //             translations: {
    //                 create: [
    //                     {
    //                         locale: 'en',
    //                         testimonial: 'Thanks to Sabina Academy, I achieved my dream score!',
    //                         courseType: 'IELTS Preparation'
    //                     },
    //                     {
    //                         locale: 'az',
    //                         testimonial: 'Sabina Academy sayəsində arzuladığım balı əldə etdim!',
    //                         courseType: 'IELTS Hazırlıq'
    //                     },
    //                     {
    //                         locale: 'ru',
    //                         testimonial: 'Благодаря Sabina Academy я достигла желаемого балла!',
    //                         courseType: 'Подготовка к IELTS'
    //                     }
    //                 ]
    //             }
    //         }
    //     })
    //     console.log('✅ Sample result created:', result.studentName)
    // } else {
    //     console.log('ℹ️  Result already exists')
    // }
    //
    // console.log('✅ Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })