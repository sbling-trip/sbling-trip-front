import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useAlertContext } from '@hooks/useAlertContext'
import useUserInfo from './useUserInfo'

import authClientAxios from '@api/authClientAxios'
import { resetUser, setUser } from '@redux/userSlice'
import { User } from '@models/user'

export enum LOGIN_STATUS {
  LoginSuccess = 0,
  SignInRequired = 1,
  DifferentSocialLoginAttempt = 2,
}

const useAuth = () => {
  const [, setProviderToken] = useState<string | null>(null)
  const navigate = useNavigate()
  const { openAlert } = useAlertContext()

  const dispatch = useDispatch()
  const { user } = useUserInfo()

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_AUTH_SERVER_URL
    }/auth/account/redirect-login/google`
  }

  const handleAuthorization = async (search: string) => {
    const urlParams = new URLSearchParams(search)
    const authorizationCode = urlParams.get('code')

    if (authorizationCode) {
      try {
        const { data } = await authClientAxios.post(`/account/login/google`, {
          code: authorizationCode,
        })
        const { loginStatus, providerToken, accessToken } = data

        if (loginStatus in LOGIN_STATUS) {
          localStorage.setItem('access_token', accessToken)
          handleLoginStatus(loginStatus, providerToken, user)
        }
      } catch (error) {
        console.error('sendAuthorization failed:', error)
      }
    }
  }

  const handleLoginStatus = (
    loginStatus: LOGIN_STATUS,
    providerToken?: string,
    userData?: User | null,
  ) => {
    switch (loginStatus) {
      case LOGIN_STATUS.LoginSuccess:
        handleLoginSuccess(userData!)
        break
      case LOGIN_STATUS.SignInRequired:
        setProviderToken(providerToken || null)
        openAlert({
          title: 'Sbling Trip 회원 가입을 위한 추가 정보를 입력해주세요.',
          onConfirmClick: () => {
            navigate('/signup', { state: { providerToken } })
          },
        })
        break
      case LOGIN_STATUS.DifferentSocialLoginAttempt:
        handleDifferentSocialLoginAttempt(userData!)
        break
      default:
        break
    }
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

  const fetchSignOut = async () => {
    try {
      await authClientAxios.delete(`/account/sign-out`)
      localStorage.removeItem('access_token')
      dispatch(resetUser())
    } catch (error) {
      console.error('Error fetching sign out:', error)
    }
  }

  const handleSignOut = () => {
    openAlert({
      title:
        '회원을 탈퇴하시면 회원 정보 및 개인 이용 정보가 모두 삭제되며, 복구가 불가합니다.',
      subTitle: '정말 탈퇴하시겠습니까?',
      onConfirmClick: async () => {
        await fetchSignOut()
        openAlert({
          title: '회원 탈퇴가 완료 되었습니다.',
          onConfirmClick: handleConfirmClick,
        })
      },
      onCancelClick: () => {},
    })
  }

  const handleConfirmClick = () => {
    setTimeout(() => {
      window.location.href = '/'
    }, 100)
  }

  useEffect(() => {
    if (!user) {
      dispatch(resetUser())
    }
  }, [])

  return {
    user,
    fetchSignOut,
    handleSignOut,
    handleGoogleLogin,
    handleLogout,
    handleLoginStatus,
    handleAuthorization,
  }
}

export default useAuth
