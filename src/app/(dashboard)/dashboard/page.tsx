import { redirect } from 'next/navigation'
import { getFirstDocumentByUser } from '@/models/documents'
import { getSession } from '@/lib/auth/session'

export default async function DashboardPage () {
  const session = await getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const document = await getFirstDocumentByUser(session?.user.id!)
  redirect(`/dashboard/${document ? `chat/${document.slug}` : 'new'}`)
}
