import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlertContext } from '@hooks/useAlertContext'
import authAxios from '@api/authAxios'
import { RootState } from '@redux/store'
import { resetUser, setUser } from '@redux/userSlice'

export enum LOGIN_STATUS {
  LoginSuccess = 0,
  SignInRequired = 1,
  DifferentSocialLoginAttempt = 2,
}

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [providerToken, setProviderToken] = useState<string | null>(null)

  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)

  const navigate = useNavigate()
  const { openAlert } = useAlertContext()

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_AUTH_SERVER_URL
    }/auth/account/redirect-login/google`
  }

  const handleLogout = () => {
    openAlert({
      title: '로그아웃 하시겠습니까?',
      onConfirmClick: () => {
        localStorage.removeItem('access_token')
        openAlert({
          title: '로그아웃 되었습니다.',
          onConfirmClick: () => {
            setTimeout(() => {
              window.location.href = '/'
            }, 100)
          },
        })
      },
      onCancelClick: () => {},
    })
  }

  const handleLoginSuccess = (accessToken: string) => {
    dispatch(setUser(accessToken))
    setLoggedIn(true)
    openAlert({
      title: '로그인이 완료되었습니다.',
      onConfirmClick: () => {
        navigate('/')
      },
    })
  }

  const handleDifferentSocialLoginAttempt = (accessToken: string) => {
    openAlert({
      title: '이미 가입한 계정이 있습니다. 해당 계정으로 로그인 하시겠습니까?',
      onConfirmClick: () => {
        handleLoginSuccess(accessToken)
      },
    })
  }

  const handleLoginStatus = (
    loginStatus: LOGIN_STATUS,
    providerToken?: string,
    accessToken?: string,
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

    return actions[loginStatus]?.(accessToken!)
  }

  const sendAuthorization = async (code: string) => {
    try {
      const { data } = await authAxios.post(`account/login/google`, { code })
      console.log('sendAuthorization data:', data)

      const { loginStatus, providerToken, accessToken } = data

      if (loginStatus in LOGIN_STATUS) {
        localStorage.setItem('access_token', accessToken)
        handleLoginStatus(loginStatus, providerToken, accessToken)
      }
    } catch (error) {
      console.error('sendAuthorization failed:', error)
    }
  }

  const handleAuthorization = async (search: string) => {
    const urlParams = new URLSearchParams(search)
    const authorizationCode = urlParams.get('code')

    if (authorizationCode) {
      await sendAuthorization(authorizationCode)
    }
  }

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [user])

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token')

    const validateToken = async (accessToken: string) => {
      try {
        await authAxios.get('/tokens/info')
        dispatch(setUser(accessToken))
        setLoggedIn(true)
      } catch (error) {
        console.error('Error validating token:', error)
        localStorage.removeItem('access_token')
        dispatch(resetUser())
        setLoggedIn(false)
        openAlert({
          title: '토큰이 유효하지 않습니다. 다시 로그인 해주세요.',
          onConfirmClick: () => {
            setTimeout(() => {
              window.location.href = '/login'
            }, 100)
          },
        })
      }
    }

    if (!storedAccessToken) {
      dispatch(resetUser())
      setLoggedIn(false)
      return
    }

    validateToken(storedAccessToken)
  }, [])

  return {
    user,
    loggedIn,
    handleGoogleLogin,
    handleLogout,
    handleLoginStatus,
    handleAuthorization,
  }
}

export default useAuth
