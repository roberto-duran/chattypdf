import Link from 'next/link'
import Image from 'next/image'

import { Nunito } from 'next/font/google'
import UserProfileMenu from './UserProfileMenu'

const nunito = Nunito({
  subsets: ['latin']
})

type DashboardHeaderProps = {
  userAvatar: string | null | undefined
}

export default function DashboardHeader ({ userAvatar }: DashboardHeaderProps) {
  return (
    <header className='flex justify-between items-center w-full mt-2 pb-2 border-b sm:px-4 px-2 border-slate-600 gap-2'>
      <Link href='/dashboard' className='flex items-center space-x-2'>
        <Image
          alt='Logo ChattyPDF'
          src='/chattypdf.png'
          className='w-11 h-9 sm:w-12 sm:h-10'
          width={150}
          height={140}
        />
        <h1
          className={`sm:text-3xl text-xl font-bold ml-2 tracking-tight ${nunito.className}`}
        >
          ChattyPDF
        </h1>
      </Link>
      <UserProfileMenu userAvatar={userAvatar} />
    </header>
  )
}
