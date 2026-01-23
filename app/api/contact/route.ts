import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/contact - Get all contact submissions (Admin only)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const read = searchParams.get('read')
    
    const where: any = {}
    
    if (read === 'true') {
      where.read = true
    } else if (read === 'false') {
      where.read = false
    }

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(contacts)),
      count: contacts.length
    })
  } catch (error: any) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch contacts',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// POST /api/contact - Submit contact form
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          message: 'Name, email, and message are required' 
        },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email',
          message: 'Please provide a valid email address' 
        },
        { status: 400 }
      )
    }
    
    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        message: body.message,
        subject: body.subject || ''
      }
    })
    
    // TODO: Send email notification to admin
    // await sendEmailNotification(contact)
    
    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(contact)),
      message: 'Message sent successfully! We will contact you soon.'
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error submitting contact:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit contact form',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
