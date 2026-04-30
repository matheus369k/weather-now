import { updateURLStateParams } from '@/util/url-state-params'

type ReducerStateLocationType = {
  location_name: string
  lat: number
  log: number
}

export const COORDINATE_LOCATION_REDUCER_ACTIONS = {
  UPDATE_LOCATION: 'update/location',
  RESET_LOCATION: 'reset/location',
}

export function coordinateLocationReducer(
  state: ReducerStateLocationType,
  action: { payload?: ReducerStateLocationType; type: string },
): ReducerStateLocationType {
  switch (action.type) {
    case COORDINATE_LOCATION_REDUCER_ACTIONS.UPDATE_LOCATION:
      if (!action.payload) return state

      updateURLStateParams({
        name: 'lat',
        value: action.payload.lat.toString(),
      })
      updateURLStateParams({
        name: 'log',
        value: action.payload.log.toString(),
      })

      return {
        ...state,
        ...action.payload,
      }

    case COORDINATE_LOCATION_REDUCER_ACTIONS.RESET_LOCATION:
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
