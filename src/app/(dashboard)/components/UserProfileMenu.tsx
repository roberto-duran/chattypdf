'use client'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

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
        className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
      >
        <li>
          <a className='justify-between'>
            Profile
            <span className='badge'>New</span>
          </a>
        </li>
        <li>
          <button onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
        </li>
      </ul>
    </div>
  )
}
