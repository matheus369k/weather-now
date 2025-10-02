export function WeatherCurrentLoader() {
  return (
    <div className='grid grid-rows-1 gap-6 md:grid-rows-3 xl:grid-rows-7 xl:row-span-5 xl:col-span-5'>
      <div className='min-h-80 row-span-2 col-span-4 rounded-3xl overflow-hidden flex justify-center items-center flex-col gap-1 px-4 pt-6 pb-10 bg-[#262840] xl:row-span-5'>
        <svg width='60px' height='40px' viewBox='0 0 100 20'>
          <circle cx='10' cy='20' r='10' fill='#FFFFFF' />
          <circle cx='50' cy='10' r='10' fill='#FFFFFF' />
          <circle cx='90' cy='20' r='10' fill='#FFFFFF' />
        </svg>
        <span className='font-light'>Loading...</span>
      </div>

      <div className='w-full h-fit row-span-1 col-span-4 grid grid-row-2 grid-cols-2 gap-4 md:row-span-1 md:gap-8 md:grid-row-1 md:grid-cols-4 xl:row-span-2'>
        <div className='p-4 flex flex-col gap-4 bg-[#262840] rounded-lg border border-neutral-700'>
          <h3 className='font-light'>Feels like</h3>
          <span className='text-4xl font-normal'>-</span>
        </div>
        <div className='p-4 flex flex-col gap-4 bg-[#262840] rounded-lg border border-neutral-700'>
          <h3 className='font-light'>Humidity</h3>
          <span className='text-4xl font-normal'>-</span>
        </div>
        <div className='p-4 flex flex-col gap-4 bg-[#262840] rounded-lg border border-neutral-700'>
          <h3 className='font-light'>Wind</h3>
          <span className='text-4xl font-normal'>-</span>
        </div>
        <div className='p-4 flex flex-col gap-4 bg-[#262840] rounded-lg border border-neutral-700'>
          <h3 className='font-light'>Precipitation</h3>
          <span className='text-4xl font-normal'>-</span>
        </div>
      </div>
    </div>
  )
}
