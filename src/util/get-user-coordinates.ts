import { getURLStateParam } from './url-state-params'
import { isValidGeoCoordinate } from './validation'

type userCoordinateVariable = {
  lat: number
  log: number
}

function getUserParamsCoordinate() {
  const latitudeParam = getURLStateParam({ name: 'lat' })
  const longitudeParam = getURLStateParam({ name: 'log' })

  const isNotExistedLatAndLogInURLParam = !(latitudeParam && longitudeParam)
  if (isNotExistedLatAndLogInURLParam) return

  const isNotValidCoordinates = !isValidGeoCoordinate({
    lat: latitudeParam,
    log: longitudeParam,
  })
  if (isNotValidCoordinates) return

  return {
    lat: Number(latitudeParam),
    log: Number(longitudeParam),
  }
}

async function getUserBrowserCoordinate() {
  const position: GeolocationPosition = await new Promise(
    (resolver, reject) => {
      const isNotExistGeolocationInBrowser = !('geolocation' in navigator)
      if (isNotExistGeolocationInBrowser) {
        reject(new Error('browser not has support for access geolocation'))
      }

      navigator.geolocation.getCurrentPosition(resolver, reject)
    },
  )

  const isNotPositionCoordsExisted = !position.coords
  if (isNotPositionCoordsExisted) return

  return {
    lat: position.coords.latitude,
    log: position.coords.longitude,
  }
}

export async function getUserCoordinate() {
  let userCoordinate: userCoordinateVariable | undefined

  userCoordinate = getUserParamsCoordinate()
  if (userCoordinate) {
    return userCoordinate
  }

  userCoordinate = await getUserBrowserCoordinate()
  return userCoordinate
}
