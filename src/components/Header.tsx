import Image from 'next/image'
import logo from '@/assets/svg/logo.svg'
import { UnitsFilter } from './UnitsFilter'
import Link from 'next/link'

export function Header() {
  return (
    <header className='flex justify-between max-w-[1444px] mx-auto py-8 px-4'>
      <Link href={'/'}>
        <Image
          src={logo}
          alt='Showing of sunflower and write of front weather now'
          aria-label='site logo'
        />
      </Link>

      <UnitsFilter />
    </header>
  )
}
