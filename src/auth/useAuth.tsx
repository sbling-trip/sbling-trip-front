import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlertContext } from '@hooks/useAlertContext'
import { RootState } from '@redux/store'
import { clearUser } from '@redux/userSlice'

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)

  const navigate = useNavigate()
  const { openAlert } = useAlertContext()

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

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_URL
    }/auth/google/redirect-login`
  }

  if (user) {
    setLoggedIn(true)
  } else {
    setLoggedIn(false)
  }

  return {
    loggedIn,
    user,
    handleGoogleLogin,
    handleLogout,
  }
}

export default useAuth
