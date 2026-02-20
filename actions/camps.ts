''

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCamps(locale: string = 'en') {
    try {
        const camps = await prisma.summerCamp.findMany({
            where: { active: true },
            include: {
                translations: { where: { locale } },
                gallery: { orderBy: { order: 'asc' } }
            },
            orderBy: [{ year: 'desc' }, { featured: 'desc' }, { startDate: 'desc' }]
        })
        return JSON.parse(JSON.stringify(camps))
    } catch (error) {
        console.error('Error fetching camps:', error)
        return []
    }
}

export async function getAllCamps() {
    try {
        const camps = await prisma.summerCamp.findMany({
            include: {
                translations: true,
                gallery: { orderBy: { order: 'asc' } }
            },
            orderBy: [{ year: 'desc' }, { startDate: 'desc' }]
        })
        return JSON.parse(JSON.stringify(camps))
    } catch (error) {
        console.error('Error fetching all camps:', error)
        return []
    }
}

export async function getCampBySlug(slug: string, locale: string = 'en') {
    try {
        const camp = await prisma.summerCamp.findUnique({
            where: { slug },
            include: {
                translations: true,
                gallery: { orderBy: { order: 'asc' } }
            }
        })

        console.log('Camp found:', camp?.id, 'slug:', slug)  // ← LOG
        return camp ? JSON.parse(JSON.stringify(camp)) : null
    } catch (error) {
        console.error('getCampBySlug ERROR:', error)  // ← LOG
        return null
    }
}

export async function getCampById(id: string) {
    try {
        const camp = await prisma.summerCamp.findUnique({
            where: { id },
            include: {
                translations: true,
                gallery: { orderBy: { order: 'asc' } }
            }
        })
        return camp ? JSON.parse(JSON.stringify(camp)) : null
    } catch (error) {
        console.error('Error fetching camp:', error)
        return null
    }
}

export async function createCamp(data: any) {
    try {
        const camp = await prisma.summerCamp.create({
            data: {
                slug: data.slug,
                year: data.year,
                location: data.location,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                image: data.image || null,
                featured: data.featured || false,
                active: data.active !== undefined ? data.active : true,
                spots: data.spots ? Number(data.spots) : null,
                price: data.price || null,
                ageRange: data.ageRange || null,
                translations: {
                    create: data.translations.map((t: any) => ({
                        locale: t.locale,
                        title: t.title,
                        description: t.description,
                        activities: t.activities?.filter(Boolean) || [],
                        includes: t.includes?.filter(Boolean) || [],
                        highlights: t.highlights?.filter(Boolean) || []
                    }))
                }
            }
        })

        revalidatePath('/camps')
        revalidatePath('/admin/camps')
        return JSON.parse(JSON.stringify(camp))
    } catch (error: any) {
        console.error('Error creating camp:', error)
        throw new Error(error.message || 'Failed to create camp')
    }
}

export async function updateCamp(id: string, data: any) {
    try {
        await prisma.summerCampTranslation.deleteMany({
            where: { summerCampId: id }
        })

        const camp = await prisma.summerCamp.update({
            where: { id },
            data: {
                slug: data.slug,
                year: data.year,
                location: data.location,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                image: data.image || null,
                featured: data.featured || false,
                active: data.active !== undefined ? data.active : true,
                spots: data.spots ? Number(data.spots) : null,
                price: data.price || null,
                ageRange: data.ageRange || null,
                translations: {
                    create: data.translations.map((t: any) => ({
                        locale: t.locale,
                        title: t.title,
                        description: t.description,
                        activities: t.activities?.filter(Boolean) || [],
                        includes: t.includes?.filter(Boolean) || [],
                        highlights: t.highlights?.filter(Boolean) || []
                    }))
                }
            }
        })

        revalidatePath('/camps')
        revalidatePath(`/camps/${data.slug}`)
        revalidatePath('/admin/camps')
        return JSON.parse(JSON.stringify(camp))
    } catch (error: any) {
        console.error('Error updating camp:', error)
        throw new Error(error.message || 'Failed to update camp')
    }
}

export async function deleteCamp(id: string) {
    try {
        await prisma.summerCamp.delete({ where: { id } })
        revalidatePath('/camps')
        revalidatePath('/admin/camps')
        return { success: true }
    } catch (error: any) {
        console.error('Error deleting camp:', error)
        throw new Error(error.message || 'Failed to delete camp')
    }
}

// Gallery
export async function getCampGallery(campId: string) {
    const images = await prisma.campGallery.findMany({
        where: { campId },
        orderBy: { order: 'asc' }
    })
    return JSON.parse(JSON.stringify(images))
}

export async function addGalleryImage(campId: string, image: string) {
    const count = await prisma.campGallery.count({ where: { campId } })
    const item = await prisma.campGallery.create({
        data: { campId, image, order: count }
    })
    revalidatePath('/camps')
    return JSON.parse(JSON.stringify(item))
}

export async function deleteGalleryImage(id: string) {
    await prisma.campGallery.delete({ where: { id } })
    revalidatePath('/camps')
    return { success: true }
}