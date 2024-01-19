import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlertContext } from '@hooks/useAlertContext'
import axiosInstance from '@api/axios'
import { RootState } from '@redux/store'
import { clearUser, setUser } from '@redux/userSlice'

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)

  const navigate = useNavigate()
  const { openAlert } = useAlertContext()

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_URL
    }/auth/google/redirect-login`
  }

  const handleLogout = () => {
    openAlert({
      title: '로그아웃 하시겠습니까?',
      onConfirmClick: () => {
        dispatch(clearUser())
        navigate('/')
      },
      onCancelClick: () => {},
    })
    setLoggedIn(false)
  }

  const sendAuthorization = async (code: string) => {
    try {
      const { data } = await axiosInstance.post(`/auth/google/login`, { code })
      dispatch(setUser(data.user))
      navigate('/')
    } catch (error) {
      console.error('Error processing sendAuthorization:', error)
    }
  }

  const handleAuthorization = async () => {
    const urlParams = new URLSearchParams(location.search)
    const authorizationCode = urlParams.get('code') ?? ''

    if (authorizationCode) {
      await sendAuthorization(authorizationCode)
    }

    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }

  useEffect(() => {
    handleAuthorization()
  }, [user])

  return {
    loggedIn,
    user,
    handleGoogleLogin,
    handleLogout,
  }
}

export default useAuth
