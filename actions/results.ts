'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getResults() {
  try {
    const results = await prisma.result.findMany({
      where: { active: true },
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

export async function getAllResults() {
  try {
    const results = await prisma.result.findMany({
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

export async function createResult(data: { image: string; active?: boolean; order?: number }) {
  try {
    const result = await prisma.result.create({
      data: {
        image: data.image,
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

export async function updateResult(id: string, data: { image?: string; active?: boolean; order?: number }) {
  try {
    const result = await prisma.result.update({
      where: { id },
      data: {
        ...(data.image !== undefined && { image: data.image }),
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