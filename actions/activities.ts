''

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getActivities(locale: string = 'en') {
    try {
        const activities = await prisma.activity.findMany({
            where: { active: true },
            include: {
                translations: { where: { locale } },
                images: { orderBy: { order: 'asc' } }
            },
            orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }]
        })
        return JSON.parse(JSON.stringify(activities))
    } catch (error) {
        console.error('Error fetching activities:', error)
        return []
    }
}

export async function getAllActivities() {
    try {
        const activities = await prisma.activity.findMany({
            include: {
                translations: true,
                images: { orderBy: { order: 'asc' } }
            },
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
        })
        return JSON.parse(JSON.stringify(activities))
    } catch (error) {
        console.error('Error fetching activities:', error)
        return []
    }
}

export async function getActivityBySlug(slug: string, locale: string = 'en') {
    try {
        const activity = await prisma.activity.findUnique({
            where: { slug },
            include: {
                translations: true,
                images: { orderBy: { order: 'asc' } }
            }
        })
        return activity ? JSON.parse(JSON.stringify(activity)) : null
    } catch (error) {
        console.error('Error fetching activity:', error)
        return null
    }
}

export async function getActivityById(id: string) {
    try {
        const activity = await prisma.activity.findUnique({
            where: { id },
            include: {
                translations: true,
                images: { orderBy: { order: 'asc' } }
            }
        })
        return activity ? JSON.parse(JSON.stringify(activity)) : null
    } catch (error) {
        console.error('Error fetching activity:', error)
        return null
    }
}

export async function createActivity(data: any) {
    try {
        const activity = await prisma.activity.create({
            data: {
                slug: data.slug,
                image: data.image || null,
                featured: data.featured || false,
                active: data.active !== undefined ? data.active : true,
                order: data.order || 0,
                translations: {
                    create: data.translations.map((t: any) => ({
                        locale: t.locale,
                        title: t.title,
                        description: t.description,
                        content: t.content || null
                    }))
                }
            }
        })

        revalidatePath('/activities')
        revalidatePath('/admin/activities')
        return JSON.parse(JSON.stringify(activity))
    } catch (error: any) {
        console.error('Error creating activity:', error)
        throw new Error(error.message || 'Failed to create activity')
    }
}

export async function updateActivity(id: string, data: any) {
    try {
        await prisma.activityTranslation.deleteMany({
            where: { activityId: id }
        })

        const activity = await prisma.activity.update({
            where: { id },
            data: {
                slug: data.slug,
                image: data.image || null,
                featured: data.featured || false,
                active: data.active !== undefined ? data.active : true,
                order: data.order || 0,
                translations: {
                    create: data.translations.map((t: any) => ({
                        locale: t.locale,
                        title: t.title,
                        description: t.description,
                        content: t.content || null
                    }))
                }
            }
        })

        revalidatePath('/activities')
        revalidatePath(`/activities/${data.slug}`)
        revalidatePath('/admin/activities')
        return JSON.parse(JSON.stringify(activity))
    } catch (error: any) {
        console.error('Error updating activity:', error)
        throw new Error(error.message || 'Failed to update activity')
    }
}

export async function deleteActivity(id: string) {
    try {
        await prisma.activity.delete({ where: { id } })
        revalidatePath('/activities')
        revalidatePath('/admin/activities')
        return { success: true }
    } catch (error: any) {
        console.error('Error deleting activity:', error)
        throw new Error(error.message || 'Failed to delete activity')
    }
}

// Activity Images
export async function addActivityImage(activityId: string, image: string, caption?: string) {
    const count = await prisma.activityImage.count({ where: { activityId } })
    const item = await prisma.activityImage.create({
        data: { activityId, image, caption: caption || null, order: count }
    })
    revalidatePath('/activities')
    return JSON.parse(JSON.stringify(item))
}

export async function deleteActivityImage(id: string) {
    await prisma.activityImage.delete({ where: { id } })
    revalidatePath('/activities')
    return { success: true }
}