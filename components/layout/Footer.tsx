'use client'

import { useTranslations } from 'next-intl'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from '@/routing'

interface FooterProps {
  locale: string
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations()

  const quickLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.courses'), href: '/courses' },
    { name: t('nav.summerCamps'), href: '/camps' },
    { name: t('nav.results'), href: '/results' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/sabina_academy' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/sabina_academy' },
  ]

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold">Sabina</span>
                <span className="text-xs text-primary-400 font-semibold">ACADEMY</span>
              </div>
            </div>
            <p className="text-secondary-300 text-sm leading-relaxed">
              {t('footer.about')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-secondary-300 text-sm">
                  Səttar Bəhlulzadə küçəsi 1, Baku, Azerbaijan
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href="tel:+994501234567"
                  className="text-secondary-300 hover:text-primary-400 transition-colors text-sm"
                >
                  +994 (50) 123-45-67
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href="mailto:info@sabina-academy.az"
                  className="text-secondary-300 hover:text-primary-400 transition-colors text-sm"
                >
                  info@sabina-academy.az
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6">
              {t('footer.followUs')}
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary-800 rounded-xl flex items-center justify-center hover:bg-primary-500 transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 mt-12 pt-8 text-center">
          <p className="text-secondary-400 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
