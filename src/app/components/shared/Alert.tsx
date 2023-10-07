import { useContext } from 'react'
import { IconType } from 'react-icons'
import AlertContext from './AlertProvider'

export type AlertProps = {
  type?: 'alert-info' | 'alert-success' | 'alert-warning' | 'alert-error'
  message: string
  icon?: IconType
}

export default function Alert ({ type, message, icon }: AlertProps) {
  const [alert] = useContext(AlertContext)

  if (!alert) {
    return null
  }

  const Icon = icon || alert.icon
  return (
    <div className={`alert ${type} text-white`}>
      {Icon && <Icon className='mr-2' />}
      <span>{message}</span>
    </div>
  )
}
