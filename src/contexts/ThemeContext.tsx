import { Context, createContext, useContext } from "react";

export interface ThemeContextInterface {
  main?: string,
  sub?: string
}

export const THEMES = {
  Light: {
    main: 'white',
    sub: 'black'
  },
  Dark: {
    main: '#333',
    sub: 'white'
  },
  Royal: {
    main: 'purple',
    sub: 'pink'
  },
  DeepBlue: {
    main: 'darkblue',
    sub: 'lightblue'
  }
}

const ThemeContext: Context<ThemeContextInterface> = createContext({})

export function useTheme(): ThemeContextInterface {
  return useContext(ThemeContext)
}

interface ThemeProviderProps {
  theme: ThemeContextInterface;
  children: React.ReactNode;
}

export const ThemeProvider = ({theme, children}: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
} 