import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PasteBin | Share Code & Text Elegantly',
  description: 'A modern, elegant pastebin service with expiry and view-limit constraints. Share code, text, and snippets with style and security.',
  keywords: ['pastebin', 'code sharing', 'snippet', 'paste', 'text sharing', 'elegant'],
  authors: [{ name: 'PasteBin' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0f0f1e',
  openGraph: {
    title: 'PasteBin | Share Code & Text Elegantly',
    description: 'Share your code and text snippets with style and security',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen relative">
        {children}
      </body>
    </html>
  )
}
