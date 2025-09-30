import type { Metadata } from 'next'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import { Header } from '@/components/Header'
import '@/styles/globals.css'
import { MetricPrettierTypeProvider } from '@/contexts/MetricPrettiers'
import { ClientQueryProvider } from '@/components/QueryClientProvider'

const fontBricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['vietnamese'],
  weight: ['800'],
})

const fontDMSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Weather Now',
  description:
    'Weather Now é o seu destino rápido para verificar as condições do tempo e previsões na sua cidade ou em qualquer local que você escolher',
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
        className={`space-y-8 text-lg antialiased bg-[#010326] ${fontBricolageGrotesque.className} ${fontDMSans.className}`}
      >
        <ClientQueryProvider>
          <MetricPrettierTypeProvider>
            <Header />
            {children}
          </MetricPrettierTypeProvider>
        </ClientQueryProvider>
      </body>
    </html>
  )
}
