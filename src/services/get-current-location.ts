'use client'

interface LocalityItem {
  name: string
  description?: string
  isoName?: string
  order: number
  adminLevel: number
  isoCode?: string
  wikidataId?: string
  geonameId?: number
}

interface LocalityInfo {
  administrative: LocalityItem[]
  informative: LocalityItem[]
}

interface ReverseGeocodingResult {
  latitude: number
  lookupSource: 'coordinates' | 'ipGeolocation'
  longitude: number
  localityLanguageRequested: string
  continent: string
  continentCode: string
  countryName: string
  countryCode: string
  principalSubdivision: string
  principalSubdivisionCode: string
  city: string
  locality: string
  postcode: string
  plusCode: string
  localityInfo: LocalityInfo
}

interface GetCurrentLocationProps {
  lat: number
  log: number
}

export async function getCurrentLocation({
  lat,
  log,
}: GetCurrentLocationProps) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CURRENT_LOCATION_API_URL}?latitude=${lat}&longitude=${log}&localityLanguage=en`
    )
    const result: ReverseGeocodingResult = await response.json()

    if (!result) {
      throw new Error('Not found current location')
    }

    return {
      location_name: `${result.countryName}/${result.city}`,
      lat: result.latitude,
      log: result.longitude,
    }
  } catch (error) {
    console.log(error)
  }
}
