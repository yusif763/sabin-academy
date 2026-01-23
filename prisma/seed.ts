import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sabina-academy.az' },
    update: {},
    create: {
      email: 'admin@sabina-academy.az',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create sample course - IELTS
  const ielts = await prisma.course.upsert({
    where: { slug: 'ielts-preparation' },
    update: {},
    create: {
      slug: 'ielts-preparation',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
      icon: '📚',
      featured: true,
      active: true,
      order: 1,
      translations: {
        create: [
          {
            locale: 'en',
            title: 'IELTS Preparation',
            description: 'Comprehensive IELTS preparation course with expert instructors. Achieve your target band score with our proven methodology.',
            highlights: [
              'All 4 modules covered (Reading, Writing, Listening, Speaking)',
              'Mock tests and practice materials',
              'Personal feedback and guidance',
              'Flexible schedule options'
            ],
            duration: '3 months',
            price: '500 AZN',
            schedule: 'Mon-Wed-Fri, 18:00-20:00'
          },
          {
            locale: 'az',
            title: 'IELTS Hazırlıq',
            description: 'Mütəxəssis müəllimlərlə hərtərəfli IELTS hazırlıq kursu.',
            highlights: [
              'Bütün 4 modul (Oxu, Yaz, Dinlə, Danış)',
              'Mock testlər',
              'Şəxsi rəy',
              'Çevik cədvəl'
            ],
            duration: '3 ay',
            price: '500 AZN',
            schedule: 'B.e-Ç.a-C, 18:00-20:00'
          },
          {
            locale: 'ru',
            title: 'Подготовка к IELTS',
            description: 'Комплексный курс подготовки к IELTS.',
            highlights: [
              'Все 4 модуля',
              'Пробные тесты',
              'Личная обратная связь',
              'Гибкий график'
            ],
            duration: '3 месяца',
            price: '500 AZN',
            schedule: 'Пн-Ср-Пт, 18:00-20:00'
          }
        ]
      }
    }
  })

  console.log('✅ Sample course created:', ielts.slug)

  // Create sample camp
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
      gallery: [
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
        'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800'
      ],
      featured: true,
      active: true,
      spots: 25,
      price: '2500 EUR',
      ageRange: '12-17',
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

  console.log('✅ Sample camp created:', londonCamp.slug)

  // Create sample result
  const existingResult = await prisma.result.findFirst({
    where: { studentName: 'Aysel Məmmədova' }
  })

  if (!existingResult) {
    const result = await prisma.result.create({
      data: {
        studentName: 'Aysel Məmmədova',
        score: '8.5',
        testType: 'IELTS',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        featured: true,
        active: true,
        date: new Date('2024-12-15'),
        translations: {
          create: [
            {
              locale: 'en',
              testimonial: 'Thanks to Sabina Academy, I achieved my dream score!',
              courseType: 'IELTS Preparation'
            },
            {
              locale: 'az',
              testimonial: 'Sabina Academy sayəsində arzuladığım balı əldə etdim!',
              courseType: 'IELTS Hazırlıq'
            },
            {
              locale: 'ru',
              testimonial: 'Благодаря Sabina Academy я достигла желаемого балла!',
              courseType: 'Подготовка к IELTS'
            }
          ]
        }
      }
    })
    console.log('✅ Sample result created:', result.studentName)
  } else {
    console.log('ℹ️  Result already exists')
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
