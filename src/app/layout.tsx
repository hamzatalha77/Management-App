import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import { ClerkProvider } from '@clerk/nextjs'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans'
})

export const metadata: Metadata = {
  title: 'GOTEI 13',
  description: 'This is an Learning Management App'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${dmSans.className}`}>
          <Providers>
            <div className="root-layout"> {children}</div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
