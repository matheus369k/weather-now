'use server'

import { env } from '@/util/env'
import dayjs from 'dayjs'

interface HourlyUnits {
  time: string
  weather_code: string
  temperature_2m: string
}

interface HourlyData {
  time: string[]
  weather_code: number[]
  temperature_2m: number[]
}

interface WeatherHourlyResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  hourly_units: HourlyUnits
  hourly: HourlyData
}

type GetHourlyWeatherProps = {
  temperature: 'celsius' | 'fahrenheit'
  custom_date: dayjs.Dayjs
  log: number
  lat: number
}

export async function getHourlyWeather(props: GetHourlyWeatherProps) {
  try {
    const hourHourly = dayjs(props.custom_date).hour()
    let startHourly = dayjs(props.custom_date).set('hour', 0)
    let endHourly = startHourly.set('hour', 11)
    if (hourHourly > 12) {
      startHourly = dayjs(props.custom_date).set('hour', 12)
      endHourly = startHourly.set('hour', 23)
    }
    const formatterStartHourly = dayjs(startHourly).format('YYYY-MM-DDTHH:mm')
    const formatterEndHourly = dayjs(endHourly).format('YYYY-MM-DDTHH:mm')
    const hourlyQueryParams = `&hourly=weather_code,temperature_2m&start_hour=${formatterStartHourly}&end_hour=${formatterEndHourly}`
    const baseQueryParams = `/?latitude=${props.lat}&longitude=${props.log}&timezone=auto`
    const metricQueryParams = `&temperature_unit=${props.temperature}`
    const response = await fetch(
      env.NEXT_PUBLIC_WEATHER_API_URL.concat(baseQueryParams)
        .concat(metricQueryParams)
        .concat(hourlyQueryParams)
    )
    const result: WeatherHourlyResponse = await response.json()

    if (!result) {
      throw new Error('Not found weather daily details')
    }

    return { ...result.hourly }
  } catch (error) {
    console.log(error)
  }
}
