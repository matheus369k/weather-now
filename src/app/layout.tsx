import type { Metadata } from 'next'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import '@/styles/globals.css'
import { GoogleAnalyticsMonitor } from '@/components/GoogleAnalytics'
import { Header } from '@/components/Header'
import { ClientQueryProvider } from '@/components/QueryClientProvider'
import { MetricPrettierTypeProvider } from '@/contexts/MetricPrettiers'
import { env } from '@/util/env'

const fontBricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin'],
  weight: ['800'],
})

const fontDMSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Weather Now | Real-Time Weather Forecast',
  description:
    'Get accurate, real-time weather forecasts for your city and worldwide. Stay updated on temperature, humidity, wind speed, and more.',
  keywords: [
    'weather',
    'weather forecast',
    'temperature',
    'real-time weather',
    'meteorology',
    'Weather Now',
  ],
  authors: [{ name: 'MatheusMelo/Developer' }],
  creator: 'MatheusMelo/Developer',
  metadataBase: new URL(env.NEXT_PUBLIC_WEBSITE_URL),

  openGraph: {
    title: 'Weather Now | Real-Time Weather Updates',
    description:
      "Check if it's sunny or raining. Accurate forecasts with a modern, sleek interface.",
    url: env.NEXT_PUBLIC_WEBSITE_URL,
    siteName: 'Weather Now',
    images: [
      {
        url: '/project-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Weather Now App Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Weather Now | Precise Weather Forecast',
    description: 'Accurate and fast meteorological updates at your fingertips.',
    images: ['/project-preview.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/favicon-32x32.ico',
  },
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

        <GoogleAnalyticsMonitor />
      </body>
    </html>
  )
}
