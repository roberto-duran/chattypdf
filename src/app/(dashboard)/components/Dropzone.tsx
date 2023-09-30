'use client'

import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { getSignature, saveToDatabase } from '@/_actions/upload'
import { toast } from 'react-hot-toast'
import { BiUpload } from 'react-icons/bi'

export interface DropFile extends File {
  preview: string
}

type DropzoneProps = {
  className?: string
}

const Dropzone = ({ className }: DropzoneProps) => {
  const [file, setFile] = useState<DropFile>()

  useEffect(() => {
    if (file) {
      action()
    }
  }, [file])

  const onDrop = useCallback((acceptedFiles: DropFile[]) => {
    if (acceptedFiles?.length) {
      const attachement = acceptedFiles[0]
      if (attachement.size > 4 * 1024 * 1024) {
        // bigger than 4mb!
        toast.error('File too large')
        return
      }
      setFile(attachement)
      action()
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'pdf/*': ['.pdf']
    },
    maxFiles: 1,
    // @ts-ignore //after feature is finish review this type error
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
        <div className='flex flex-col text-muted-foreground rounded-lg cursor-pointer px-4 py-2 outline-dashed outline-2 outline-offset-2'>
          <div className='text-sm'>
            <input {...getInputProps({ name: 'file' })} />
            <div className='flex gap-2 items-center justify-start'>
              <BiUpload className='h-4 w-4 fill-current' />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (
                <p>Drag & drop a file here, or click to select files</p>
              )}
            </div>
          </div>
          {/* selected image container */}
          {file && <label className='text-xs'>{file.name}</label>}
        </div>
      </div>
    </form>
  )
}

export default Dropzone
