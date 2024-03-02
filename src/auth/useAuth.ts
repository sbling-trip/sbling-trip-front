import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useAlertContext } from '@hooks/useAlertContext'
import useUserInfo from './useUserInfo'

import authAxios from '@api/authAxios'
import { resetUser, setUser } from '@redux/userSlice'
import { User } from '@models/user'

export enum LOGIN_STATUS {
  LoginSuccess = 0,
  SignInRequired = 1,
  DifferentSocialLoginAttempt = 2,
}

const useAuth = () => {
  const [providerToken, setProviderToken] = useState<string | null>(null)
  const navigate = useNavigate()
  const { openAlert } = useAlertContext()

  const dispatch = useDispatch()
  const { user } = useUserInfo()

  const handleConfirmClick = () => {
    setTimeout(() => {
      window.location.href = '/'
    }, 100)
  }

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_AUTH_SERVER_URL
    }/auth/account/redirect-login/google`
  }

  const handleAuthorization = async (search: string) => {
    const urlParams = new URLSearchParams(search)
    const authorizationCode = urlParams.get('code')

    if (authorizationCode) {
      await sendAuthorization(authorizationCode)
    }
  }

  const sendAuthorization = async (code: string) => {
    try {
      const { data } = await authAxios.post(`/account/login/google`, { code })
      const { loginStatus, providerToken, accessToken } = data

      if (loginStatus in LOGIN_STATUS) {
        localStorage.setItem('access_token', accessToken)
        handleLoginStatus(loginStatus, providerToken, user)
      }
    } catch (error) {
      console.error('sendAuthorization failed:', error)
    }
  }

  const handleLoginStatus = (
    loginStatus: LOGIN_STATUS,
    providerToken?: string,
    userData?: User | null,
  ) => {
    const actions = {
      [LOGIN_STATUS.LoginSuccess]: handleLoginSuccess,
      [LOGIN_STATUS.SignInRequired]: () => {
        setProviderToken(providerToken || null)
        openAlert({
          title: 'Sbling Trip 회원 가입을 위한 추가 정보를 입력해주세요.',
          onConfirmClick: () => {
            navigate('/signup', { state: { providerToken } })
          },
        })
      },
      [LOGIN_STATUS.DifferentSocialLoginAttempt]:
        handleDifferentSocialLoginAttempt,
    }

    return actions[loginStatus]?.(userData!)
  }

  const handleLogout = () => {
    openAlert({
      title: '로그아웃 하시겠습니까?',
      onConfirmClick: () => {
        localStorage.removeItem('access_token')
        dispatch(resetUser())
        openAlert({
          title: '로그아웃 되었습니다.',
          onConfirmClick: handleConfirmClick,
        })
      },
      onCancelClick: () => {},
    })
  }

  const handleLoginSuccess = (userData: User) => {
    dispatch(setUser(userData))
    openAlert({
      title: '로그인이 완료되었습니다.',
      onConfirmClick: handleConfirmClick,
    })
  }

  const handleDifferentSocialLoginAttempt = (userData: User) => {
    openAlert({
      title: '이미 가입한 계정이 있습니다. 해당 계정으로 로그인 하시겠습니까?',
      onConfirmClick: () => {
        handleLoginSuccess(userData)
      },
    })
  }

  useEffect(() => {
    if (!user) {
      dispatch(resetUser())
    }
  }, [])

  return {
    user,
    handleGoogleLogin,
    handleLogout,
    handleLoginStatus,
    handleAuthorization,
  }
}

export default useAuth
