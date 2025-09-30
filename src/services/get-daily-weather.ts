'use server'

import { env } from '@/util/env'

interface DailyUnits {
  time: string
  weather_code: string
  temperature_2m_max: string
  temperature_2m_min: string
}

interface DailyData {
  time: string[]
  weather_code: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
}

interface WeatherResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  daily_units: DailyUnits
  daily: DailyData
}

type GetDailyWeatherProps = {
  temperature: 'celsius' | 'fahrenheit'
  log: number
  lat: number
}

export async function getDailyWeather(props: GetDailyWeatherProps) {
  try {
    const baseQueryParams = `/?latitude=${props.lat}&longitude=${props.log}&timezone=auto`
    const dailyQueryParams =
      '&daily=weather_code,temperature_2m_max,temperature_2m_min'
    const metricQueryParams = `&temperature_unit=${props.temperature}`
    const response = await fetch(
      env.NEXT_PUBLIC_WEATHER_API_URL.concat(baseQueryParams)
        .concat(metricQueryParams)
        .concat(dailyQueryParams)
    )
    const result: WeatherResponse = await response.json()

    if (!result) {
      throw new Error('Not found weather daily details')
    }

    return { ...result.daily }
  } catch (error) {
    console.log(error)
  }
}
