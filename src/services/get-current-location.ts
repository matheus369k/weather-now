'use server'

import { env } from '@/util/env'

interface LocationData {
  latitude: number
  longitude: number
}

interface CityData {
  geonameid: number
  name: string
  population: number
}

interface LanguagesData {
  [key: string]: string
}

interface FlagData {
  file: string
  emoji: string
  unicode: string
}

interface CountryData {
  geonameid: number
  name: string
  code: string
  capital: string
  area_size: string
  population: number
  phone_code: string
  is_in_eu: boolean
  languages: LanguagesData
  flag: FlagData
  tld: string
}

interface IpGeolocationDataSimplified {
  ip: string
  type: 'IPv4' | 'IPv6'
  location: LocationData
  city: CityData
  country: CountryData
  status: 'success' | 'fail'
}
export async function getCurrentLocation() {
  try {
    const response = await fetch(env.NEXT_PUBLIC_CURRENT_LOCATION_API_URL)
    const result: IpGeolocationDataSimplified = await response.json()

    if (!result) {
      throw new Error('Not found current location')
    }

    return {
      location_name: `${result.country.name}/${result.city.name}`,
      lat: result.location.latitude,
      log: result.location.longitude,
    }
  } catch (error) {
    console.log(error)
  }
}
