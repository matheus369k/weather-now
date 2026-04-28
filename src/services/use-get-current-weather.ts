import { useQuery } from '@tanstack/react-query'
import type { StaticImageData } from 'next/image'
import { WEATHER_ICONS } from '@/util/consts'
import {
  type Current,
  type GetCurrentWeatherProps,
  getCurrentWeather,
} from './get-current-weather'

type useGetCurrentWeatherProps = GetCurrentWeatherProps

export function useGetCurrentWeather(props: useGetCurrentWeatherProps) {
  const { precipitation, wind_speed, lat, log, temperature } = props
  const oneDay = 1000 * 60 * 60 * 24

  function AddIconReferentOfWeatherCode(props: Pick<Current, 'weather_code'>) {
    const weatherIconsEntries = Object.entries(WEATHER_ICONS)
    let weatherIcon: StaticImageData | undefined
    const weatherCode = props.weather_code

    weatherIconsEntries.forEach(([entryCode, entryIcon]) => {
      const isEqualWeatherCode = entryCode === weatherCode.toString()

      if (isEqualWeatherCode) {
        weatherIcon = entryIcon
      }
    })

    return weatherIcon
  }

  return useQuery({
    queryKey: [lat, log, precipitation, temperature, wind_speed],
    staleTime: oneDay,
    queryFn: async () => {
      return await getCurrentWeather({
        precipitation,
        temperature,
        wind_speed,
        lat,
        log,
      })
    },
    select: (data) => {
      if (!data) return

      const weatherIcon = AddIconReferentOfWeatherCode(data)
      if (!weatherIcon) return

      return {
        ...data,
        weather_icon: weatherIcon,
      }
    },
  })
}
