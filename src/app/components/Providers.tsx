import AlertContext from './shared/AlertProvider'

type Props = {
  children: React.ReactNode
}

export default function Providers ({ children }: Props) {
  return <AlertContext>{children}</AlertContext>
}
