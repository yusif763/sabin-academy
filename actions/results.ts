'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getResults(locale: string = 'en') {
  try {
    const results = await prisma.result.findMany({
      where: { active: true },
      include: { 
        translations: { 
          where: { locale } 
        } 
      },
      orderBy: [
        { featured: 'desc' }, 
        { date: 'desc' }
      ]
    })
    
    return JSON.parse(JSON.stringify(results))
  } catch (error) {
    console.error('Error fetching results:', error)
    return []
  }
}

export async function getAllResults() {
  try {
    const results = await prisma.result.findMany({
      include: { translations: true },
      orderBy: [{ date: 'desc' }]
    })
    return JSON.parse(JSON.stringify(results))
  } catch (error) {
    console.error('Error fetching all results:', error)
    return []
  }
}

export async function getResultById(id: string) {
  try {
    const result = await prisma.result.findUnique({
      where: { id },
      include: { translations: true }
    })
    return result ? JSON.parse(JSON.stringify(result)) : null
  } catch (error) {
    console.error('Error fetching result:', error)
    return null
  }
}

export async function createResult(data: any) {
  try {
    const result = await prisma.result.create({
      data: {
        studentName: data.studentName,
        score: data.score,
        testType: data.testType,
        image: data.image || '',
        featured: data.featured || false,
        active: data.active !== undefined ? data.active : true,
        date: new Date(data.date),
        translations: {
          create: data.translations.map((t: any) => ({
            locale: t.locale,
            testimonial: t.testimonial || '',
            courseType: t.courseType || ''
          }))
        }
      }
    })
    
    revalidatePath('/results')
    revalidatePath('/admin/results')
    
    return JSON.parse(JSON.stringify(result))
  } catch (error: any) {
    console.error('Error creating result:', error)
    throw new Error(error.message || 'Failed to create result')
  }
}

export async function updateResult(id: string, data: any) {
  try {
    await prisma.resultTranslation.deleteMany({ where: { resultId: id } })
    
    const result = await prisma.result.update({
      where: { id },
      data: {
        studentName: data.studentName,
        score: data.score,
        testType: data.testType,
        image: data.image || '',
        featured: data.featured || false,
        active: data.active !== undefined ? data.active : true,
        date: new Date(data.date),
        translations: {
          create: data.translations.map((t: any) => ({
            locale: t.locale,
            testimonial: t.testimonial || '',
            courseType: t.courseType || ''
          }))
        }
      }
    })
    
    revalidatePath('/results')
    revalidatePath('/admin/results')
    
    return JSON.parse(JSON.stringify(result))
  } catch (error: any) {
    console.error('Error updating result:', error)
    throw new Error(error.message || 'Failed to update result')
  }
}

export async function deleteResult(id: string) {
  try {
    await prisma.result.delete({ where: { id } })
    
    revalidatePath('/results')
    revalidatePath('/admin/results')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting result:', error)
    throw new Error(error.message || 'Failed to delete result')
  }
}
