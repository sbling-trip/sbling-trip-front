import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useAuth from '@auth/useAuth'

const AuthCallbackPage = () => {
  const location = useLocation()
  const { loggedIn, handleAuthorization } = useAuth()

  useEffect(() => {
    if (loggedIn) return
    handleAuthorization(location.search)
  }, [location.search, loggedIn])

  return null
}

export default AuthCallbackPage
