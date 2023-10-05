import Link from 'next/link'
import { RiTwitterXLine } from 'react-icons/ri'
import { AiOutlineGithub } from 'react-icons/ai'

export default function Footer () {
  return (
    <footer className='flex flex-col h-12 sm:flex-row justify-between items-center w-full mb-5 pt-5 sm:px-4 px-2 border-t border-slate-600 gap-2'>
      <div className='text-gray-500'>
        Powered by{' '}
        <Link
          href='https://openai.com/'
          target='_blank'
          rel='noreferrer'
          className='font-bold hover:underline transition hover:text-gray-300 underline-offset-2'
        >
          OpenAI,{' '}
        </Link>
        <Link
          href='https://www.langchain.com/'
          target='_blank'
          rel='noreferrer'
          className='font-bold hover:underline transition hover:text-gray-300 underline-offset-2'
        >
          LangChain{' '}
        </Link>
        and{' '}
        <Link
          href='https://vercel.com/'
          target='_blank'
          rel='noreferrer'
          className='font-bold hover:underline transition hover:text-gray-300 underline-offset-2'
        >
          Vercel.
        </Link>
      </div>
      <div className='flex space-x-4 pb-4 sm:pb-0'>
        <Link
          href='https://x.com/robertoduranb'
          className='group'
          aria-label='ChattyPdf on Twitter'
        >
          <RiTwitterXLine />
        </Link>
        <Link
          href='https://github.com/roberto-duran/chattypdf'
          className='group'
          aria-label='ChattyPdf on GitHub'
        >
          <AiOutlineGithub />
        </Link>
      </div>
    </footer>
  )
}
