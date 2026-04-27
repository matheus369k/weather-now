import { GoogleAnalytics } from '@next/third-parties/google'
import { env } from '@/util/env'

export function GoogleAnalyticsMonitor() {
  const GoogleAnalyticsId = env.NEXT_PUBLIC_GA_ID

  if (!GoogleAnalyticsId) return

  return <GoogleAnalytics gaId={GoogleAnalyticsId} />
}
