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
  action: { payload?: ReducerStateLocationType; type: string }
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
  {} as CoordinateLocationContextType
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
    if (globalThis.window) {
      const navigator = window.navigator

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
          const result = await getCurrentLocation({
            lat: coords.latitude,
            log: coords.longitude,
          })

          if (!result) throw new Error('Not found your location')
          dispatch({
            type: REDUCER_ACTIONS.UPDATE_LOCATION,
            payload: {
              location_name: result.location_name,
              lat: result.lat,
              log: result.log,
            },
          })
        })
      }
    }
  }, [])

  function updateCoordinateLocation({
    lat,
    log,
    location_name,
  }: CoordinateType) {
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
