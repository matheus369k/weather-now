import type { Metadata } from 'next'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import { Header } from '@/components/Header'
import '@/styles/globals.css'

const fontBricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin', 'latin-ext'],
  weight: ['800'],
})

const fontDMSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin', 'latin-ext'],
})

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Weather app',
  icons: 'favicon-32x32.png',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark'>
      <body
        className={`text-lg antialiased bg-[#010326] ${fontBricolageGrotesque.variable} ${fontDMSans.variable}`}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
