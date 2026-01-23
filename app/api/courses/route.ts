import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/courses - Get all courses with translations
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'en'
    const featured = searchParams.get('featured')
    const active = searchParams.get('active')

    // Build query
    const where: any = {}
    
    if (featured === 'true') {
      where.featured = true
    }
    
    if (active !== 'false') {
      where.active = true
    }

    const courses = await prisma.course.findMany({
      where,
      include: { 
        translations: locale ? { where: { locale } } : true
      },
      orderBy: [
        { featured: 'desc' }, 
        { order: 'asc' }
      ]
    })
    
    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(courses)),
      count: courses.length
    })
  } catch (error: any) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch courses',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// POST /api/courses - Create new course (Admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const course = await prisma.course.create({
      data: {
        slug: body.slug,
        image: body.image || '',
        icon: body.icon || '',
        featured: body.featured || false,
        active: body.active !== undefined ? body.active : true,
        order: body.order || 0,
        translations: {
          create: body.translations.map((t: any) => ({
            locale: t.locale,
            title: t.title,
            description: t.description,
            highlights: t.highlights || [],
            duration: t.duration || '',
            price: t.price || '',
            schedule: t.schedule || ''
          }))
        }
      },
      include: { translations: true }
    })
    
    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(course)),
      message: 'Course created successfully'
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create course',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
