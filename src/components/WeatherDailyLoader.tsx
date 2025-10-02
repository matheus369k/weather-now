export function WeatherDailyLoader() {
  return (
    <div className='size-full order-2 flex flex-col gap-6 xl:place-content-end xl:col-start-auto xl:row-span-3 xl:col-span-5'>
      <h3 className='text-2xl'>Daily forecast</h3>

      <div className='size-full grid grid-rows-1 grid-cols-3 min-[400px]:grid-cols-4 min-[549px]:grid-rows-2 min-[549px]:grid-cols-5 md:grid-rows-1 md:grid-cols-7 gap-4'>
        {Array.from({ length: 7 }).map((_, index) => {
          return (
            <div
              className='size-full min-h-40 col-span-1 bg-[#262840] rounded-lg p-4 border border-neutral-700'
              key={new Date().setDate(index).toString()}
            />
          )
        })}
      </div>
    </div>
  )
}
