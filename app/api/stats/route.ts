import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/stats - Get website statistics
export async function GET() {
  try {
    // Get counts
    const [
      totalCourses,
      activeCourses,
      featuredCourses,
      totalCamps,
      activeCamps,
      featuredCamps,
      totalResults,
      activeResults,
      totalContacts,
      unreadContacts
    ] = await Promise.all([
      prisma.course.count(),
      prisma.course.count({ where: { active: true } }),
      prisma.course.count({ where: { featured: true } }),
      prisma.summerCamp.count(),
      prisma.summerCamp.count({ where: { active: true } }),
      prisma.summerCamp.count({ where: { featured: true } }),
      prisma.result.count(),
      prisma.result.count({ where: { active: true } }),
      prisma.contact.count(),
      prisma.contact.count({ where: { read: false } })
    ])

    // Get latest entries
    const [latestCourse, latestCamp, latestResult, latestContact] = await Promise.all([
      prisma.course.findFirst({
        orderBy: { createdAt: 'desc' },
        include: { translations: { where: { locale: 'en' } } }
      }),
      prisma.summerCamp.findFirst({
        orderBy: { createdAt: 'desc' },
        include: { translations: { where: { locale: 'en' } } }
      }),
      prisma.result.findFirst({
        orderBy: { createdAt: 'desc' }
      }),
      prisma.contact.findFirst({
        orderBy: { createdAt: 'desc' }
      })
    ])

    const stats = {
      courses: {
        total: totalCourses,
        active: activeCourses,
        featured: featuredCourses,
        latest: latestCourse
      },
      camps: {
        total: totalCamps,
        active: activeCamps,
        featured: featuredCamps,
        latest: latestCamp
      },
      results: {
        total: totalResults,
        active: activeResults,
        latest: latestResult
      },
      contacts: {
        total: totalContacts,
        unread: unreadContacts,
        latest: latestContact
      },
      overview: {
        totalCourses,
        totalCamps,
        totalResults,
        unreadContacts
      }
    }

    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(stats))
    })
  } catch (error: any) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch statistics',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
