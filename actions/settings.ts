'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getSetting(key: string) {
    try {
        const setting = await prisma.settings.findUnique({
            where: { key }
        })
        return setting?.value || null
    } catch (error) {
        console.error('Error fetching setting:', error)
        return null
    }
}

export async function updateSetting(key: string, value: string) {
    try {
        await prisma.settings.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        })

        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error('Error updating setting:', error)
        throw new Error('Failed to update setting')
    }
}

export async function getAllSettings() {
    try {
        const settings = await prisma.settings.findMany({
            orderBy: { key: 'asc' }
        })

        return settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value
            return acc
        }, {} as Record<string, string>)
    } catch (error) {
        console.error('Error fetching settings:', error)
        return {}
    }
}