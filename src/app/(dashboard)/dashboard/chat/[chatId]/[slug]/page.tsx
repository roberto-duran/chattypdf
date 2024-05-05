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
      className="grid h-[91.8vh] grid-cols-4 gap-4 px-2 pt-4"
    >
      <div className="col-span-1">
        <button className="px">
          jljflsjd
        </button>
      </div>
      <div className="col-span-3 row-span-1 hidden md:block">
        <PDFViewer file={documentInfo!.url} fullHeight={true} />
      </div>
      <div className="col-span-3 row-span-1">
        <ChatContainer chatId={params.chatId} existingMessages={getMessages} />
      </div>
    </section>
  )
}
