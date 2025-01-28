import { Context, createContext } from "react";

interface ThemeContextInterface {
  main?: string,
  sub?: string
}

export const lightTheme = {
  main: 'white',
  sub: 'black'
}

export const darkTheme = {
  main: '#333',
  sub: 'white'
}

export const ThemeContext: Context<ThemeContextInterface> = createContext({})