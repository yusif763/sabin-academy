import type { Metadata } from 'next'
import { Poppins, Montserrat } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-geist-sans',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'Sabina Academy - Leading Education Center in Baku',
  description: 'Transform your future with Sabina Academy. IELTS preparation, language courses, and unforgettable summer camps in Baku, Azerbaijan.',
  keywords: ['IELTS', 'English courses', 'Summer camps', 'Education', 'Baku', 'Azerbaijan', 'Language learning'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${poppins.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  )
}
