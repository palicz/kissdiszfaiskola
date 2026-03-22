import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { Inter, Newsreader } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { SITE_NAME } from '@/constants/site'
import { getServerSideURL } from '@/utilities/getURL'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'optional',
  adjustFontFallback: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'optional',
  adjustFontFallback: true,
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(newsreader.variable, inter.variable, GeistMono.variable)}
      data-theme="light"
      lang="hu"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        {/* Material Symbols nincs next/font/google alatt; App Router root layout = globális betöltés */}
        {/* display=swap: optional nem cseréli a fontot, ha késik — ligatúrák szövegként maradnak */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- external icon font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-b-background antialiased">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: SITE_NAME,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
