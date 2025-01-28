import { MouseEventHandler, ReactNode } from "react"
import { ThemeContext } from "./contexts/ThemeContext"

interface ButtonProps {
  type?: 'button' | 'reset' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  disabled?: boolean
}

export const Button = ({type = 'button', onClick, children, ...rest}: ButtonProps) => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button style={{cursor: 'pointer', background: theme.main, color: theme.sub}} type={type} onClick={onClick} {...rest}>
          {children}
        </button>
      )}
    </ThemeContext.Consumer>
  )
}