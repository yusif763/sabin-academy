import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            )
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, error: 'Invalid file type. Only images allowed.' },
                { status: 400 }
            )
        }

        // Validate file size (5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, error: 'File too large. Max 5MB.' },
                { status: 400 }
            )
        }

        // Generate unique filename
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const timestamp = Date.now()
        const originalName = file.name.replace(/\s+/g, '-')
        const filename = `${timestamp}-${originalName}`

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
        try {
            await mkdir(uploadsDir, { recursive: true })
        } catch (err) {
            // Directory already exists
        }

        // Save file
        const filepath = path.join(uploadsDir, filename)
        await writeFile(filepath, buffer)

        // Return public URL
        const url = `/uploads/${filename}`

        return NextResponse.json({
            success: true,
            url,
            filename
        })
    } catch (error: any) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Upload failed' },
            { status: 500 }
        )
    }
}