'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { getSignature, createChat } from '@/_actions/ai_file_processor'
import { BiUpload } from 'react-icons/bi'
import PDFViewer from './PDFViewer'

type DropzoneProps = {
  className?: string
}

const Dropzone = ({ className }: DropzoneProps) => {
  const [file, setFile] = useState<File>()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      const attachement = acceptedFiles[0]
      if (attachement.size! > 4 * 1024 * 1024) {
        // bigger than 4mb!
        // TODO ADD ERRORS Alerts
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
    onDrop
  })

  async function handleSubmit () {
    if (!file) return

    // get a signature using server action
    const { timestamp, signature } = await getSignature()

    const formData = new FormData()

    formData.append('file', file)
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
    formData.append('signature', signature)
    formData.append('timestamp', timestamp)
    formData.append('folder', 'pdf')

    const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL as string
    const data = await fetch(endpoint, {
      method: 'POST',
      body: formData
    }).then(res => res.json())

    // write to database using server actions
    await createChat({
      version: data.version,
      url: data.secure_url,
      original_filename: data.original_filename,
      signature: data.signature,
      public_id: data.public_id
    })
  }

  return (
    <form action={handleSubmit}>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <div className='rounded-lg cursor-pointer p-10 outline-dashed outline-2 outline-teal-500 outline-offset-2 bg-white'>
          <div className='text-xl'>
            <input {...getInputProps({ name: 'file' })} />
            <div className='flex flex-col gap-2 items-center justify-start'>
              <BiUpload className='h-14 w-14 fill-current text-teal-500' />
              <div className='flex flex-col items-center w-full text-slate-500'>
                {isDragActive ? (
                  <p>Drop the file here ...</p>
                ) : (
                  <p>Drag & drop a file here</p>
                )}
                <div className='divider'>OR</div>
                <button className='btn btn-outline btn-wide bg-gradient-to-r from-slate-700 to-slate-900 border-slate-700 text-teal-300 hover:text-teal-100'>
                  Browse files
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center gap-6 mt-10 '>
        {file ? (
          <button
            className='btn btn-outline btn-wide cool-btn text-teal-300'
            type='submit'
          >
            Use This Document
          </button>
        ) : (
          ''
        )}
        {/* selected PDF container */}
        {file && (
          <article className='w-full space-y-4'>
            <h2 className='text-center'>{file.name}</h2>
            <PDFViewer file={file} />
          </article>
        )}
      </div>
    </form>
  )
}

export default Dropzone
