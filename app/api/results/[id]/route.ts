import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/results/[id] - Get single result by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale')
    const { id } = params

    const result = await prisma.result.findUnique({
      where: { id },
      include: { translations: locale ? { where: { locale } } : true }
    })

    if (!result) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Result not found' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(result))
    })
  } catch (error: any) {
    console.error('Error fetching result:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch result',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// PUT /api/results/[id] - Update result
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { id } = params

    // Delete existing translations
    await prisma.resultTranslation.deleteMany({ 
      where: { resultId: id } 
    })

    // Update result with new translations
    const result = await prisma.result.update({
      where: { id },
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
      message: 'Result updated successfully'
    })
  } catch (error: any) {
    console.error('Error updating result:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update result',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// DELETE /api/results/[id] - Delete result
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await prisma.result.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Result deleted successfully'
    })
  } catch (error: any) {
    console.error('Error deleting result:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete result',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
