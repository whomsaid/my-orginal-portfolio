import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/jetbrains-mono'
import App from './App.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
