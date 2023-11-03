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

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex h-[91vh] items-center justify-center sm:h-[93vh]">
        <div
          className="flex h-fit flex-col space-y-6
            rounded-md bg-white p-6 text-gray-800 shadow-amber-100"
        >
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
