import { redirect } from 'next/navigation'
import { getFirstChatByUser } from '@/db/models/chats'
import { getSession } from '@/lib/auth/session'

export default async function DashboardPage () {
  const session = await getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const chat = await getFirstChatByUser(session.user.id)
  redirect(`/dashboard/${chat ? `chat/${chat.slug}` : 'new'}`)
}
