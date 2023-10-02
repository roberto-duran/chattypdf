import './dashboard.module.css'
import type { Metadata } from 'next'
import DashboardHeader from './components/DashboardHeader'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'

export const metadata: Metadata = {
  title: 'chattyPDF',
  description: 'Chat with your PDFs using the power of AI.'
}

export default async function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) {
    redirect('/auth/login')
  }
  const userAvatar = session.user.image

  return (
    <main className='h-screen flex flex-col'>
      <DashboardHeader userAvatar={userAvatar} />
      <section className='flex-1'>{children}</section>
    </main>
  )
}
