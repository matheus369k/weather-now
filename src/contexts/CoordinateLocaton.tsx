'use client'

import { getCurrentLocation } from '@/services/get-current-location'
import { browserLocalStorage } from '@/util/browserStorage'
import { BROWSER_STORAGE_KEYS } from '@/util/consts'
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

function initialReducer(state: ReducerStateLocationType) {
  const user_location = browserLocalStorage.get(
    BROWSER_STORAGE_KEYS.user_location
  )
  if (user_location) {
    return JSON.parse(user_location)
  }

  return state
}

export const CoordinateLocationContext = createContext(
  {} as CoordinateLocationContextType
)

export function CoordinateLocationProvider({
  children,
}: {
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      location_name: 'Berlin/Germany',
      lat: 52.52,
      log: 13.41,
    },
    initialReducer
  )

  useEffect(() => {
    const userLocationNotExist = !browserLocalStorage.get(
      BROWSER_STORAGE_KEYS.user_location
    )
    if (userLocationNotExist) {
      getCurrentLocation().then((response) => {
        if (!response) return
        const user_location = {
          location_name: response.location_name,
          lat: response.lat,
          log: response.log,
        }

        browserLocalStorage.set({
          key: BROWSER_STORAGE_KEYS.user_location,
          value: JSON.stringify(user_location),
        })

        dispatch({
          type: REDUCER_ACTIONS.UPDATE_LOCATION,
          payload: user_location,
        })
      })
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
