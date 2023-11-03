'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { generateChatAI, getSignature } from '@/app/_actions/ai_file_processor'
import { BiUpload } from 'react-icons/bi'
import toast, { Toaster } from 'react-hot-toast'
import PDFViewer from './PDFViewer'
import { redirect } from 'next/navigation'

type DropzoneProps = {
  className?: string
}

const Dropzone = ({ className }: DropzoneProps) => {
  const [file, setFile] = useState<File>()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      const attachement = acceptedFiles[0] // only one file allowed
      if (attachement.size! > 4 * 1024 * 1024) {
        // bigger than 4mb!
        toast.error('File size is too big!')
        return
      }
      setFile(attachement)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    onDrop,
    onDropRejected: () => {
      toast.error('Only PDF files are allowed!')
    }
  })

  async function handleSubmit() {
    if (!file) return

    // get a signature using server action
    const { timestamp, signature } = await getSignature()

    const formData = new FormData()

    formData.append('file', file)
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
    formData.append('signature', signature)
    formData.append('timestamp', timestamp)
    formData.append('folder', 'pdf')
    console.log('file', file)
    const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL as string
    const data = await fetch(endpoint, {
      method: 'POST',
      body: formData
    }).then(res => res.json())

    // write to database using server actions
    const newChat = await generateChatAI({
      version: data.version,
      url: data.secure_url,
      original_filename: data.original_filename,
      signature: data.signature,
      public_id: data.public_id,
      size: file.size
    })
    if (newChat) {
      redirect(`/dashboard/chat/${newChat}`)
    }
  }

  return (
    <form action={handleSubmit}>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <div className="cursor-pointer rounded-lg bg-white p-10 outline-dashed outline-2 outline-offset-2 outline-teal-500">
          <div className="text-xl">
            <input {...getInputProps({ name: 'file' })} />
            <div className="flex flex-col items-center justify-start gap-2">
              <BiUpload className="h-14 w-14 fill-current text-teal-500" />
              <div className="flex w-full flex-col items-center text-slate-500">
                {isDragActive ? (
                  <p>Drop the file here ...</p>
                ) : (
                  <p>Drag & drop a file here</p>
                )}
                <div className="divider">OR</div>
                <button className="btn btn-outline btn-wide border-slate-700 bg-gradient-to-r from-slate-700 to-slate-900 text-teal-300 hover:text-teal-100">
                  Browse files
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center gap-6 ">
        {file ? (
          <div
            className="tooltip"
            data-tip="In this iteration only one document is alowed"
          >
            <button
              className="cool-btn btn btn-outline btn-wide text-teal-300"
              type="submit"
            >
              Use This Document
            </button>
          </div>
        ) : (
          ''
        )}
        {/* selected PDF container */}
        {file && (
          <article className="w-full space-y-4">
            <h2 className="text-center">{file.name}</h2>
            <PDFViewer file={file} />
          </article>
        )}
      </div>
      <Toaster />
    </form>
  )
}

export default Dropzone
