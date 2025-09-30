import { Skeleton } from './ui/skeleton'

export function WeatherDailyLoader() {
  return (
    <div className='size-full order-2 flex flex-col gap-6 xl:place-content-end xl:col-start-auto xl:row-span-3 xl:col-span-5'>
      <Skeleton
        className='w-72 col-span-1 text-center bg-[#2628406e] rounded-lg p-4'
        key={new Date().toISOString()}
      />

      <div className='size-full grid grid-rows-1 grid-cols-3 min-[400px]:grid-cols-4 min-[549px]:grid-rows-2 min-[549px]:grid-cols-5 md:grid-rows-1 md:grid-cols-7 gap-4'>
        {Array.from({ length: 7 }).map(() => {
          return (
            <Skeleton
              className='size-full min-h-40 col-span-1 text-center bg-[#2628406e] rounded-lg p-4'
              key={new Date().toISOString()}
            />
          )
        })}
      </div>
    </div>
  )
}
