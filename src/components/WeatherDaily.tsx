'use client'

import { CoordinateLocationContext } from '@/contexts/CoordinateLocaton'
import { MetricPrettierContext } from '@/contexts/MetricPrettiers'
import { getDailyWeather } from '@/services/get-daily-weather'
import { WEATHER_ICONS } from '@/util/consts'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useContext } from 'react'
import { WeatherDailyLoader } from './WeatherDailyLoader'

export function WeatherDaily() {
  const {
    metricPrettier: { temperature },
  } = useContext(MetricPrettierContext)
  const {
    coordinate: { lat, log },
  } = useContext(CoordinateLocationContext)
  const { data } = useQuery({
    queryKey: [lat, log, temperature, 'daily-weather'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () =>
      await getDailyWeather({
        lat,
        log,
        temperature,
      }),
    select(data) {
      if (!data) return
      let weather_icons = Array.from({ length: 7 }).map(() => WEATHER_ICONS[0])

      Object.entries(WEATHER_ICONS).forEach((entries) => {
        data.weather_code.map((weatherCode, index) => {
          if (entries[0] === weatherCode.toString()) {
            weather_icons.splice(index, 1, entries[1])
          }
        })
      })

      return {
        ...data,
        weather_icons,
      }
    },
  })

  if (!data) return <WeatherDailyLoader />

  return (
    <div className='size-full order-2 flex flex-col gap-6 xl:place-content-end xl:col-start-auto xl:row-span-3 xl:col-span-5'>
      <h3 className='text-2xl'>Daily forecast</h3>

      <div className='grid grid-rows-1 grid-cols-3 min-[400px]:grid-cols-4 min-[549px]:grid-rows-2 min-[549px]:grid-cols-5 md:grid-rows-1 md:grid-cols-7 gap-4'>
        {data.time.map((time, index) => {
          return (
            <div
              className='flex flex-col gap-y-4 col-span-1 text-center bg-[#262840] rounded-lg p-4 border border-neutral-700'
              key={time}
            >
              <span>{dayjs(time).format('ddd')}</span>
              <Image
                src={data.weather_icons[index]}
                alt=''
                width={120}
                height={120}
              />

              <div className='flex justify-between font-normal'>
                <span>{data.temperature_2m_min[index].toFixed(0)}°</span>
                <span>{data.temperature_2m_max[index].toFixed(0)}°</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
