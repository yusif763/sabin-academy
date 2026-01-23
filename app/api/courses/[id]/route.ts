import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/courses/[id] - Get single course by ID or slug
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale')
    const { id } = params

    // Try to find by ID first, then by slug
    let course = await prisma.course.findUnique({
      where: { id },
      include: { translations: locale ? { where: { locale } } : true }
    })

    if (!course) {
      // Try finding by slug
      course = await prisma.course.findUnique({
        where: { slug: id },
        include: { translations: locale ? { where: { locale } } : true }
      })
    }

    if (!course) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Course not found' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(course))
    })
  } catch (error: any) {
    console.error('Error fetching course:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch course',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// PUT /api/courses/[id] - Update course
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { id } = params

    // Delete existing translations
    await prisma.courseTranslation.deleteMany({ 
      where: { courseId: id } 
    })

    // Update course with new translations
    const course = await prisma.course.update({
      where: { id },
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
      message: 'Course updated successfully'
    })
  } catch (error: any) {
    console.error('Error updating course:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update course',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// DELETE /api/courses/[id] - Delete course
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await prisma.course.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully'
    })
  } catch (error: any) {
    console.error('Error deleting course:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete course',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
