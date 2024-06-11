import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import reduxStore from '@redux/store'
import { AlertContextProvider } from '@contexts/AlertContext'
import { HelmetProvider } from 'react-helmet-async'
import '@styles/index.scss'

const rootElement = document.getElementById('root')!
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={reduxStore}>
        <AlertContextProvider>
          <App />
        </AlertContextProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
