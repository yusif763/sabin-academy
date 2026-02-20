'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getTeamMembers(locale: string = 'en') {
  try {
    const members = await prisma.teamMember.findMany({
      where: { active: true },
      include: {
        translations: {
          where: { locale }
        }
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })
    return JSON.parse(JSON.stringify(members))
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export async function getAllTeamMembers() {
  try {
    const members = await prisma.teamMember.findMany({
      include: {
        translations: true
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })
    return JSON.parse(JSON.stringify(members))
  } catch (error) {
    console.error('Error fetching all team members:', error)
    return []
  }
}

export async function getTeamMemberById(id: string) {
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id },
      include: {
        translations: true
      }
    })
    return member ? JSON.parse(JSON.stringify(member)) : null
  } catch (error) {
    console.error('Error fetching team member:', error)
    return null
  }
}

export async function createTeamMember(data: any) {
  try {
    const member = await prisma.teamMember.create({
      data: {
        name: data.name,
        image: data.image,
        email: data.email || null,
        active: data.active !== undefined ? data.active : true,
        order: data.order || 0,
        translations: {
          create: data.translations.map((t: any) => ({
            locale: t.locale,
            position: t.position || '',
            bio: t.bio || ''
          }))
        }
      }
    })

    revalidatePath('/team')
    revalidatePath('/admin/team')

    return JSON.parse(JSON.stringify(member))
  } catch (error: any) {
    console.error('Error creating team member:', error)
    throw new Error(error.message || 'Failed to create team member')
  }
}

export async function updateTeamMember(id: string, data: any) {
  try {
    await prisma.teamMemberTranslation.deleteMany({ where: { teamMemberId: id } })

    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: data.name,
        image: data.image,
        email: data.email || null,
        active: data.active !== undefined ? data.active : true,
        order: data.order || 0,
        translations: {
          create: data.translations.map((t: any) => ({
            locale: t.locale,
            position: t.position || '',
            bio: t.bio || ''
          }))
        }
      }
    })

    revalidatePath('/team')
    revalidatePath('/admin/team')

    return JSON.parse(JSON.stringify(member))
  } catch (error: any) {
    console.error('Error updating team member:', error)
    throw new Error(error.message || 'Failed to update team member')
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({ where: { id } })

    revalidatePath('/team')
    revalidatePath('/admin/team')

    return { success: true }
  } catch (error: any) {
    console.error('Error deleting team member:', error)
    throw new Error(error.message || 'Failed to delete team member')
  }
}