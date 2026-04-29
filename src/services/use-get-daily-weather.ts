import { useQuery } from '@tanstack/react-query'
import {
  getDailyWeather,
  type DailyData,
  type GetDailyWeatherProps,
} from './get-daily-weather'
import type { StaticImageData } from 'next/image'
import { WEATHER_ICONS } from '@/util/consts'

type UseGetDailyWeatherProps = GetDailyWeatherProps
type AddImagesURLProps = {
  entryCode: string
  weatherCode: number | string
  weatherIcons: StaticImageData[]
  entryIcon: StaticImageData
}

export function useGetDailyWeather(props: UseGetDailyWeatherProps) {
  const { lat, log, temperature } = props
  const oneDay = 1000 * 60 * 60 * 24

  function addURLImagesInVariable(props: AddImagesURLProps) {
    const { entryCode, weatherCode, weatherIcons, entryIcon } = props
    const isEqualWeatherCode = entryCode === weatherCode.toString()

    if (isEqualWeatherCode) {
      weatherIcons.push(entryIcon)
    }
  }

  function AddIconReferentOfWeatherCode(
    props: Pick<DailyData, 'weather_code'>,
  ) {
    const weatherIconsEntries = Object.entries(WEATHER_ICONS)
    const weatherIcons: StaticImageData[] = []
    const weatherCodes = props.weather_code

    for (const [entryCode, entryIcon] of weatherIconsEntries) {
      weatherCodes.forEach((weatherCode) => {
        addURLImagesInVariable({
          weatherIcons,
          weatherCode,
          entryCode,
          entryIcon,
        })
      })
    }

    return {
      weatherIcons,
    }
  }

  return useQuery({
    queryKey: [lat, log, temperature, 'daily-weather'],
    staleTime: oneDay,
    queryFn: async () =>
      await getDailyWeather({
        temperature,
        lat,
        log,
      }),
    select: (data) => {
      if (!data) return
      const { weatherIcons } = AddIconReferentOfWeatherCode(data)

      return {
        ...data,
        weather_icons: weatherIcons,
      }
    },
  })
}
