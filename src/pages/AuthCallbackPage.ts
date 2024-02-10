import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useAuth from '@auth/useAuth'

const AuthCallbackPage = () => {
  const location = useLocation()
  const { handleAuthorization } = useAuth()

  useEffect(() => {
    handleAuthorization(location.search)
  }, [handleAuthorization, location.search])

  return null
}

export default AuthCallbackPage
