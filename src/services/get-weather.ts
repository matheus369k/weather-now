'use server'

import { env } from '@/util/env'

type GetWeatherProps = {
  lat: number
  log: number
  temperature: 'c' | 'f'
  wind_speed: 'km/h' | 'mph'
  precipitation: 'mm' | 'in'
}

export async function getWeather({ lat, log }: GetWeatherProps) {
  try {
    const fetchParams = `/?latitude=${lat}&longitude=${log}&hourly=temperature_2m`
    const response = await fetch(
      env.NEXT_PUBLIC_WEATHER_API_URL.concat(fetchParams)
    )
    const { results } = await response.json()

    if (!results) {
      throw new Error('Not found location')
    }

    return results
  } catch (error) {
    console.log(error)
  }
}
