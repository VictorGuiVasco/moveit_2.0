import './global.css'
import type { Metadata } from 'next'
import { Inter, Rajdhani } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  title: 'Move.it',
  icons: './favicon.png',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
