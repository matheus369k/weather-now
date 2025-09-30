'use client'

import { useContext, useReducer, useRef, useState, type FormEvent } from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { ChevronDown, ChevronUp, Loader, Search } from 'lucide-react'
import { Input } from './ui/input'
import { getGeolocation, type PlaceType } from '@/services/get-geolocation'
import {
  getCountryFlag,
  type CountryFlagsType,
} from '@/services/get-country-flags'
import Image from 'next/image'
import { CoordinateLocationContext } from '@/contexts/CoordinateLocaton'

interface LocationList extends PlaceType {
  flags: CountryFlagsType
}

interface ReducerStateType {
  locations: LocationList[] | null
  is_loading: boolean
  is_error: boolean
  is_open: boolean
}

const REDUCER_ACTIONS = {
  START_LOADING: 'start/loading',
  UPDATE_LOCATION: 'update/location',
  RESET_LOCATION: 'reset/location',
  START_ERROR: 'start/error',
  TOGGLE_DROPDOWN: 'toggle/dropdown',
}

function reducer(
  state: ReducerStateType,
  action: { type: string; payload?: LocationList[] }
): ReducerStateType {
  switch (action.type) {
    case REDUCER_ACTIONS.START_LOADING:
      return {
        locations: null,
        is_loading: true,
        is_error: false,
        is_open: false,
      }

    case REDUCER_ACTIONS.START_ERROR:
      return {
        locations: null,
        is_loading: false,
        is_error: true,
        is_open: false,
      }

    case REDUCER_ACTIONS.UPDATE_LOCATION:
      return {
        locations: action.payload || state.locations,
        is_loading: false,
        is_error: false,
        is_open: true,
      }
    case REDUCER_ACTIONS.RESET_LOCATION:
      return {
        locations: null,
        is_loading: false,
        is_error: false,
        is_open: false,
      }

    case REDUCER_ACTIONS.TOGGLE_DROPDOWN:
      return {
        ...state,
        is_open: !state.is_open,
      }

    default:
      return state
  }
}

export function SearchCityForm() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const { updateCoordinateLocation } = useContext(CoordinateLocationContext)
  const [state, dispatch] = useReducer(reducer, {
    locations: null,
    is_loading: false,
    is_error: false,
    is_open: false,
  })

  async function requestFindCityLocation(event: FormEvent) {
    dispatch({ type: REDUCER_ACTIONS.START_LOADING })
    event.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const search = formData.get('search') as string | null

    if (!search) return

    const results = await getGeolocation(search)
    if (!results) {
      dispatch({ type: REDUCER_ACTIONS.START_ERROR })
      return
    }

    const locations: LocationList[] = []
    for (const result of results) {
      const flags = await getCountryFlag(result.country)

      if (flags) {
        locations.push({
          ...result,
          flags,
        })
        continue
      }

      locations.push({
        ...result,
        flags: {
          alt: 'not-found',
          png: 'https://placehold.co/32x16?text=Not+Found',
          svg: 'https://placehold.co/32x16?text=Not+Found',
        },
      })
    }

    dispatch({
      type: REDUCER_ACTIONS.UPDATE_LOCATION,
      payload: locations,
    })
  }

  function requestWeatherOfPlace({
    lat,
    log,
    location_name,
  }: {
    lat: number
    log: number
    location_name: string
  }) {
    dispatch({ type: REDUCER_ACTIONS.TOGGLE_DROPDOWN })
    updateCoordinateLocation({ lat, log, location_name })
  }

  function toggleLocationDropdown() {
    dispatch({ type: REDUCER_ACTIONS.TOGGLE_DROPDOWN })
  }

  return (
    <form
      ref={formRef}
      onSubmit={requestFindCityLocation}
      aria-label='search-form'
      className='flex flex-col gap-4 relative w-full max-w-2xl mx-auto sm:flex-row'
    >
      <div
        data-loading={state.is_loading}
        className='flex rounded-md relative w-full placeholder-shown:text-neutral-500 data-[loading=true]:text-neutral-500 overflow-hidden'
      >
        <Label
          htmlFor='search'
          data-error={state.is_error}
          className='absolute left-4 top-1/2 -translate-y-1/2 data-[error=true]:text-red-600'
        >
          <Search className='size-6' />
        </Label>

        <Input
          type='text'
          name='search'
          id='search'
          autoComplete='off'
          autoSave='off'
          required={true}
          minLength={3}
          data-error={state.is_error}
          readOnly={state.is_loading}
          placeholder='Search for a place, e.g., New York'
          className='dark:bg-[#262840] h-full text-lg p-4 px-4 border-transparent truncate pl-14 data-[error=true]:border-red-600 md:text-lg'
        />

        <Button
          disabled={!state.locations}
          type='button'
          onClick={toggleLocationDropdown}
          variant={'link'}
          className='size-fit bg-transparent absolute right-1 top-1/2 -translate-y-1/2 focus-visible:ring-0'
        >
          {state.is_open ? (
            <ChevronUp className='size-6' />
          ) : (
            <ChevronDown className='size-6' />
          )}
        </Button>
      </div>

      <ul
        data-dropdown={state.is_open}
        aria-label='search list'
        className='absolute top-16 rounded-md left-0 z-50 bg-[#262840] p-2 w-full opacity-0 transition-all duration-300 -translate-y-5 overflow-hidden data-[dropdown=false]:-z-10 data-[dropdown=true]:opacity-100 data-[dropdown=true]:translate-y-0'
      >
        {state.locations &&
          state.locations.map((location) => {
            return (
              <li
                key={location.id}
                onClick={() =>
                  requestWeatherOfPlace({
                    lat: location.latitude,
                    log: location.longitude,
                    location_name: `${location.country}/${location.name}`,
                  })
                }
                className='relative w-full flex items-center gap-2 text-sm p-4 px-2 cursor-pointer rounded-md overflow-hidden last-of-type:after:border-b-0 after:absolute after:bottom-0 after:border-neutral-500 after:border-b after:w-full hover:bg-[#2F2F49]'
              >
                <Image
                  src={location.flags.png}
                  alt={location.flags.alt}
                  width={32}
                  height={16}
                />
                <span className='w-full truncate'>
                  {location.country || 'unknown'} -{' '}
                  {location.admin1 || 'unknown'} - {location.name || 'unknown'}
                </span>
              </li>
            )
          })}
      </ul>

      <div
        data-loading={state.is_loading}
        aria-label='search list'
        className='absolute top-16 rounded-xl left-0 z-20 bg-[#262840] p-2 w-full opacity-0 transition-all duration-300 -translate-y-5 overflow-hidden data-[loading=false]:-z-10 data-[loading=true]:opacity-100 data-[loading=true]:translate-y-0'
      >
        <div className='relative w-full flex items-center gap-2 text-sm p-3 px-2 cursor-pointer rounded-md overflow-hidden'>
          <Loader className='size-6' />
          <span>Search in progress</span>
        </div>
      </div>

      <Button
        type='submit'
        disabled={state.is_loading}
        aria-label='submit-search-form'
        className='w-full rounded-md  bg-blue-500 text-neutral-50 text-xl p-7 px-12 border-none hover:bg-blue-700 disabled:bg-blue-700 sm:w-fit'
      >
        Search
      </Button>
    </form>
  )
}
