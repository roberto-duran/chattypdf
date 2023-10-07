'use client'

import { createContext, useEffect, useRef, useState } from 'react'
import { AlertProps } from './Alert'

const AlertContext = createContext({})

export default function AlertProvider ({
  children
}: {
  children: React.ReactNode
}) {
  const [alert, setAlert] = useState<AlertProps | null>(null)
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setAlert(null)
    }, 5000)
  }, [alert])

  return (
    <AlertContext.Provider value={[alert, setAlert]}>
      {children}
    </AlertContext.Provider>
  )
}
