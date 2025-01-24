import { ReactNode } from "react"

interface ButtonProps {
  type?: 'button' | 'reset' | 'submit'
  onClick?: Function
  children: ReactNode
  disabled?: boolean
}

export const Button = ({type = 'button', onClick, children, ...rest}: ButtonProps) => {
  return (
    <button style={{cursor: 'pointer'}} type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}