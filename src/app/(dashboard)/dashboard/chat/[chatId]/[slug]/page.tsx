import ChatContainer from '@/app/(dashboard)/components/chat/ChatContainer'
import PDFViewer from '@/app/(dashboard)/components/PDFViewer'
import { getDocumentInfoFromChatId } from '@/db/models/documents'

type Params = {
  params: {
    chatId: string
    slug: string
  }
}

export default async function ChatDetail ({ params }: Params) {
  const documentInfo = await getDocumentInfoFromChatId(params.chatId)

  return (
    <section
      id='chat'
      className='flex flex-col gap-10 md:flex-row md:gap-4 pt-4 px-2  h-[91.8vh]'
    >
      <div className='hidden md:block md:w-1/2'>
        <PDFViewer file={documentInfo!.url} fullHeight={true} />
      </div>
      <div className='w-full md:w-1/2'>
        <ChatContainer chatId={params.chatId} />
      </div>
    </section>
  )
}
