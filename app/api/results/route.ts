import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/results - Get all results
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active')
    const category = searchParams.get('category')

    const where: any = {}

    if (active !== 'false') {
      where.active = true
    }

    if (category && category !== 'ALL') {
      where.category = category
    }

    const results = await prisma.result.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
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
        image: body.image,
        category: body.category || 'IELTS',
        active: body.active !== undefined ? body.active : true,
        order: body.order || 0
      }
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
