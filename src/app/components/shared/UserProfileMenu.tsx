'use client'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

type UserProfileMenuProps = {
  userAvatar: string | null | undefined
}

export default function UserProfileMenu ({ userAvatar }: UserProfileMenuProps) {
  return (
    <div className='dropdown dropdown-end'>
      <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
        <div className='w-10 rounded-full'>
          <Image
            alt='user avatar'
            src={userAvatar || ''}
            width={100}
            height={100}
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-lg w-52 bg-gradient-to-r from-slate-700 to-slate-900 border-slate-700 text-teal-300'
      >
        <li>
          <Link href='/dashboard' className='justify-between'>
            Dashboard
          </Link>
        </li>
        <li>
          <button onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
        </li>
      </ul>
    </div>
  )
}
