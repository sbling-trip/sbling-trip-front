import { useContext } from 'react'
import { AlertContext } from '@contexts/AlertContext'

export const useAlertContext = () => {
  const context = useContext(AlertContext)

  if (!context) {
    throw new Error('No AlertContext Error')
  }

  return context
}
