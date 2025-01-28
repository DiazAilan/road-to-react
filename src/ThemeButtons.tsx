import { Button } from "./Button"
import { ThemeContextInterface, THEMES } from "./contexts/ThemeContext"

interface ThemeButtonsProps {
  onChange: (theme: ThemeContextInterface) => void;
}

export const ThemeButtons = ({ onChange }: ThemeButtonsProps) => {

  return Object.entries(THEMES).map(([themeName, theme]) => (
    <Button onClick={() => onChange(theme)} key={themeName}>
      {themeName}
    </Button>
  ))
}