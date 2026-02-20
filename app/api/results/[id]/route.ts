import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/results/[id] - Get single result by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const result = await prisma.result.findUnique({
      where: { id }
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

    const result = await prisma.result.update({
      where: { id },
      data: {
        ...(body.image !== undefined && { image: body.image }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.active !== undefined && { active: body.active }),
        ...(body.order !== undefined && { order: body.order })
      }
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