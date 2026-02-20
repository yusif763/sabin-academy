''

import { prisma } from '@/lib/prisma'

export async function submitContact(data: any) {
  try {
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        message: data.message,
        subject: data.subject || ''
      }
    })
    return JSON.parse(JSON.stringify(contact))
  } catch (error: any) {
    console.error('Error submitting contact:', error)
    throw new Error(error.message || 'Failed to submit contact')
  }
}

export async function getContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return JSON.parse(JSON.stringify(contacts))
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return []
  }
}

export async function markContactAsRead(id: string) {
  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: { read: true }
    })
    return JSON.parse(JSON.stringify(contact))
  } catch (error: any) {
    console.error('Error marking contact as read:', error)
    throw new Error(error.message || 'Failed to mark as read')
  }
}

export async function deleteContact(id: string) {
  try {
    await prisma.contact.delete({ where: { id } })
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting contact:', error)
    throw new Error(error.message || 'Failed to delete contact')
  }
}
