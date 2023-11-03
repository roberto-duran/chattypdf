import ChatContainer from '@/app/(dashboard)/components/chat/ChatContainer'
import PDFViewer from '@/app/(dashboard)/components/PDFViewer'
import { getDocumentInfoFromChatId } from '@/db/models/documents'
import { getMessagesByChatId } from '@/db/models/messages'

type Params = {
  params: {
    chatId: string
    slug: string
  }
}

export default async function ChatDetail({ params }: Params) {
  const documentInfo = await getDocumentInfoFromChatId(params.chatId)
  const getMessages = await getMessagesByChatId(params.chatId)
  return (
    <section
      id="chat"
      className="flex h-[91.8vh] flex-col gap-10 px-2 pt-4 md:flex-row  md:gap-4"
    >
      <div className="hidden md:block md:w-1/2">
        <PDFViewer file={documentInfo!.url} fullHeight={true} />
      </div>
      <div className="w-full md:w-1/2">
        <ChatContainer chatId={params.chatId} existingMessages={getMessages} />
      </div>
    </section>
  )
}
