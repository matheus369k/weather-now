import { useQuery } from '@tanstack/react-query'
import {
  getHourlyWeather,
  type GetHourlyWeatherProps,
  type HourlyData,
} from './get-hourly-weather'
import type { StaticImageData } from 'next/image'
import { WEATHER_ICONS } from '@/util/consts'

type UseGetHourlyWeatherProps = GetHourlyWeatherProps
type AddImagesURLProps = {
  entryCode: string
  weatherCode: number | string
  weatherIcons: StaticImageData[]
  entryIcon: StaticImageData
}

export function useGetHourlyWeather(props: UseGetHourlyWeatherProps) {
  const { custom_date, lat, log, temperature } = props
  const oneHour = 1000 * 60 * 60

  function addURLImagesInVariable(props: AddImagesURLProps) {
    const { entryCode, weatherCode, weatherIcons, entryIcon } = props
    const isEqualWeatherCode = entryCode === weatherCode.toString()

    if (isEqualWeatherCode) {
      weatherIcons.push(entryIcon)
    }
  }

  function AddIconReferentOfWeatherCode(
    props: Pick<HourlyData, 'weather_code'>,
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
    queryKey: [lat, log, custom_date, temperature, 'hourly-weather'],
    staleTime: oneHour,
    queryFn: async () =>
      await getHourlyWeather({
        temperature,
        custom_date,
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
