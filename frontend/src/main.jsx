import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode className="w-[80%] flex flex-col justify-center items-center">
    <App />
  </StrictMode>,
)
