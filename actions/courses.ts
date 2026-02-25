'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCourses(locale: string = 'en') {
  try {
    const courses = await prisma.course.findMany({
      where: { active: true },
      include: { 
        translations: { 
          where: { locale } 
        } 
      },
      orderBy: [
        { featured: 'desc' }, 
        { order: 'asc' }
      ]
    })
    
    return JSON.parse(JSON.stringify(courses))
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

export async function getAllCourses() {
  try {
    const courses = await prisma.course.findMany({
      include: { translations: true },
      orderBy: [{ order: 'asc' }]
    })
    return JSON.parse(JSON.stringify(courses))
  } catch (error) {
    console.error('Error fetching all courses:', error)
    return []
  }
}

export async function getCourseBySlug(slug: string, locale: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: { translations: true }
    })
    return course ? JSON.parse(JSON.stringify(course)) : null
  } catch (error) {
    console.error('Error fetching course:', error)
    return null
  }
}

export async function getCourseById(id: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { id },
      include: { translations: true }
    })
    return course ? JSON.parse(JSON.stringify(course)) : null
  } catch (error) {
    console.error('Error fetching course:', error)
    return null
  }
}

export async function createCourse(data: any) {
  try {
    const course = await prisma.course.create({
      data: {
        slug: data.slug,
        image: data.image || '',
        icon: data.icon || '',
        featured: data.featured || false,
        active: data.active !== undefined ? data.active : true,
        order: data.order || 0,
        translations: {
          create: data.translations.map((t: any) => ({
            locale: t.locale,
            title: t.title,
            description: t.description,
            highlights: t.highlights || [],
            duration: t.duration || '',
            price: t.price || '',
            schedule: t.schedule || ''
          }))
        }
      }
    })
    
    revalidatePath('/courses')
    revalidatePath('/admin/courses')
    
    return JSON.parse(JSON.stringify(course))
  } catch (error: any) {
    console.error('Error creating course:', error)
    throw new Error(error.message || 'Failed to create course')
  }
}

export async function updateCourse(id: string, data: any) {
  try {
    await prisma.courseTranslation.deleteMany({ where: { courseId: id } })
    
    const course = await prisma.course.update({
      where: { id },
      data: {
        slug: data.slug,
        image: data.image || '',
        icon: data.icon || '',
        featured: data.featured || false,
        active: data.active !== undefined ? data.active : true,
        order: data.order || 0,
        translations: {
          create: data.translations.map((t: any) => ({
            locale: t.locale,
            title: t.title,
            description: t.description,
            highlights: t.highlights || [],
            duration: t.duration || '',
            price: t.price || '',
            schedule: t.schedule || ''
          }))
        }
      }
    })
    
    revalidatePath('/courses')
    revalidatePath(`/courses/${data.slug}`)
    revalidatePath('/admin/courses')
    
    return JSON.parse(JSON.stringify(course))
  } catch (error: any) {
    console.error('Error updating course:', error)
    throw new Error(error.message || 'Failed to update course')
  }
}

export async function deleteCourse(id: string) {
  try {
    await prisma.course.delete({ where: { id } })
    
    revalidatePath('/courses')
    revalidatePath('/admin/courses')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting course:', error)
    throw new Error(error.message || 'Failed to delete course')
  }
}
