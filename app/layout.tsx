import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'PoggioAI | MIT',
  description: 'A multi-agent AI system that turns research hypotheses into high-quality papers with minimal human steering.',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-T0YHZ1J26J" />
      </body>
    </html>
  )
}
