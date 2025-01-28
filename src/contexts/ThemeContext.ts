import { Context, createContext } from "react";

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

export const ThemeContext: Context<ThemeContextInterface> = createContext({})