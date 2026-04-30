/** biome-ignore-all lint/correctness/useExhaustiveDependencies: don't necessary */
'use client'

import { createContext, type ReactNode, useEffect, useReducer } from 'react'
import {
  COORDINATE_LOCATION_REDUCER_ACTIONS,
  coordinateLocationReducer,
} from '@/reducers/coordinate-location/reducer'
import { getCurrentLocation } from '@/services/get-current-location'
import { getUserCoordinate } from '@/util/get-user-coordinates'

type CoordinateType = {
  location_name: string
  log: number
  lat: number
}

interface CoordinateLocationContextType {
  coordinate: CoordinateType
  resetCoordinateLocation: () => void
  updateCoordinateLocation: (props: CoordinateType) => void
}

export const CoordinateLocationContext = createContext(
  {} as CoordinateLocationContextType,
)

export function CoordinateLocationProvider({
  children,
}: {
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(coordinateLocationReducer, {
    location_name: 'Berlin/Germany',
    lat: 52.52,
    log: 13.41,
  })

  useEffect(() => {
    restoreOldUserCurrentLocation()
  }, [])

  async function restoreOldUserCurrentLocation() {
    if (!globalThis.window) return

    const userCoordinate = await getUserCoordinate()
    if (!userCoordinate) return

    const result = await getCurrentLocation({ ...userCoordinate })
    if (!result) return

    dispatch({
      type: COORDINATE_LOCATION_REDUCER_ACTIONS.UPDATE_LOCATION,
      payload: {
        location_name: result.location_name,
        lat: result.lat,
        log: result.log,
      },
    })
  }

  function updateCoordinateLocation(props: CoordinateType) {
    const { lat, log, location_name } = props
    dispatch({
      type: COORDINATE_LOCATION_REDUCER_ACTIONS.UPDATE_LOCATION,
      payload: {
        location_name,
        lat,
        log,
      },
    })
  }

  function resetCoordinateLocation() {
    dispatch({ type: COORDINATE_LOCATION_REDUCER_ACTIONS.RESET_LOCATION })
  }

  return (
    <CoordinateLocationContext.Provider
      value={{
        coordinate: state,
        updateCoordinateLocation,
        resetCoordinateLocation,
      }}
    >
      {children}
    </CoordinateLocationContext.Provider>
  )
}
