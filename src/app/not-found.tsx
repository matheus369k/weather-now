import { ArrowLeft, Ban } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className='flex h-full flex-col items-center justify-center gap-8'>
      <span>
        <Ban className='size-10 text-neutral-500' />
      </span>
      <div className='flex flex-col items-center gap-6'>
        <h2 className='text-5xl w-full text-center'>Unknown current route!</h2>
        <p className='text-center font-light max-w-lg text-md text-neutral-300'>
          Current route not exist. Please back to home page.
        </p>
      </div>
      <Link style={{ all: 'unset' }} href='/'>
        <Button className='bg-[#272441] text-neutral-100 hover:bg-[#2F2F49] border-none focus:outline-neutral-100 cursor-pointer focus-within:ring-neutral-50 focus-within:ring-1 hover:ring-transparent'>
          Back
        </Button>
      </Link>
    </main>
  )
}
