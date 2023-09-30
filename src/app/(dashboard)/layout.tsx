import './dashboard.module.css'
import type { Metadata } from 'next'
import DashboardHeader from './components/DashboardHeader'
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
  const userAvatar = session?.user?.image
  return (
    <>
      <DashboardHeader userAvatar={userAvatar} />
      <main>{children}</main>
    </>
  )
}
