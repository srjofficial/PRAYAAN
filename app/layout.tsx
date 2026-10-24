import React from "react"
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono, Cinzel, Creepster, Orbitron } from 'next/font/google'
import localFont from 'next/font/local'
import SmoothScroll from "@/components/smooth-scroll"
import CustomCursor from "@/components/CustomCursor"

import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
})

const creepster = Creepster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-creepster',
})

const asoka = localFont({
  src: '../public/fonts/ASOKA.ttf',
  variable: '--font-asoka',
})

export const metadata: Metadata = {
  title: "PRAYAAN | SNGCE MCA",
  description:
    "PRAYAAN - National Level Intercollegiate Fest organized by MCA Department, Sree Narayana Gurukulam College of Engineering.",

  icons: {
    icon: "/images/prayaan-logo.jpg",
    shortcut: "/images/prayaan-logo.jpg",
    apple: "/images/prayaan-logo.jpg",
  },
}


export const viewport: Viewport = {
  themeColor: '#0B0B0D',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${asoka.variable} ${cinzel.variable} ${creepster.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-[#0B0B0D] text-[#F0E5D5] overflow-x-hidden selection:bg-[#B97843]/30 selection:text-[#F0E5D5]">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html >
  )
}
