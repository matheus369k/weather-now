import { Skeleton } from '@/components/ui/skeleton'

export function WeatherCurrentLoader() {
  return (
    <div className='grid grid-rows-1 gap-6 size-full md:grid-rows-3 xl:grid-rows-7 xl:row-span-5 xl:col-span-5'>
      <Skeleton className='min-h-80 row-span-2 col-span-4 rounded-3xl overflow-hidden flex justify-center items-center flex-col gap-4 px-4 pt-6 pb-10 bg-[#2628406e] md:justify-between md:flex-row xl:row-span-5' />

      <div className='size-full row-span-1 col-span-4 grid grid-row-2 grid-cols-2 gap-4 md:row-span-1 md:gap-8 md:grid-row-1 md:grid-cols-4 xl:row-span-2'>
        <Skeleton className='p-4 size-full min-h-32 gap-4 bg-[#2628406e] rounded-lg' />
        <Skeleton className='p-4 size-full min-h-32 gap-4 bg-[#2628406e] rounded-lg' />
        <Skeleton className='p-4 size-full min-h-32 gap-4 bg-[#2628406e] rounded-lg' />
        <Skeleton className='p-4 size-full min-h-32 gap-4 bg-[#2628406e] rounded-lg' />
      </div>
    </div>
  )
}
