'use client'

import { CoordinateLocationContext } from '@/contexts/CoordinateLocaton'
import { MetricPrettierContext } from '@/contexts/MetricPrettiers'
import { getCurrentWeather } from '@/services/get-current-weather'
import { Skeleton } from '@/components/ui/skeleton'
import { WEATHER_ICONS } from '@/util/consts'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import Image from 'next/image'
import { Suspense, useContext } from 'react'
import { WeatherCurrentLoader } from './WeatherCurrentLoader'

export function WeatherCurrent() {
  const {
    metricPrettier: { precipitation, temperature, wind_speed },
  } = useContext(MetricPrettierContext)
  const {
    coordinate: { lat, log, location_name },
  } = useContext(CoordinateLocationContext)
  const { data, isFetching, isError } = useQuery({
    queryKey: [lat, log, precipitation, temperature, wind_speed],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () =>
      await getCurrentWeather({
        lat,
        log,
        precipitation,
        temperature,
        wind_speed,
      }),
    select(data) {
      if (!data) return
      let weather_icon = WEATHER_ICONS[0]

      Object.entries(WEATHER_ICONS).find((entries) => {
        if (entries[0] === data.weather_code.toString()) {
          weather_icon = entries[1]
        }
      })

      return {
        ...data,
        weather_icon,
      }
    },
  })

  if (isFetching) return <WeatherCurrentLoader />
  if (!data || isError) {
    throw new Error('error to try access current weather api')
  }

  return (
    <div className='grid grid-rows-1 gap-6 size-full md:grid-rows-3 xl:grid-rows-7 xl:row-span-5 xl:col-span-5'>
      <div className='row-span-2 col-span-4 bg-[url(@/assets/bg-today-small.svg)] bg-no-repeat bg-cover bg-center rounded-3xl overflow-hidden flex justify-center items-center flex-col gap-4 px-4 pt-6 pb-10 border border-neutral-700 md:bg-[url(@/assets/bg-today-large.svg)] md:justify-between md:flex-row xl:row-span-5'>
        <div className='flex flex-col gap-2 text-center md:text-start'>
          <h2 className='text-4xl font-bold'>
            {location_name.replace('/', ', ')}
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
            {data.wind_speed_10m.toFixed(0)} {wind_speed.replace('h', '/h')}
          </span>
        </div>
        <div className='p-4 flex flex-col gap-4 bg-[#262840] rounded-lg border border-neutral-700'>
          <h3 className='font-light'>Precipitation</h3>
          <span className='text-4xl font-normal'>
            {data.precipitation.toFixed(0)} {precipitation}
          </span>
        </div>
      </div>
    </div>
  )
}
