'use client'

import { createContext, useReducer, type ReactNode } from 'react'

type TemperatureFilterType = 'celsius' | 'fahrenheit'
type WindSpeedFilterType = 'kmh' | 'mph'
type PrecipitationFilterType = 'mm' | 'inch'

type ReducerStateFilterType = {
  type: 'metric' | 'imperial'
  temperature: TemperatureFilterType
  wind_speed: WindSpeedFilterType
  precipitation: PrecipitationFilterType
  is_mix: boolean
}

interface MetricPrettierTypeContextType {
  metricPrettier: ReducerStateFilterType
  createImperialOrMetricFilters: () => void
  updatePrecipitation: (precipitation: PrecipitationFilterType) => void
  updateWindSpeed: (wind_speed: WindSpeedFilterType) => void
  updateTemperature: (temperature: TemperatureFilterType) => void
}

const REDUCER_ACTIONS = {
  UPDATE_TEMPERATURE: 'update/temperature',
  UPDATE_WINDS_PEED: 'update/wind_speed',
  UPDATE_PRECIPITATION: 'update/precipitation',
  CREATE_IMPERIAL: 'create/imperial',
  CREATE_METRIC: 'create/metric',
}

function reducer(
  state: ReducerStateFilterType,
  action: { payload?: string; type: string }
): ReducerStateFilterType {
  switch (action.type) {
    case REDUCER_ACTIONS.UPDATE_TEMPERATURE:
      return {
        ...state,
        is_mix: true,
        temperature: action.payload as TemperatureFilterType,
      }

    case REDUCER_ACTIONS.UPDATE_WINDS_PEED:
      return {
        ...state,
        is_mix: true,
        wind_speed: action.payload as WindSpeedFilterType,
      }

    case REDUCER_ACTIONS.UPDATE_PRECIPITATION:
      return {
        ...state,
        is_mix: true,
        precipitation: action.payload as PrecipitationFilterType,
      }

    case REDUCER_ACTIONS.CREATE_METRIC:
      return {
        type: 'metric',
        temperature: 'celsius',
        wind_speed: 'kmh',
        precipitation: 'mm',
        is_mix: false,
      }

    case REDUCER_ACTIONS.CREATE_IMPERIAL:
      return {
        type: 'imperial',
        temperature: 'fahrenheit',
        wind_speed: 'mph',
        precipitation: 'inch',
        is_mix: false,
      }

    default:
      return state
  }
}

export const MetricPrettierContext = createContext(
  {} as MetricPrettierTypeContextType
)

export function MetricPrettierTypeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(reducer, {
    type: 'metric',
    temperature: 'celsius',
    wind_speed: 'kmh',
    precipitation: 'mm',
    is_mix: false,
  })

  function updateTemperature(temperature: TemperatureFilterType) {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_TEMPERATURE,
      payload: temperature,
    })
  }

  function updateWindSpeed(wind_speed: WindSpeedFilterType) {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_WINDS_PEED,
      payload: wind_speed,
    })
  }

  function updatePrecipitation(precipitation: PrecipitationFilterType) {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_PRECIPITATION,
      payload: precipitation,
    })
  }

  function createImperialOrMetricFilters() {
    if (state.type === 'metric' && state.is_mix === false) {
      dispatch({
        type: REDUCER_ACTIONS.CREATE_IMPERIAL,
      })
      return
    }

    dispatch({
      type: REDUCER_ACTIONS.CREATE_METRIC,
    })
  }

  return (
    <MetricPrettierContext.Provider
      value={{
        metricPrettier: state,
        createImperialOrMetricFilters,
        updatePrecipitation,
        updateWindSpeed,
        updateTemperature,
      }}
    >
      {children}
    </MetricPrettierContext.Provider>
  )
}
