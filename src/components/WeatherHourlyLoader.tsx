import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'

export function WeatherHourlyLoader() {
  return (
    <div className='relative size-full order-3 rounded-3xl flex flex-col gap-6 py-6  bg-[#2628403c] xl:row-start-1 xl:col-start-6 xl:row-span-8 xl:col-span-2'>
      <div className='flex items-center justify-between px-6'>
        <Skeleton className='w-44 h-8 bg-[#2628401e]' />

        <Skeleton className='w-32 h-10 bg-[#2628401e]' />
      </div>

      <ScrollArea className='flex flex-col w-full px-6 max-h-[378px] md:max-h-[678px]'>
        <div className='flex flex-col gap-4 '>
          {Array.from({ length: 12 }).map(() => {
            return (
              <Skeleton
                className='size-full min-h-20 center row-span-1 bg-[#2628401e] rounded-lg p-2'
                key={new Date().toISOString()}
              />
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
