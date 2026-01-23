import { Course, SummerCamp, Result, Post, FAQ } from '@prisma/client'

// Extended types with translations
export type CourseWithTranslations = Course & {
  translations: Array<{
    locale: string
    title: string
    description: string
    highlights: string[]
    duration?: string
    price?: string
    schedule?: string
  }>
}

export type SummerCampWithTranslations = SummerCamp & {
  translations: Array<{
    locale: string
    title: string
    description: string
    activities: string[]
    includes: string[]
    highlights: string[]
  }>
}

export type ResultWithTranslations = Result & {
  translations: Array<{
    locale: string
    testimonial?: string
    courseType?: string
  }>
}

export type PostWithTranslations = Post & {
  translations: Array<{
    locale: string
    title: string
    excerpt?: string
    content: string
  }>
}

export type FAQWithTranslations = FAQ & {
  translations: Array<{
    locale: string
    question: string
    answer: string
  }>
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  subject?: string
}

export interface CourseFormData {
  slug: string
  image?: string
  icon?: string
  featured: boolean
  active: boolean
  translations: {
    [locale: string]: {
      title: string
      description: string
      highlights: string[]
      duration?: string
      price?: string
      schedule?: string
    }
  }
}

export interface SummerCampFormData {
  slug: string
  year: number
  location: string
  startDate: Date
  endDate: Date
  image?: string
  gallery: string[]
  featured: boolean
  active: boolean
  spots?: number
  price?: string
  ageRange?: string
  translations: {
    [locale: string]: {
      title: string
      description: string
      activities: string[]
      includes: string[]
      highlights: string[]
    }
  }
}

export interface ResultFormData {
  studentName: string
  score: string
  testType: string
  image?: string
  featured: boolean
  date: Date
  translations: {
    [locale: string]: {
      testimonial?: string
      courseType?: string
    }
  }
}

// Locale type
export type Locale = 'en' | 'az' | 'ru'

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
