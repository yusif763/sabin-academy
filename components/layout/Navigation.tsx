'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Menu, X, Globe } from 'lucide-react'
import { Link, usePathname, useRouter } from '@/routing'
import { useParams } from 'next/navigation'

interface NavigationProps {
  locale: string
}

export default function Navigation({ locale }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const t = useTranslations('nav')
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('courses'), href: '/courses' },
    { name: t('summerCamps'), href: '/camps' },
    { name: t('activities'), href: '/activities' },
    { name: t('results'), href: '/results' },
    { name: t('about'), href: '/about' },
    { name: t('contact'), href: '/contact' },
  ]

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ]

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
    setLangOpen(false)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-secondary-900">
                Sabina
              </span>
              <span className="text-xs text-primary-500 font-semibold">
                ACADEMY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-secondary-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-secondary-50 hover:bg-secondary-100 transition-colors"
              >
                <Globe className="w-4 h-4 text-secondary-600" />
                <span className="text-sm font-medium text-secondary-700 uppercase">
                  {locale}
                </span>
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 border border-secondary-100">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        switchLanguage(lang.code)
                        setLangOpen(false)
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-primary-50 transition-colors flex items-center space-x-3 ${
                        locale === lang.code ? 'bg-primary-50 text-primary-600' : 'text-secondary-700'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-secondary-50 hover:bg-secondary-100 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-secondary-700" />
              ) : (
                <Menu className="w-6 h-6 text-secondary-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-secondary-100 animate-slide-down">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'bg-primary-500 text-white'
                      : 'text-secondary-700 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
