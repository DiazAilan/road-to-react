import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'

const domNode = document.getElementById('root');

createRoot(domNode!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
