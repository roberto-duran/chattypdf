'use client'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

export default function Login () {
  return (
    <div className='flex flex-col gap-5 w-[20rem] h-60'>
      <Image
        src='/chattypdf.png'
        alt='ChattyPDF Logo'
        width={200}
        height={200}
        className='mx-auto w-20'
      />
      <h1 className='text-xl font-semibold text-center text-slate-700'>
        Hi, Welcome Back
      </h1>
      <div className='flex flex-col space-y-3 text-gray-800'>
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className='flex justify-between btn bg-gray-100 hover:bg-gray-300
                    hover:text-gray-800'
        >
          <FcGoogle className='w-8 h-6' />
          <span className='w-30 flex-grow-2'>Sign in with Google</span>
        </button>
        <button
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          className='flex justify-between btn bg-gray-100 hover:bg-gray-300
                    hover:text-gray-800'
        >
          <BsGithub className='w-8 h-6 text-slate-800' />
          <span className='w-30 flex-grow-2'>Sign in with GitHub</span>
        </button>
      </div>
    </div>
  )
}
