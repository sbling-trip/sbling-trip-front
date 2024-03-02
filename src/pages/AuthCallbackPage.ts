import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useAuth from '@auth/useAuth'

const AuthCallbackPage = () => {
  const location = useLocation()
  const { user, handleAuthorization } = useAuth()

  useEffect(() => {
    if (user) return
    handleAuthorization(location.search)
  }, [location.search])

  return null
}

export default AuthCallbackPage
