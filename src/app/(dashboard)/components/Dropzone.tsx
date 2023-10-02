'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { getSignature, saveToDatabase } from '@/_actions/upload'
import { toast } from 'react-hot-toast'
import { BiUpload } from 'react-icons/bi'

type DropzoneProps = {
  className?: string
}

type PDFViewerProps = {
  file: File
}

const PDFViewer = ({ file }: PDFViewerProps) => {
  return (
    <article className='w-full space-y-4'>
      <h2 className='text-center'>{file.name}</h2>
      <object
        data={URL.createObjectURL(file)}
        type='application/pdf'
        width='100%'
        height='600px'
      />
    </article>
  )
}

const Dropzone = ({ className }: DropzoneProps) => {
  const [file, setFile] = useState<File>()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      const attachement = acceptedFiles[0]
      if (attachement.size! > 4 * 1024 * 1024) {
        // bigger than 4mb!
        toast.error('File too large')
        return
      }
      setFile(attachement)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        'application/pdf': ['.pdf']
      },
      maxFiles: 1,
      onDrop
    })

  async function action () {
    if (!file) return

    // get a signature using server action
    const { timestamp, signature } = await getSignature()

    // upload to cloudinary using the signature
    const formData = new FormData()

    formData.append('file', file)
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
    formData.append('signature', signature)
    formData.append('timestamp', timestamp)
    formData.append('folder', 'next')

    const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL as string
    const data = await fetch(endpoint, {
      method: 'POST',
      body: formData
    }).then(res => res.json())

    // write to database using server actions
    await saveToDatabase({
      version: data?.version,
      signature: data?.signature,
      public_id: data?.public_id
    })
  }

  return (
    <form>
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
          <button className='btn btn-outline btn-wide cool-btn text-teal-300'>
            Use This Document
          </button>
        ) : (
          ''
        )}
        {/* selected image container */}
        {file && <PDFViewer file={file} />}
      </div>
    </form>
  )
}

export default Dropzone
