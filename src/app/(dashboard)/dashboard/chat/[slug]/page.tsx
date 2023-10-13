import Chat from '@/app/(dashboard)/components/Chat'
import PDFViewer from '@/app/(dashboard)/components/PDFViewer'

export default function ChatDetail () {
  const url =
    'https://res.cloudinary.com/rssolutions/image/upload/v1697048111/pdf/javascript_dc5jqb.pdf'

  return (
    <section
      id='chat'
      className='flex flex-col gap-10 md:flex-row md:gap-4 pt-4 px-2  h-[91.8vh]'
    >
      <div className='hidden md:block md:w-1/2'>
        <PDFViewer file={url} fullHeight={true} />
      </div>
      <div className='w-full md:w-1/2'>
        <Chat />
      </div>
    </section>
  )
}
