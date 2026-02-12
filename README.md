# Sabina Academy Website

Modern, full-stack educational platform built with Next.js 14, TypeScript, PostgreSQL, and Prisma ORM.

## 🎨 Design Features

- **Orange & Gray Color Scheme** - Professional and vibrant brand colors
- **Multi-language Support** - English, Azerbaijani, and Russian
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Framer Motion for engaging user experience
- **Admin Panel** - Complete content management system

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Internationalization**: next-intl
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
sabina-academy/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── admin/         # Admin dashboard
│   │   ├── courses/       # Course pages
│   │   ├── camps/         # Summer camp pages
│   │   ├── results/       # Student results
│   │   ├── about/         # About page
│   │   └── contact/       # Contact page
│   └── api/               # API routes
├── components/
│   ├── layout/            # Layout components (Nav, Footer)
│   ├── ui/                # Reusable UI components
│   ├── admin/             # Admin-specific components
│   └── forms/             # Form components
├── lib/
│   ├── prisma.ts          # Prisma client
│   ├── utils.ts           # Utility functions
│   ├── auth/              # Authentication logic
│   └── validations/       # Zod schemas
├── prisma/
│   └── schema.prisma      # Database schema
├── messages/              # Translation files
│   ├── en.json
│   ├── az.json
│   └── ru.json
├── public/                # Static assets
├── types/                 # TypeScript types
└── hooks/                 # Custom React hooks
```

## 🗄️ Database Models

- **User** - Admin users
- **Course** - Language courses (IELTS, Pre-IELTS, etc.)
- **SummerCamp** - Summer camp programs
- **Result** - Student achievements
- **Gallery** - Image gallery
- **Contact** - Contact form submissions
- **Post** - Blog/news posts
- **FAQ** - Frequently asked questions
- **Settings** - Site configuration

All models support multi-language translations (EN, AZ, RU).

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Update the following variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your app URL

### 3. Set Up Database

```bash
# Create database (if not exists)
# Then push schema
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Optional: Seed database
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Admin Panel Access

The admin panel will be available at `/en/admin` (or `/az/admin`, `/ru/admin`).

First, create an admin user directly in the database or via seed script.

## 🎨 Customization

### Brand Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: { /* Orange shades */ },
  secondary: { /* Gray shades */ }
}
```

### Fonts

Update in `app/layout.tsx`:
- Display font: Montserrat (headings)
- Body font: Poppins (paragraphs)

### Translations

Add/edit translations in `messages/` folder:
- `en.json` - English
- `az.json` - Azerbaijani
- `ru.json` - Russian

## 🚀 Deployment

### Database

1. Set up PostgreSQL database (Railway, Supabase, or Neon)
2. Update `DATABASE_URL` in production environment
3. Run migrations: `npx prisma migrate deploy`

### Application

Deploy to Vercel, Netlify, or any Node.js hosting:

```bash
npm run build
npm start
```

## 📦 Key Features

### Frontend
- ✅ Modern, responsive design
- ✅ Multi-language support (EN/AZ/RU)
- ✅ Smooth animations
- ✅ SEO optimized
- ✅ Mobile-friendly navigation

### Admin Panel
- ✅ Course management
- ✅ Summer camp management
- ✅ Results/achievements management
- ✅ Gallery management
- ✅ Contact form management
- ✅ Blog/news management
- ✅ Multi-language content

### Database
- ✅ Relational database with Prisma
- ✅ Translation support
- ✅ Image handling
- ✅ Type-safe queries

## 📄 License

All rights reserved - Sabina Academy 2026

## 🤝 Support

For support, email info@sabinaacademy.com

---

Built with ❤️ for Sabina Academy
