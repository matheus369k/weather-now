'use server'

import { env } from '@/util/env'

type CurrentUnits = {
  time: string
  interval: string
  wind_speed_10m: string
  relative_humidity_2m: string
  weather_code: string
  temperature_2m: string
  precipitation: string
  apparent_temperature: string
}

type Current = {
  time: string
  interval: number
  wind_speed_10m: number
  relative_humidity_2m: number
  weather_code: number
  temperature_2m: number
  precipitation: number
  apparent_temperature: number
}

type WeatherData = {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
}

type GetCurrentWeatherProps = {
  temperature: 'celsius' | 'fahrenheit'
  wind_speed: 'kmh' | 'mph'
  precipitation: 'mm' | 'inch'
  log: number
  lat: number
}

export async function getCurrentWeather(props: GetCurrentWeatherProps) {
  try {
    const baseQueryParams = `/?latitude=${props.lat}&longitude=${props.log}&timezone=auto`
    const currentQueryParams =
      '&current=wind_speed_10m,relative_humidity_2m,weather_code,temperature_2m,precipitation,apparent_temperature'
    const metricQueryParams = `&wind_speed_unit=${props.wind_speed}&temperature_unit=${props.temperature}&precipitation_unit=${props.precipitation}`
    const response = await fetch(
      env.NEXT_PUBLIC_WEATHER_API_URL.concat(baseQueryParams)
        .concat(metricQueryParams)
        .concat(currentQueryParams)
    )
    const result: WeatherData = await response.json()

    if (!result) {
      throw new Error('Not found weather details')
    }

    return { timezone: result.timezone, ...result.current }
  } catch (error) {
    console.log(error)
  }
}
