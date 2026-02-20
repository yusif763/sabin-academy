''

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const RESULT_CATEGORIES = ['IELTS', 'DIM9', 'DIM11', 'CAMBRIDGE'] as const
export type ResultCategory = typeof RESULT_CATEGORIES[number]

export async function getResults(category?: string) {
  try {
    const where: any = { active: true }
    if (category && category !== 'ALL') {
      where.category = category
    }
    const results = await prisma.result.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })
    return JSON.parse(JSON.stringify(results))
  } catch (error) {
    console.error('Error fetching results:', error)
    return []
  }
}

export async function getAllResults(category?: string) {
  try {
    const where: any = {}
    if (category && category !== 'ALL') {
      where.category = category
    }
    const results = await prisma.result.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
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
      where: { id }
    })
    return result ? JSON.parse(JSON.stringify(result)) : null
  } catch (error) {
    console.error('Error fetching result:', error)
    return null
  }
}

export async function createResult(data: {
  image: string
  category: string
  active?: boolean
  order?: number
}) {
  try {
    const result = await prisma.result.create({
      data: {
        image: data.image,
        category: data.category || 'IELTS',
        active: data.active !== undefined ? data.active : true,
        order: data.order || 0
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

export async function updateResult(id: string, data: {
  image?: string
  category?: string
  active?: boolean
  order?: number
}) {
  try {
    const result = await prisma.result.update({
      where: { id },
      data: {
        ...(data.image !== undefined && { image: data.image }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.active !== undefined && { active: data.active }),
        ...(data.order !== undefined && { order: data.order })
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