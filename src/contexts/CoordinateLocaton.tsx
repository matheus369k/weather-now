/** biome-ignore-all lint/correctness/useExhaustiveDependencies: don't necessary */
'use client'

import { getCurrentLocation } from '@/services/get-current-location'
import { createContext, useEffect, useReducer, type ReactNode } from 'react'

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

type ReducerStateLocationType = {
  location_name: string
  lat: number
  log: number
}

const REDUCER_ACTIONS = {
  UPDATE_LOCATION: 'update/location',
  RESET_LOCATION: 'reset/location',
}

function reducer(
  state: ReducerStateLocationType,
  action: { payload?: ReducerStateLocationType; type: string },
): ReducerStateLocationType {
  switch (action.type) {
    case REDUCER_ACTIONS.UPDATE_LOCATION:
      return {
        ...state,
        ...action.payload,
      }

    case REDUCER_ACTIONS.RESET_LOCATION:
      return {
        ...state,
        location_name: 'Berlin/Germany',
        lat: 52.52,
        log: 13.41,
      }

    default:
      return state
  }
}

export const CoordinateLocationContext = createContext(
  {} as CoordinateLocationContextType,
)

export function CoordinateLocationProvider({
  children,
}: {
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(reducer, {
    location_name: 'Berlin/Germany',
    lat: 52.52,
    log: 13.41,
  })

  useEffect(() => {
    loadUserCurrentLocation()
  }, [])

  async function loadUserCurrentLocation() {
    if (!globalThis.window) return

    const navigator = window.navigator
    const userCoordinate = {} as Omit<CoordinateType, 'location_name'>

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        userCoordinate.lat = coords.latitude
        userCoordinate.lat = coords.longitude
      })

      try {
        const result = await getCurrentLocation({ ...userCoordinate })

        if (!result) {
          throw new Error('Not found your location')
        }

        dispatch({
          type: REDUCER_ACTIONS.UPDATE_LOCATION,
          payload: {
            location_name: result.location_name,
            lat: result.lat,
            log: result.log,
          },
        })
      } catch (error) {
        console.error((error as Error).message)
      }
    }
  }

  function updateCoordinateLocation(props: CoordinateType) {
    const { lat, log, location_name } = props
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_LOCATION,
      payload: {
        lat,
        log,
        location_name,
      },
    })
  }

  function resetCoordinateLocation() {
    dispatch({ type: REDUCER_ACTIONS.RESET_LOCATION })
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
