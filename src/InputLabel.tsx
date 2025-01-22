import { ReactNode, useRef, useEffect } from "react"

export interface InputWithLabelProps {
  id: string
  value: string
  type?: string
  children: ReactNode
  isFocused: boolean
  onInputChange: (value: string) => void
}

export const InputWithLabel = ({
  id,
  children,
  isFocused,
  onInputChange,
  type = 'text',
  value
}: InputWithLabelProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFocused])

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        autoFocus={isFocused}
        onChange={event => onInputChange(event.target.value)}
        ref={inputRef}
        type={type}
        value={value}
      />
    </>
  )
}