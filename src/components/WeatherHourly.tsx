'use client'

import { CoordinateLocationContext } from '@/contexts/CoordinateLocaton'
import { MetricPrettierContext } from '@/contexts/MetricPrettiers'
import { getHourlyWeather } from '@/services/get-hourly-weather'
import { WEATHER_ICONS } from '@/util/consts'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { WeatherHourlyLoader } from './WeatherHourlyLoader'

export function WeatherHourly() {
  const [weekDay, setWeekDay] = useState(dayjs(new Date()))
  const {
    metricPrettier: { temperature },
  } = useContext(MetricPrettierContext)
  const {
    coordinate: { lat, log },
  } = useContext(CoordinateLocationContext)
  const { data } = useQuery({
    queryKey: [lat, log, weekDay, temperature, 'hourly-weather'],
    staleTime: 1000 * 60 * 60,
    queryFn: async () =>
      await getHourlyWeather({
        lat,
        log,
        custom_date: weekDay,
        temperature,
      }),
    select(data) {
      if (!data) return
      let weather_icons = Array.from({ length: 12 }).map(() => WEATHER_ICONS[0])

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

  function toggleCurrentWeekDay(date: dayjs.Dayjs) {
    setWeekDay(date)
  }

  if (!data) return <WeatherHourlyLoader />

  return (
    <div className='relative size-full order-3 rounded-3xl flex flex-col gap-6 py-6 bg-[#262840] xl:row-start-1 xl:col-start-6 xl:row-span-8 xl:col-span-2'>
      <div className='flex items-center justify-between gap-1 px-6'>
        <h3 className='text-2xl truncate w-full'>Hourly forecast</h3>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            className='bg-[#3B3B5D] text-neutral-100 hover:bg-[#2F2F49]'
            asChild
          >
            <Button className='border-none flex items-center'>
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
              console.log(isActive, dynamicDay, weekDay)
              return (
                <DropdownMenuItem
                  key={dynamicDay.toISOString()}
                  className='w-full py-3 focus:bg-transparent cursor-pointer hover:bg-[#262840] data-[active=true]:bg-[#2F2F49] font-medium'
                  data-active={isActive}
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
