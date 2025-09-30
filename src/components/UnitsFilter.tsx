'use client'

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
import { MetricPrettierContext } from '@/contexts/MetricPrettiers'
import { Settings, ChevronDown } from 'lucide-react'
import { useContext } from 'react'

export function UnitsFilter() {
  const metricPrettierContext = useContext(MetricPrettierContext)

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
          onClick={metricPrettierContext.createImperialOrMetricFilters}
          className='focus:bg-[#2F2F49] text-sm'
        >
          Switch to{' '}
          {metricPrettierContext.metricPrettier.type === 'metric'
            ? 'imperial'
            : 'metric'}
        </DropdownMenuItem>

        <div className='flex flex-col items-start justify-start w-full'>
          <DropdownMenuLabel className='text-neutral-500 text-xs'>
            Temperature
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            className='w-full focus:bg-transparent cursor-pointer data-[state=checked]:bg-[#2F2F49]'
            checked={
              metricPrettierContext.metricPrettier.temperature === 'celsius'
            }
            onCheckedChange={() =>
              metricPrettierContext.updateTemperature('celsius')
            }
          >
            Celsius (°C)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className='w-full focus:bg-transparent cursor-pointer data-[state=checked]:bg-[#2F2F49]'
            checked={
              metricPrettierContext.metricPrettier.temperature === 'fahrenheit'
            }
            onCheckedChange={() =>
              metricPrettierContext.updateTemperature('fahrenheit')
            }
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
            checked={metricPrettierContext.metricPrettier.wind_speed === 'kmh'}
            onCheckedChange={() => metricPrettierContext.updateWindSpeed('kmh')}
          >
            km/h
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className='w-full focus:bg-transparent cursor-pointer data-[state=checked]:bg-[#2F2F49]'
            checked={metricPrettierContext.metricPrettier.wind_speed === 'mph'}
            onCheckedChange={() => metricPrettierContext.updateWindSpeed('mph')}
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
            checked={
              metricPrettierContext.metricPrettier.precipitation === 'mm'
            }
            onCheckedChange={() =>
              metricPrettierContext.updatePrecipitation('mm')
            }
          >
            Millimeters (mm)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className='w-full focus:bg-transparent cursor-pointer data-[state=checked]:bg-[#2F2F49]'
            checked={
              metricPrettierContext.metricPrettier.precipitation === 'inch'
            }
            onCheckedChange={() =>
              metricPrettierContext.updatePrecipitation('inch')
            }
          >
            Inches (in)
          </DropdownMenuCheckboxItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
