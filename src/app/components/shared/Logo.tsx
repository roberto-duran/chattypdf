import Image from 'next/image'
import Link from 'next/link'

import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin']
})

type LogoProps = {
  linkUrl: string
}

export default function Logo ({ linkUrl }: LogoProps) {
  return (
    <>
      <Link href={linkUrl} className='flex items-center space-x-2'>
        <Image
          alt='Logo ChattyPDF'
          src='/chattypdf.png'
          className='w-11 h-9 sm:w-12 sm:h-10'
          width={150}
          height={140}
        />
        <h1
          className={`sm:text-3xl text-xl text-teal-500 font-bold ml-2 tracking-tight ${nunito.className}`}
        >
          ChattyPDF
        </h1>
      </Link>
    </>
  )
}
