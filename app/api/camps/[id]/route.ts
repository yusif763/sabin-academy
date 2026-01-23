import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/camps/[id] - Get single camp by ID or slug
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale')
    const { id } = params

    // Try to find by ID first, then by slug
    let camp = await prisma.summerCamp.findUnique({
      where: { id },
      include: { translations: locale ? { where: { locale } } : true }
    })

    if (!camp) {
      // Try finding by slug
      camp = await prisma.summerCamp.findUnique({
        where: { slug: id },
        include: { translations: locale ? { where: { locale } } : true }
      })
    }

    if (!camp) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Camp not found' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(camp))
    })
  } catch (error: any) {
    console.error('Error fetching camp:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch camp',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// PUT /api/camps/[id] - Update camp
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { id } = params

    // Delete existing translations

    // Update camp with new translations
    const camp = await prisma.summerCamp.update({
      where: { id },
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
      message: 'Camp updated successfully'
    })
  } catch (error: any) {
    console.error('Error updating camp:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update camp',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// DELETE /api/camps/[id] - Delete camp
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await prisma.summerCamp.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Camp deleted successfully'
    })
  } catch (error: any) {
    console.error('Error deleting camp:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete camp',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
