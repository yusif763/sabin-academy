import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH - Mark as read/unread
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const { id } = params

        const contact = await prisma.contact.update({
            where: { id },
            data: {
                read: body.read
            }
        })

        return NextResponse.json({
            success: true,
            data: JSON.parse(JSON.stringify(contact))
        })
    } catch (error: any) {
        console.error('Error updating contact:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update contact',
                message: error.message
            },
            { status: 500 }
        )
    }
}

// DELETE - Delete contact
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params

        await prisma.contact.delete({
            where: { id }
        })

        return NextResponse.json({
            success: true,
            message: 'Contact deleted successfully'
        })
    } catch (error: any) {
        console.error('Error deleting contact:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to delete contact',
                message: error.message
            },
            { status: 500 }
        )
    }
}
