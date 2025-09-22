import { SearchCityForm } from '@/components/SearchCityForm'
import { CoordinateLocationProvider } from '@/contexts/CoordinateLocaton'
import { useContext } from 'react'

export default function Home() {
  return (
    <CoordinateLocationProvider>
      <main className='max-w-[1444px] flex flex-col px-4 gap-12 font-[var(--font-dm-sans)]'>
        <h1 className='text-6xl font-[var(--font-bricolage-grotesque)] text-center'>
          How's the sky looking today?
        </h1>

        <SearchCityForm />
      </main>
    </CoordinateLocationProvider>
  )
}
