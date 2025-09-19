'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Settings, ChevronDown } from 'lucide-react'

type TemperatureFilterType = 'c' | 'f'
type WindSpeedFilterType = 'km/h' | 'mph'
type PrecipitationFilterType = 'mm' | 'in'

type ReducerStateFilterType = {
  type: 'metric' | 'imperial'
  temperature: TemperatureFilterType
  wind_speed: WindSpeedFilterType
  precipitation: PrecipitationFilterType
  is_mix: boolean
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
        temperature: 'c',
        wind_speed: 'km/h',
        precipitation: 'mm',
        is_mix: false,
      }

    case REDUCER_ACTIONS.CREATE_IMPERIAL:
      return {
        type: 'imperial',
        temperature: 'f',
        wind_speed: 'mph',
        precipitation: 'in',
        is_mix: false,
      }

    default:
      return state
  }
}

export function UnitsFilter() {
  const [state, dispatch] = React.useReducer(reducer, {
    type: 'metric',
    temperature: 'c',
    wind_speed: 'km/h',
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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className='bg-[#272441] text-neutral-100 hover:bg-[#2F2F49]'
        asChild
      >
        <Button className='border-none'>
          <Settings /> Units <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 bg-[#262840]'>
        <DropdownMenuItem
          onClick={createImperialOrMetricFilters}
          className='focus:bg-[#2F2F49] text-sm'
        >
          Switch to Imperial/Metric
        </DropdownMenuItem>

        <div className='flex flex-col items-start justify-start w-full'>
          <DropdownMenuLabel className='text-neutral-500 text-xs'>
            Temperature
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            className='w-full focus:bg-transparent cursor-pointer data-[state=checked]:bg-[#2F2F49]'
            checked={state.temperature === 'c'}
            onCheckedChange={() => updateTemperature('c')}
          >
            Celsius (°C)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className='w-full focus:bg-transparent cursor-pointer data-[state=checked]:bg-[#2F2F49]'
            checked={state.temperature === 'f'}
            onCheckedChange={() => updateTemperature('f')}
          >
            Fahrenheit (°F)
          </DropdownMenuCheckboxItem>
        </div>

        <DropdownMenuSeparator />

        <div className='flex flex-col items-start justify-start w-full'>
          <DropdownMenuLabel className='text-neutral-500 text-xs'>
            Wind Speed
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            className='w-full focus:bg-transparent cursor-pointer data-[state=checked]:bg-[#2F2F49]'
            checked={state.wind_speed === 'km/h'}
            onCheckedChange={() => updateWindSpeed('km/h')}
          >
            km/h
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className='w-full focus:bg-transparent cursor-pointer data-[state=checked]:bg-[#2F2F49]'
            checked={state.wind_speed === 'mph'}
            onCheckedChange={() => updateWindSpeed('mph')}
          >
            mph
          </DropdownMenuCheckboxItem>
        </div>

        <DropdownMenuSeparator />

        <div className='flex flex-col items-start justify-start w-full'>
          <DropdownMenuLabel className='text-neutral-500 text-xs'>
            Precipitation
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            className='w-full focus:bg-transparent cursor-pointer data-[state=checked]:bg-[#2F2F49]'
            checked={state.precipitation === 'mm'}
            onCheckedChange={() => updatePrecipitation('mm')}
          >
            Millimeters (mm)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className='w-full focus:bg-transparent cursor-pointer data-[state=checked]:bg-[#2F2F49]'
            checked={state.precipitation === 'in'}
            onCheckedChange={() => updatePrecipitation('in')}
          >
            Inches (in)
          </DropdownMenuCheckboxItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
