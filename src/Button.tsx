import { MouseEventHandler, ReactNode, useContext } from "react"
import { ThemeContext } from "./contexts/ThemeContext"

interface ButtonProps {
  type?: 'button' | 'reset' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  disabled?: boolean
}

export const Button = ({type = 'button', onClick, children, ...rest}: ButtonProps) => {
  const theme = useContext(ThemeContext)

  return (
    <button style={{cursor: 'pointer', background: theme.main, color: theme.sub}} type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}