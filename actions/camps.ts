'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Get all camps with translations
export async function getCamps(locale: string = 'en') {
  try {
    const camps = await prisma.summerCamp.findMany({
      where: {
        active: true
      },
      include: {
        translations: {
          where: {
            locale: locale
          }
        }
      },
      orderBy: [
        { year: 'desc' },
        { featured: 'desc' },
        { startDate: 'desc' }
      ]
    })

    return JSON.parse(JSON.stringify(camps))
  } catch (error) {
    console.error('Error fetching camps:', error)
    return []
  }
}

// Get all camps for admin (no filtering)
export async function getAllCamps() {
  try {
    const camps = await prisma.summerCamp.findMany({
      include: {
        translations: true
      },
      orderBy: [
        { year: 'desc' },
        { startDate: 'desc' }
      ]
    })

    return JSON.parse(JSON.stringify(camps))
  } catch (error) {
    console.error('Error fetching all camps:', error)
    return []
  }
}

// Get camp by slug
export async function getCampBySlug(slug: string, locale: string = 'en') {
  try {
    const camp = await prisma.summerCamp.findUnique({
      where: {
        slug: slug
      },
      include: {
        translations: true
      }
    })

    return camp ? JSON.parse(JSON.stringify(camp)) : null
  } catch (error) {
    console.error('Error fetching camp:', error)
    return null
  }
}

export async function getCampById(id: string) {
    try {
        const camp = await prisma.summerCamp.findUnique({
            where: { id },
            include: { translations: true }
        })
        return camp ? JSON.parse(JSON.stringify(camp)) : null
    } catch (error) {
        console.error('Error fetching camp:', error)
        return null
    }
}

// Create camp
export async function createCamp(data: any) {
  try {
    const camp = await prisma.summerCamp.create({
      data: {
        slug: data.slug,
        year: data.year,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        image: data.image,
        gallery: data.gallery,
        featured: data.featured,
        active: data.active,
        spots: data.spots,
        price: data.price,
        ageRange: data.ageRange,
        translations: {
          create: data.translations.map((t: any) => ({
            locale: t.locale,
            title: t.title,
            description: t.description,
            activities: t.activities,
            includes: t.includes,
            highlights: t.highlights
          }))
        }
      }
    })

    revalidatePath('/camps')
    revalidatePath('/admin/camps')

    return camp ? JSON.parse(JSON.stringify(camp)) : null
  } catch (error: any) {
    console.error('Error creating camp:', error)
    throw new Error(error.message || 'Failed to create camp')
  }
}

// Update camp
export async function updateCamp(id: string, data: any) {
  try {
    // Delete existing translations
    await prisma.summerCampTranslation.deleteMany({
      where: {
        summerCampId: id
      }
    })

    // Update camp with new translations
    const camp = await prisma.summerCamp.update({
      where: {
        id: id
      },
      data: {
        slug: data.slug,
        year: data.year,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        image: data.image,
        gallery: data.gallery,
        featured: data.featured,
        active: data.active,
        spots: data.spots,
        price: data.price,
        ageRange: data.ageRange,
        translations: {
          create: data.translations.map((t: any) => ({
            locale: t.locale,
            title: t.title,
            description: t.description,
            activities: t.activities,
            includes: t.includes,
            highlights: t.highlights
          }))
        }
      }
    })

    revalidatePath('/camps')
    revalidatePath(`/camps/${data.slug}`)
    revalidatePath('/admin/camps')

    return camp ? JSON.parse(JSON.stringify(camp)) : null
  } catch (error: any) {
    console.error('Error updating camp:', error)
    throw new Error(error.message || 'Failed to update camp')
  }
}

// Delete camp
export async function deleteCamp(id: string) {
  try {
    await prisma.summerCamp.delete({
      where: {
        id: id
      }
    })

    revalidatePath('/camps')
    revalidatePath('/admin/camps')

    return JSON.parse(JSON.stringify({ success: true }))
  } catch (error: any) {
    console.error('Error deleting camp:', error)
    throw new Error(error.message || 'Failed to delete camp')
  }
}
