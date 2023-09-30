import UserProfileMenu from '@/app/components/shared/UserProfileMenu'
import Logo from '@/app/components/shared/Logo'

type DashboardHeaderProps = {
  userAvatar: string | null | undefined
}

export default function DashboardHeader ({ userAvatar }: DashboardHeaderProps) {
  return (
    <header className='flex justify-between items-center w-full mt-2 pb-2 border-b sm:px-4 px-2 border-slate-600 gap-2'>
      <Logo linkUrl='/dashboard' />
      <UserProfileMenu userAvatar={userAvatar} />
    </header>
  )
}
