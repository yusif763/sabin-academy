# Sabina Academy - Quraşdırma Təlimatları

## 📋 Tələblər

- Node.js 18+ və npm
- PostgreSQL 14+
- Git

## 🚀 Addım-addım Quraşdırma

### 1. Repository-ni Klonlayın

```bash
git clone <repository-url>
cd sabina-academy
```

### 2. Asılılıqları Quraşdırın

```bash
npm install
```

Bu prosesdə bütün lazımi paketlər yüklənəcək və Prisma Client yaradılacaq.

### 3. Environment Dəyişənlərini Konfiqurasiya Edin

`.env.example` faylından `.env` faylı yaradın:

```bash
cp .env.example .env
```

`.env` faylını redaktə edin:

```env
# PostgreSQL verilənlər bazası
DATABASE_URL="postgresql://username:password@localhost:5432/sabina_academy?schema=public"

# NextAuth təhlükəsizlik açarı
NEXTAUTH_SECRET="buraya-güclü-açar-yazın"  # openssl rand -base64 32 ilə yarada bilərsiniz
NEXTAUTH_URL="http://localhost:3000"

# Tətbiq URL-i
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Qeyd:** `NEXTAUTH_SECRET` yaratmaq üçün terminalda bu əmri işlədin:
```bash
openssl rand -base64 32
```

### 4. PostgreSQL Verilənlər Bazası

#### Windows (pgAdmin ilə):
1. pgAdmin-i açın
2. Yeni verilənlər bazası yaradın: `sabina_academy`
3. Connection string-i `.env` faylına əlavə edin

#### Mac/Linux:
```bash
# PostgreSQL-ə daxil olun
psql -U postgres

# Verilənlər bazası yaradın
CREATE DATABASE sabina_academy;

# Çıxın
\q
```

### 5. Verilənlər Bazası Strukturunu Yaradın

```bash
# Prisma schema-nı verilənlər bazasına push edin
npm run db:push

# Başlanğıc məlumatları yükləyin (admin istifadəçi və nümunə məlumatlar)
npm run db:seed
```

**Default Admin Giriş:**
- Email: `admin@sabinaacademy.az`
- Şifrə: `admin123`

⚠️ **ÖNƏMLİ:** İstehsalda bu şifrəni dərhal dəyişdirin!

### 6. Development Serveri İşə Salın

```bash
npm run dev
```

Sayt açılacaq: [http://localhost:3000](http://localhost:3000)

Admin panelə daxil olmaq üçün: [http://localhost:3000/en/admin](http://localhost:3000/en/admin)

## 📁 Proyekt Strukturu

```
sabina-academy/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Dil-spesifik səhifələr
│   │   ├── admin/         # Admin panel
│   │   ├── courses/       # Kurslar
│   │   ├── camps/         # Yay düşərgələri
│   │   ├── results/       # Nəticələr
│   │   ├── about/         # Haqqımızda
│   │   └── contact/       # Əlaqə
│   └── api/               # API route-lar
├── components/            # React komponentlər
│   ├── layout/           # Layout komponentləri
│   ├── ui/               # UI komponentləri
│   ├── admin/            # Admin komponentləri
│   └── forms/            # Form komponentləri
├── lib/                  # Utility funksiyalar
│   ├── prisma.ts         # Prisma client
│   ├── utils.ts          # Yardımçı funksiyalar
│   └── validations/      # Zod validation
├── prisma/               # Verilənlər bazası
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed məlumatlar
├── messages/             # Tərcümələr
│   ├── en.json           # İngilis
│   ├── az.json           # Azərbaycan
│   └── ru.json           # Rus
├── public/               # Static fayllar
└── types/                # TypeScript tipləri
```

## 🎨 Rəng Sxemi

Proyekt narıncı və boz rənglərdə dizayn olunub:

- **Əsas rəng (Primary)**: Narıncı - `#f97316`
- **İkinci dərəcəli (Secondary)**: Boz - `#6b7280`

Bu rənglər `tailwind.config.js` faylında dəyişdirilə bilər.

## 🌍 Dil Dəstəyi

Sayt 3 dildə işləyir:
- 🇬🇧 İngilis (en)
- 🇦🇿 Azərbaycan (az)
- 🇷🇺 Rus (ru)

Yeni tərcümələr əlavə etmək üçün `messages/` folderində JSON faylları redaktə edin.

## 🗄️ Database Modelləri

### Əsas Modellər:
- **User** - Admin istifadəçilər
- **Course** - Kurslar (IELTS, Pre-IELTS, və s.)
- **SummerCamp** - Yay düşərgələri
- **Result** - Tələbə nəticələri
- **Gallery** - Şəkil qalereyası
- **Contact** - Əlaqə formları
- **Post** - Blog yazıları
- **FAQ** - Tez-tez verilən suallar

Bütün modellər 3 dildə tərcümə dəstəyinə malikdir.

## 📝 Məlumat Əlavə Etmək

### Admin Panel vasitəsilə:
1. [http://localhost:3000/en/admin](http://localhost:3000/en/admin) ünvanına daxil olun
2. Admin email və şifrə ilə giriş edin
3. Sol menyudan lazımi bölməni seçin (Courses, Camps, Results)
4. "Add New" düyməsinə basın
5. 3 dildə məlumat daxil edin
6. Yadda saxlayın

### Prisma Studio ilə (development):
```bash
npx prisma studio
```

Brauzerdə açılır: [http://localhost:5555](http://localhost:5555)

## 🚀 Production Deployment

### 1. Verilənlər Bazası Hazırlayın
- Railway, Supabase, və ya Neon-da PostgreSQL yaradın
- Connection string alın

### 2. Environment Dəyişənləri
Production-da bu dəyişənləri təyin edin:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="güclü-təhlükəsizlik-açarı"
NEXTAUTH_URL="https://your-domain.com"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### 3. Build və Deploy
```bash
# Build edin
npm run build

# Start edin (production server)
npm start
```

### Vercel-də Deploy:
1. GitHub-a push edin
2. Vercel-də import edin
3. Environment variables əlavə edin
4. Deploy edin

### Railway-də Database:
1. Railway.app-da PostgreSQL əlavə edin
2. Connection string-i kopyalayın
3. Environment variables-a əlavə edin

## 🔐 Təhlükəsizlik

### Production üçün vacib addımlar:
1. ✅ Admin şifrəsini dəyişdirin
2. ✅ NEXTAUTH_SECRET güclü olmalıdır
3. ✅ CORS konfiqurasiya edin
4. ✅ Rate limiting əlavə edin
5. ✅ Environment variables təhlükəsiz saxlayın

## 🐛 Problemlərin Həlli

### "Database connection failed"
- PostgreSQL işləyir?
- DATABASE_URL düzgün?
- Database mövcuddur?

### "Module not found"
```bash
rm -rf node_modules
npm install
```

### "Prisma Client error"
```bash
npx prisma generate
```

### Portlar işğal olunub
```bash
# Port 3000 boşaldın
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows
```

## 📞 Dəstək

Problem yaşayırsınız?
- Email: info@sabinaacademy.com
- Documentation: README.md faylına baxın

## 🎓 Növbəti Addımlar

1. Admin şifrəsini dəyişdirin
2. Şirkət məlumatlarını yeniləyin
3. Kurslar əlavə edin
4. Şəkillər yükləyin
5. Sosial media linklərini əlavə edin
6. SEO məlumatlarını konfiqurasiya edin

Uğurlar! 🚀
