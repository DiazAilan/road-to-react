import { MouseEventHandler, ReactNode } from "react"
import { useTheme } from "./contexts/ThemeContext"

interface ButtonProps {
  type?: 'button' | 'reset' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  disabled?: boolean
}

export const Button = ({type = 'button', onClick, children, ...rest}: ButtonProps) => {
  const {main, sub} = useTheme()

  return (
    <button style={{cursor: 'pointer', background: main, color: sub}} type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}