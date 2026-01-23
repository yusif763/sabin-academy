import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/search - Search across courses, camps, and results
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const locale = searchParams.get('locale') || 'en'
    const type = searchParams.get('type') // 'courses', 'camps', 'results', or 'all'

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Search query is required',
          message: 'Please provide a search query' 
        },
        { status: 400 }
      )
    }

    const searchTerm = query.toLowerCase()
    const results: any = {
      courses: [],
      camps: [],
      results: []
    }

    // Search courses
    if (!type || type === 'all' || type === 'courses') {
      const courses = await prisma.course.findMany({
        where: {
          active: true,
          OR: [
            { slug: { contains: searchTerm, mode: 'insensitive' } },
            { translations: {
                some: {
                  locale,
                  OR: [
                    { title: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } }
                  ]
                }
              }
            }
          ]
        },
        include: {
          translations: { where: { locale } }
        },
        take: 10
      })
      results.courses = courses
    }

    // Search camps
    if (!type || type === 'all' || type === 'camps') {
      const camps = await prisma.summerCamp.findMany({
        where: {
          active: true,
          OR: [
            { slug: { contains: searchTerm, mode: 'insensitive' } },
            { location: { contains: searchTerm, mode: 'insensitive' } },
            { translations: {
                some: {
                  locale,
                  OR: [
                    { title: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } }
                  ]
                }
              }
            }
          ]
        },
        include: {
          translations: { where: { locale } }
        },
        take: 10
      })
      results.camps = camps
    }

    // Search results (student achievements)
    if (!type || type === 'all' || type === 'results') {
      const studentResults = await prisma.result.findMany({
        where: {
          active: true,
          OR: [
            { studentName: { contains: searchTerm, mode: 'insensitive' } },
            { testType: { contains: searchTerm, mode: 'insensitive' } },
            { translations: {
                some: {
                  locale,
                  OR: [
                    { testimonial: { contains: searchTerm, mode: 'insensitive' } },
                    { courseType: { contains: searchTerm, mode: 'insensitive' } }
                  ]
                }
              }
            }
          ]
        },
        include: {
          translations: { where: { locale } }
        },
        take: 10
      })
      results.results = studentResults
    }

    const totalResults = 
      results.courses.length + 
      results.camps.length + 
      results.results.length

    return NextResponse.json({
      success: true,
      query,
      totalResults,
      data: JSON.parse(JSON.stringify(results))
    })
  } catch (error: any) {
    console.error('Error performing search:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Search failed',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
