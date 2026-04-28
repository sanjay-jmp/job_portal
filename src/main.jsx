import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'
import { shadesOfPurple } from "@clerk/themes";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider appearance={{
        baseTheme: shadesOfPurple,
      }}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)