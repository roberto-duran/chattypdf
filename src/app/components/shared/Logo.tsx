import Image from 'next/image'
import Link from 'next/link'

import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin']
})

type LogoProps = {
  linkUrl: string
}

export default function Logo({ linkUrl }: LogoProps) {
  return (
    <>
      <Link href={linkUrl} className="flex items-center space-x-2">
        <Image
          alt="Logo ChattyPDF"
          src="/chattypdf.png"
          className="h-9 w-11 sm:h-10 sm:w-12"
          width={40}
          height={48}
        />
        <h1
          className={`ml-2 text-xl font-bold tracking-tight text-teal-500 sm:text-3xl ${nunito.className}`}
        >
          ChattyPDF
        </h1>
      </Link>
    </>
  )
}
