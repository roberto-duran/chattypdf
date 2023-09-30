import '../globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import Footer from '../components/Footer'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin-ext'],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  title: {
    default: 'ChattyPDF | Login',
    template: '%s | ChattyPDF'
  }
}

export default async function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  // if (session) {
  //   redirect('/')
  // }
  return (
    <>
      <main className='flex justify-center items-center h-[91vh] sm:h-[93vh]'>
        <div
          className='flex flex-col bg-white h-fit
            shadow-amber-100 text-gray-800 p-6 rounded-md space-y-6'
        >
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
