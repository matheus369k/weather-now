'use client'

import { Button } from '@/components/ui/button'
import { Ban, RefreshCw } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className='flex h-full flex-col items-center justify-center gap-8'>
      <span>
        <Ban className='size-10 text-neutral-500' />
      </span>
      <div className='flex flex-col items-center gap-6'>
        <h2 className='text-5xl w-full'>Something went wrong!</h2>
        <p className='text-center font-light max-w-lg text-md text-neutral-300'>
          We couldn't connect to the server (API error). Please try again in a
          few moments.
        </p>
      </div>
      <Button
        onClick={reset}
        className='bg-[#272441] text-neutral-100 hover:bg-[#2F2F49] border-none focus:outline-neutral-100 cursor-pointer focus-within:ring-neutral-50 focus-within:ring-1 hover:ring-transparent'
      >
        <RefreshCw /> Retry
      </Button>
    </main>
  )
}
