import { ReactElement, useState, cloneElement } from "react";
import { Button } from "./Button";

interface DropdownProps {
  onClickItem: (index: number) => void;
  triggerLabel: string;
  menu: ReactElement[];
}

export const Dropdown = ({onClickItem, menu, triggerLabel}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen(): void {
    setIsOpen(!isOpen)
  }

  return (
    <div className='dropdown'>
      <Button onClick={handleOpen}>{triggerLabel}</Button>
      {isOpen
        ? <ul className="menu">
            {menu.map((menuItem, index) => (
              <li key={index} className="menu-item" onClick={() => onClickItem(index)}>
                {cloneElement(menuItem, {
                  onClick: () => setIsOpen(false)               
                })}
              </li>
            ))}
          </ul>
        : null}
    </div>
  )
}