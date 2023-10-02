import React from 'react'
import Dropzone from '../../components/Dropzone'

export default function NewPage () {
  return (
    <div className='max-w-4xl p-6 mx-auto'>
      <article className='flex flex-col gap-4 items-center justify-center mb-10'>
        <h1 className='text-4xl font-bold'>
          New <span className='text-teal-500'>PDF</span>
        </h1>
        <p className='text-lg text-gray-200'>
          Upload a PDF to start chatting with it.
        </p>
      </article>
      <Dropzone className='' />
    </div>
  )
}
