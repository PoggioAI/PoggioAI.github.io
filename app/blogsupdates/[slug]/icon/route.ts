import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { getAllPostSlugs } from '@/lib/blogs';

export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

export async function GET(
    request: Request,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params;

    // Security check: prevent directory traversal
    if (slug.includes('..')) {
        return new NextResponse('Invalid path', { status: 400 });
    }

    let filePath = path.join(
        process.cwd(),
        'content/blogs',
        slug,
        'blog.svg'
    );

    if (!fs.existsSync(filePath)) {
        // Fallback to cover.svg
        filePath = path.join(
            process.cwd(),
            'content/blogs',
            slug,
            'cover.svg'
        );

        if (!fs.existsSync(filePath)) {
            return new NextResponse('File not found', { status: 404 });
        }
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
        headers: {
            'Content-Type': 'image/svg+xml',
            // Disable caching during development/debugging of animations
            'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
    });
}
