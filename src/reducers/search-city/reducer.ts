import type { CountryFlagsType } from '@/services/get-country-flags'
import type { PlaceType } from '@/services/get-geolocation'

export interface LocationList extends PlaceType {
  flags: CountryFlagsType
}

interface ReducerStateType {
  locations: LocationList[] | null
  is_loading: boolean
  is_error: boolean
  is_open: boolean
}

export const SEARCH_CITY_REDUCER_ACTIONS = {
  START_LOADING: 'start/loading',
  UPDATE_LOCATION: 'update/location',
  RESET_LOCATION: 'reset/location',
  UPDATE_ERROR: 'update/error',
  TOGGLE_DROPDOWN: 'toggle/dropdown',
}

export function searchCityReducer(
  state: ReducerStateType,
  action: { type: string; payload?: LocationList[] },
): ReducerStateType {
  switch (action.type) {
    case SEARCH_CITY_REDUCER_ACTIONS.START_LOADING:
      return {
        locations: null,
        is_loading: true,
        is_error: false,
        is_open: false,
      }

    case SEARCH_CITY_REDUCER_ACTIONS.UPDATE_ERROR:
      return {
        locations: null,
        is_loading: false,
        is_error: !state.is_error,
        is_open: false,
      }

    case SEARCH_CITY_REDUCER_ACTIONS.UPDATE_LOCATION:
      return {
        locations: action.payload || state.locations,
        is_loading: false,
        is_error: false,
        is_open: true,
      }
    case SEARCH_CITY_REDUCER_ACTIONS.RESET_LOCATION:
      return {
        locations: null,
        is_loading: false,
        is_error: false,
        is_open: false,
      }

    case SEARCH_CITY_REDUCER_ACTIONS.TOGGLE_DROPDOWN:
      return {
        ...state,
        is_open: !state.is_open,
      }

    default:
      return state
  }
}
