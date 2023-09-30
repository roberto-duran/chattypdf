import Image from 'next/image'
import Link from 'next/link'

import Footer from './components/Footer'
import Header from './components/Header'

export default function Home () {
  return (
    <>
      <Header />
      <main className='flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient'>
        <Link
          href='https://github.com/roberto-duran/chattypdf'
          target='_blank'
          className='border border-slate-700 bg-slate-900 rounded-full py-2 px-4 text-gray-200 text-sm mb-5'
        >
          Clone and create your own version{' '}
          <span className='text-blue-600'>Github</span>
        </Link>
        <div className='bg-radian flex flex-col items-center gap-5'>
          <h1 className='mx-auto max-w-4xl font-display text-5xl font-semibold tracking-normal text-gray-300 sm:text-6xl'>
            Analize/Sumarize your pdf's{' '}
            <span className='relative whitespace-nowrap text-blue-800'>
              <span className='relative'>using AI</span>
            </span>{' '}
            for free.
          </h1>
          <Link
            className='btn btn-outline btn-wide cool-btn'
            href='/auth/login'
          >
            Chat with your PDF's
          </Link>
          <h2 className='mx-auto max-w-xl text-lg text-gray-300 leading-7'>
            Snap a chat PDF and explore its contents effortlessly. Totally free
            - streamline your PDF conversations today!
          </h2>
        </div>
        <div className='flex justify-between items-center w-full flex-col sm:mt-10 mt-6'>
          <div className='space-y-10 mt-4 mb-16'>
            <Image
              alt='Original photo of a room with roomGPT.io'
              src='/400.svg'
              className='object-cover rounded-md'
              width={600}
              height={400}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
