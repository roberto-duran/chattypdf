import Image from 'next/image'
import Link from 'next/link'

import { Nunito } from 'next/font/google'
import { LuLogIn } from 'react-icons/lu'

const nunito = Nunito({
  subsets: ['latin']
})

export default function Header () {
  return (
    <header className='flex justify-between items-center w-full mt-5 pb-5 border-b sm:px-4 px-2 border-slate-600 gap-2'>
      <Link href='/' className='flex items-center space-x-2'>
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
      <Link
        className='btn btn-outline btn-sm px-8 rounded-full hover:bg-slate-900 hover:border-slate-700 hover:text-white'
        href='/auth/login'
        rel='noopener noreferrer'
      >
        <p>Login</p>
        <LuLogIn />
      </Link>
    </header>
  )
}
