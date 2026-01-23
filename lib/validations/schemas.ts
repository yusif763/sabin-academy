import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  subject: z.string().optional(),
})

export const courseSchema = z.object({
  slug: z.string().min(1),
  image: z.string().optional(),
  icon: z.string().optional(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  translations: z.record(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      highlights: z.array(z.string()),
      duration: z.string().optional(),
      price: z.string().optional(),
      schedule: z.string().optional(),
    })
  ),
})

export const summerCampSchema = z.object({
  slug: z.string().min(1),
  year: z.number().int().positive(),
  location: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  image: z.string().optional(),
  gallery: z.array(z.string()),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  spots: z.number().int().positive().optional(),
  price: z.string().optional(),
  ageRange: z.string().optional(),
  translations: z.record(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      activities: z.array(z.string()),
      includes: z.array(z.string()),
      highlights: z.array(z.string()),
    })
  ),
})

export const resultSchema = z.object({
  studentName: z.string().min(1),
  score: z.string().min(1),
  testType: z.string().min(1),
  image: z.string().optional(),
  featured: z.boolean().default(false),
  date: z.date(),
  translations: z.record(
    z.object({
      testimonial: z.string().optional(),
      courseType: z.string().optional(),
    })
  ),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
export type CourseInput = z.infer<typeof courseSchema>
export type SummerCampInput = z.infer<typeof summerCampSchema>
export type ResultInput = z.infer<typeof resultSchema>
export type LoginInput = z.infer<typeof loginSchema>
