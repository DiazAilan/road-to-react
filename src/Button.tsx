import { ReactNode } from "react"

interface ButtonProps {
  type?: 'button' | 'reset' | 'submit'
  onClick: () => void
  children: ReactNode
}

export const Button = ({type = 'button', onClick, children, ...rest}: ButtonProps) => {
  return (
    <button style={{cursor: 'pointer'}} type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}