'use client'

import { CoordinateLocationContext } from '@/contexts/CoordinateLocaton'
import { MetricPrettierContext } from '@/contexts/MetricPrettiers'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useContext } from 'react'
import { WeatherCurrentLoader } from './WeatherCurrentLoader'
import { useGetCurrentWeather } from '@/services/use-get-current-weather'

export function WeatherCurrent() {
  const { metricPrettier } = useContext(MetricPrettierContext)
  const { coordinate } = useContext(CoordinateLocationContext)
  const { data, isFetching, isError } = useGetCurrentWeather({
    precipitation: metricPrettier.precipitation,
    temperature: metricPrettier.temperature,
    wind_speed: metricPrettier.wind_speed,
    lat: coordinate.lat,
    log: coordinate.log,
  })

  if (isFetching) return <WeatherCurrentLoader />
  if (!data || isError) {
    throw new Error('error to try access current weather api')
  }

  return (
    <div className='grid grid-rows-1 gap-6 size-full md:grid-rows-3 xl:grid-rows-7 xl:row-span-5 xl:col-span-5'>
      <div className='row-span-2 col-span-4 bg-[url(../assets/bg-today-small.svg)] bg-no-repeat bg-cover bg-center rounded-3xl overflow-hidden flex justify-center items-center flex-col gap-4 px-4 pt-6 pb-10 border border-neutral-700 md:bg-[url(../assets/bg-today-large.svg)] md:justify-between md:flex-row xl:row-span-5'>
        <div className='flex flex-col gap-2 text-center md:text-start'>
          <h2 className='text-4xl font-bold'>
            {coordinate.location_name.replace('/', ', ')}
          </h2>
          <span className='text-sm font-normal'>
            {dayjs(data.time).format('dddd, MMMM D, YYYY')}
          </span>
        </div>

        <div className='flex items-center gap-4'>
          <Image src={data.weather_icon} alt='' width={120} height={120} />
          <span className='text-8xl uppercase'>
            {data.temperature_2m.toFixed(0)}°
          </span>
        </div>
      </div>

      <div className='h-fit row-span-1 col-span-4 grid grid-row-2 grid-cols-2 gap-4 md:row-span-1 md:gap-8 md:grid-row-1 md:grid-cols-4 xl:row-span-2'>
        <div className='p-4 flex flex-col gap-4 bg-[#262840] rounded-lg border border-neutral-700'>
          <h3 className='font-light'>Feels like</h3>
          <span className='text-4xl font-normal'>
            {data.apparent_temperature.toFixed(0)}°
          </span>
        </div>
        <div className='p-4 flex flex-col gap-4 bg-[#262840] rounded-lg border border-neutral-700'>
          <h3 className='font-light'>Humidity</h3>
          <span className='text-4xl font-normal'>
            {data.relative_humidity_2m.toFixed(0)}%
          </span>
        </div>
        <div className='p-4 flex flex-col gap-4 bg-[#262840] rounded-lg border border-neutral-700'>
          <h3 className='font-light'>Wind</h3>
          <span className='text-4xl font-normal'>
            {data.wind_speed_10m.toFixed(0)}{' '}
            {metricPrettier.wind_speed.replace('h', '/h')}
          </span>
        </div>
        <div className='p-4 flex flex-col gap-4 bg-[#262840] rounded-lg border border-neutral-700'>
          <h3 className='font-light'>Precipitation</h3>
          <span className='text-4xl font-normal'>
            {data.precipitation.toFixed(0)} {metricPrettier.precipitation}
          </span>
        </div>
      </div>
    </div>
  )
}
