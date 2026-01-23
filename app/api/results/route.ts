import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/results - Get all student results with translations
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'en'
    const featured = searchParams.get('featured')
    const testType = searchParams.get('testType')
    const active = searchParams.get('active')

    // Build query
    const where: any = {}
    
    if (featured === 'true') {
      where.featured = true
    }
    
    if (testType) {
      where.testType = testType
    }
    
    if (active !== 'false') {
      where.active = true
    }

    const results = await prisma.result.findMany({
      where,
      include: { 
        translations: locale ? { where: { locale } } : true
      },
      orderBy: [
        { featured: 'desc' },
        { date: 'desc' }
      ]
    })
    
    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(results)),
      count: results.length
    })
  } catch (error: any) {
    console.error('Error fetching results:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch results',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// POST /api/results - Create new result (Admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const result = await prisma.result.create({
      data: {
        studentName: body.studentName,
        score: body.score,
        testType: body.testType,
        image: body.image || '',
        featured: body.featured || false,
        active: body.active !== undefined ? body.active : true,
        date: new Date(body.date),
        translations: {
          create: body.translations.map((t: any) => ({
            locale: t.locale,
            testimonial: t.testimonial || '',
            courseType: t.courseType || ''
          }))
        }
      },
      include: { translations: true }
    })
    
    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(result)),
      message: 'Result created successfully'
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating result:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create result',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
