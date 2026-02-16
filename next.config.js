import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "img-src 'self' data: blob: https://res.cloudinary.com https://*.unsplash.com https://*;"
                    }
                ]
            }
        ]
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
}

export default withNextIntl(nextConfig)