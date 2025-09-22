'use server'

import { env } from '@/util/env'

export type CountryFlagsType = {
  png: string
  svg: string
  alt: string
}

export type ResponseSearchResultsType = [
  {
    flags: CountryFlagsType
  }
]

export async function getCountryFlag(name: string) {
  try {
    const fetchParams = `/${name}?fields=flags`
    const response = await fetch(
      env.NEXT_PUBLIC_COUNTRY_FLAGS_API_URL.concat(fetchParams)
    )
    const [results]: ResponseSearchResultsType = await response.json()
    console.log(results)

    if (!results.flags) {
      throw new Error('Not found flags')
    }

    return results.flags
  } catch (error) {
    console.log(error)
  }
}
