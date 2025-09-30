'use server'

import { env } from '@/util/env'

export type PlaceType = {
  id: number
  name: string
  latitude: number
  longitude: number
  elevation: number
  feature_code: string
  country_code: string
  admin1_id: number
  admin2_id: number
  admin3_id: number
  admin4_id: number
  timezone: string
  population: number
  postcodes: string[]
  country_id: number
  country: string
  admin1: string
  admin2: string
  admin3: string
  admin4: string
}

export type ResponseSearchResultsType = {
  results: PlaceType[]
}

export async function getGeolocation(search: string) {
  try {
    const fetchParams = `/?name=${search}&count=5&language=en`
    const response = await fetch(
      env.NEXT_PUBLIC_GEOLOCATION_API_URL.concat(fetchParams)
    )
    const { results }: ResponseSearchResultsType = await response.json()

    if (!results) {
      throw new Error('Not found location')
    }

    return results
  } catch (error) {
    console.log(error)
  }
}
