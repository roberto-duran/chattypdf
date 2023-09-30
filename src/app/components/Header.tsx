import Link from 'next/link'

import { LuLogIn } from 'react-icons/lu'
import Logo from './shared/Logo'
import { getSession } from '@/lib/auth/session'
import UserProfileMenu from './shared/UserProfileMenu'

export default async function Header () {
  const session = await getSession()
  const userAvatar = session?.user?.image
  return (
    <header className='flex justify-between items-center w-full mt-5 pb-5 border-b sm:px-4 px-2 border-slate-600 gap-2'>
      <Logo linkUrl='/' />
      {session ? (
        <UserProfileMenu userAvatar={userAvatar} />
      ) : (
        <Link
          className='btn btn-outline btn-sm px-8 rounded-full cool-btn'
          href='/auth/login'
        >
          <p>Login</p>
          <LuLogIn />
        </Link>
      )}
    </header>
  )
}
