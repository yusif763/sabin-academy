# Sabina Academy - Tez İstinad

## 🚀 Tez Başlanğıc

```bash
# 1. Asılılıqları quraşdır
npm install

# 2. Database yaradıb seed et
npm run db:push
npm run db:seed

# 3. Development serveri işə sal
npm run dev
```

## 🔑 Default Admin Girişi

- **URL**: http://localhost:3000/en/admin
- **Email**: admin@sabinaacademy.az
- **Şifrə**: admin123

## 📁 Əsas Fayllar

| Fayl | Məqsəd |
|------|---------|
| `app/[locale]/page.tsx` | Ana səhifə |
| `components/layout/Navigation.tsx` | Naviqasiya menyusu |
| `components/layout/Footer.tsx` | Footer |
| `prisma/schema.prisma` | Database struktur |
| `messages/*.json` | Tərcümələr |
| `tailwind.config.js` | Dizayn konfiqurasiyası |

## 🎨 Rəng Kodları

```css
/* Narıncı (Primary) */
--primary-500: #f97316

/* Boz (Secondary) */
--secondary-500: #6b7280
--secondary-900: #111827
```

## 🌍 Dil URL-ləri

- İngilis: `/en`
- Azərbaycan: `/az`
- Rus: `/ru`

## 📊 Database Modelləri

### Əsas Modellər
- **User** - Admin istifadəçilər
- **Course** - Kurslar
- **CourseTranslation** - Kurs tərcümələri
- **SummerCamp** - Yay düşərgələri
- **SummerCampTranslation** - Düşərgə tərcümələri
- **Result** - Tələbə nəticələri
- **ResultTranslation** - Nəticə tərcümələri
- **Gallery** - Şəkil qalereyası
- **Contact** - Əlaqə formaları
- **Post** - Blog yazıları
- **FAQ** - Suallar

## 🛠️ Faydalı Əmrlər

```bash
# Development
npm run dev              # Development server
npm run build           # Production build
npm start              # Production server

# Database
npm run db:push        # Schema-nı DB-yə push et
npm run db:seed        # Seed məlumatları yüklə
npx prisma studio      # Database UI

# Prisma
npx prisma generate    # Client yarad
npx prisma migrate dev # Migration yarat
```

## 📝 Yeni Kurs Əlavə Etmək

### Admin Panel ilə:
1. `/en/admin` → Login
2. "Courses" → "Add New"
3. 3 dildə məlumat daxil et
4. Save

### Kod ilə (seed.ts):
```typescript
await prisma.course.create({
  data: {
    slug: 'course-slug',
    featured: true,
    translations: {
      create: [
        { locale: 'en', title: '...', description: '...' },
        { locale: 'az', title: '...', description: '...' },
        { locale: 'ru', title: '...', description: '...' },
      ]
    }
  }
})
```

## 🎯 Əsas Səhifələr

| Səhifə | Route | Məqsəd |
|--------|-------|---------|
| Ana səhifə | `/[locale]` | Landing page |
| Kurslar | `/[locale]/courses` | Bütün kurslar |
| Düşərgələr | `/[locale]/camps` | Yay düşərgələri |
| Nəticələr | `/[locale]/results` | Tələbə nəticələri |
| Haqqımızda | `/[locale]/about` | Haqqımızda |
| Əlaqə | `/[locale]/contact` | Əlaqə formu |
| Admin | `/[locale]/admin` | Admin panel |

## 🔧 Konfiqurasiya Faylları

```
.env                      # Environment variables
next.config.js           # Next.js konfiqurasiya
tailwind.config.js       # Tailwind konfiqurasiya
tsconfig.json           # TypeScript konfiqurasiya
prisma/schema.prisma    # Database schema
i18n.ts                 # Dil konfiqurasiyası
middleware.ts           # Routing middleware
```

## 🎨 UI Komponentləri

### Hazır class-lar:
```html
<!-- Buttons -->
<button class="btn-primary">Primary Button</button>
<button class="btn-secondary">Secondary Button</button>
<button class="btn-outline">Outline Button</button>

<!-- Cards -->
<div class="card">Card Content</div>

<!-- Container -->
<div class="container-custom">Content</div>

<!-- Titles -->
<h2 class="section-title">Title</h2>
<p class="section-subtitle">Subtitle</p>

<!-- Gradient -->
<span class="gradient-text">Gradient Text</span>
<div class="gradient-bg">Gradient Background</div>
```

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Laptop */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large desktop */
```

## 🔐 Təhlükəsizlik Checklist

- [ ] Admin şifrəsini dəyişdir
- [ ] NEXTAUTH_SECRET güclü et
- [ ] Production DATABASE_URL təyin et
- [ ] Environment variables təhlükəsiz saxla
- [ ] CORS konfiqurasiya et
- [ ] Rate limiting əlavə et

## 📞 Dəstək

**Email**: info@sabinaacademy.com
**Docs**: README.md, SETUP.md

## 🎓 Növbəti Addımlar

1. ✅ Proyekti quraşdır
2. ✅ Admin şifrəsini dəyişdir
3. ⬜ Şirkət məlumatlarını yenilə
4. ⬜ Real kurslar əlavə et
5. ⬜ Şəkillər yüklə
6. ⬜ SEO optimize et
7. ⬜ Production-a deploy et

---

💡 **İpucu**: Bütün ətraflı məlumat üçün SETUP.md və README.md fayllarına baxın!
