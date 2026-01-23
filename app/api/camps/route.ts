import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/camps - Get all camps with translations
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'en'
    const year = searchParams.get('year')
    const featured = searchParams.get('featured')
    const active = searchParams.get('active')

    // Build query
    const where: any = {}
    
    if (year) {
      where.year = parseInt(year)
    }
    
    if (featured === 'true') {
      where.featured = true
    }
    
    if (active !== 'false') {
      where.active = true
    }

    const camps = await prisma.summerCamp.findMany({
      where,
      include: { 
        translations: locale ? { where: { locale } } : true
      },
      orderBy: [
        { featured: 'desc' },
        { year: 'desc' },
        { startDate: 'asc' }
      ]
    })
    
    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(camps)),
      count: camps.length
    })
  } catch (error: any) {
    console.error('Error fetching camps:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch camps',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// POST /api/camps - Create new camp (Admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const camp = await prisma.summerCamp.create({
      data: {
        slug: body.slug,
        year: body.year,
        location: body.location,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        image: body.image || '',
        gallery: body.gallery || [],
        featured: body.featured || false,
        active: body.active !== undefined ? body.active : true,
        spots: body.spots || 0,
        price: body.price || '',
        ageRange: body.ageRange || '',
        translations: {
          create: body.translations.map((t: any) => ({
            locale: t.locale,
            title: t.title,
            description: t.description,
            activities: t.activities || [],
            includes: t.includes || [],
            highlights: t.highlights || []
          }))
        }
      },
      include: { translations: true }
    })
    
    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(camp)),
      message: 'Camp created successfully'
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating camp:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create camp',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
