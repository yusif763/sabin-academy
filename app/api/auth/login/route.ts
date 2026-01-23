import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Create response with cookie
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        })

        // Set cookie
        response.cookies.set('admin-token', user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        })

        return response
    } catch (error: any) {
        console.error('Login error:', error)
        return NextResponse.json(
            { success: false, error: 'Login failed' },
            { status: 500 }
        )
    }
}