import './globals.css'
import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'
import React from "react";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'chattyPDF',
  description: 'Chat with your PDFs using the power of AI.'
}

export default async function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang='en'>
    <body className={poppins.className}>{children}</body>
    </html>
  )
}
