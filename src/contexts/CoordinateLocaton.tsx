'use client'

import { createContext, useState, type ReactNode } from 'react'

interface CoordinateType {
  log: number
  lat: number
}

interface CoordinateLocationContextType {
  coordinate: CoordinateType | null
  resetCoordinateLocation: () => void
  updateCoordinateLocation: (props: CoordinateType) => void
}

export const CoordinateLocationContext = createContext(
  {} as CoordinateLocationContextType
)

export function CoordinateLocationProvider({
  children,
}: {
  children: ReactNode
}) {
  const [coordinate, setCoordinate] = useState<CoordinateType | null>(null)

  function updateCoordinateLocation({ lat, log }: CoordinateType) {
    setCoordinate({ lat, log })
  }

  function resetCoordinateLocation() {
    setCoordinate(null)
  }

  return (
    <CoordinateLocationContext.Provider
      value={{ coordinate, updateCoordinateLocation, resetCoordinateLocation }}
    >
      {children}
    </CoordinateLocationContext.Provider>
  )
}
