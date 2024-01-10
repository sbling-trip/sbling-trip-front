import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import reduxStore from '@redux/store'
import { AlertContextProvider } from '@contexts/AlertContext'
import '@styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <AlertContextProvider>
        <App />
      </AlertContextProvider>
    </Provider>
  </React.StrictMode>,
)
