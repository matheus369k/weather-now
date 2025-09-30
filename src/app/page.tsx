import { SearchCityForm } from '@/components/SearchCityForm'
import { CoordinateLocationProvider } from '@/contexts/CoordinateLocaton'
import { WeatherCurrent } from '@/components/WeatherCurrent'
import { WeatherDaily } from '@/components/WeatherDaily'
import { WeatherHourly } from '@/components/WeatherHourly'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Home() {
  return (
    <main className='max-w-[1444px] mx-auto flex flex-col px-4 gap-12 pt-12 font-[var(--font-dm-sans)]'>
      <h1 className='text-6xl font-[var(--font-bricolage-grotesque)] text-center pb-6'>
        How's the sky looking today?
      </h1>

      <CoordinateLocationProvider>
        <SearchCityForm />

        <div className='flex flex-col w-full h-fit gap-10 xl:grid xl:grid-rows-8 xl:grid-cols-7'>
          <WeatherCurrent />

          <WeatherHourly />

          <WeatherDaily />
        </div>
      </CoordinateLocationProvider>
    </main>
  )
}
