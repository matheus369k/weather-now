import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'

export function WeatherHourlyLoader() {
  return (
    <div className='relative size-full order-3 rounded-3xl flex flex-col gap-6 py-6  bg-[#262840] xl:row-start-1 xl:col-start-6 xl:row-span-8 xl:col-span-2'>
      <div className='flex items-center justify-between gap-1 px-6'>
        <h3 className='text-2xl truncate w-full'>Hourly forecast</h3>

        <Button className='flex items-center bg-[#3B3B5D] text-neutral-100 hover:bg-[#2F2F49] border-3 border-transparent ring ring-transparent focus-visible:ring-1 focus-visible:border-[#010326] focus-visible:ring-neutral-50'>
          - <ChevronDown />
        </Button>
      </div>

      <ScrollArea className='flex flex-col w-full px-6 max-h-[378px] md:max-h-[678px]'>
        <div className='flex flex-col gap-4 my-4'>
          {Array.from({ length: 12 }).map((_, index) => {
            return (
              <div
                className='size-full min-h-16 center row-span-1 bg-[#2F2F49] rounded-lg p-2 border border-neutral-700'
                key={new Date().setDate(index).toString()}
              />
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
