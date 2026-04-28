'use client'

import { CoordinateLocationContext } from '@/contexts/CoordinateLocaton'
import { MetricPrettierContext } from '@/contexts/MetricPrettiers'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { WeatherHourlyLoader } from './WeatherHourlyLoader'
import { useGetHourlyWeather } from '@/services/use-get-hourly-weather'

export function WeatherHourly() {
  const [weekDay, setWeekDay] = useState(dayjs(new Date()))
  const { metricPrettier } = useContext(MetricPrettierContext)
  const { coordinate } = useContext(CoordinateLocationContext)
  const { data, isFetching, isError } = useGetHourlyWeather({
    temperature: metricPrettier.temperature,
    custom_date: weekDay,
    lat: coordinate.lat,
    log: coordinate.log,
  })

  function toggleCurrentWeekDay(date: dayjs.Dayjs) {
    setWeekDay(date)
  }

  if (isFetching) return <WeatherHourlyLoader />
  if (!data || isError) {
    throw new Error('error to try access hourly weather api')
  }

  return (
    <div className='relative size-full order-3 rounded-3xl flex flex-col gap-6 py-6 bg-[#262840] xl:row-start-1 xl:col-start-6 xl:row-span-8 xl:col-span-2'>
      <div className='flex items-center justify-between gap-1 px-6'>
        <h3 className='text-2xl truncate w-full'>Hourly forecast</h3>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <Button className='flex items-center border-3 border-transparent ring ring-transparent focus-visible:ring-1 focus-visible:border-[#010326] focus-visible:ring-neutral-50 bg-[#3B3B5D] text-neutral-100 hover:bg-[#2F2F49]'>
              {dayjs(weekDay).format('dddd')} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='w-56 bg-[#262840] flex flex-col items-start justify-start'
          >
            {Array.from({ length: 7 }).map((_, index) => {
              const dynamicDay = dayjs(new Date()).set('day', index)
              const isActive = dayjs(weekDay).isSame(dynamicDay, 'day')
              return (
                <DropdownMenuItem
                  key={dynamicDay.toISOString()}
                  className='w-full py-3  cursor-pointer font-medium  focus:bg-transparent hover:bg-[#262840] data-[active=true]:bg-[#2F2F49]'
                  data-active={isActive}
                  autoFocus={isActive}
                  onClick={() => toggleCurrentWeekDay(dynamicDay)}
                >
                  {dayjs(dynamicDay).format('dddd')}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className='flex flex-col w-full px-6 max-h-[378px] md:max-h-[678px]'>
        {data.time.map((time, index) => {
          return (
            <div
              className='flex w-full my-4 justify-between items-center row-span-1 bg-[#2F2F49] rounded-lg p-2 border border-neutral-700'
              key={time}
            >
              <div className='flex items-center gap-x-4'>
                <Image
                  src={data.weather_icons[index]}
                  alt=''
                  width={40}
                  height={40}
                />

                <span className='font-medium'>{dayjs(time).format('h A')}</span>
              </div>

              <span className='font-normal'>
                {data.temperature_2m[index].toFixed(0)}°
              </span>
            </div>
          )
        })}
      </ScrollArea>
    </div>
  )
}
