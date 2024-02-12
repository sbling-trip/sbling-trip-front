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
        dispatch(resetUser())
        setLoggedIn(false)
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
    openAlert({
      title: '로그인이 완료되었습니다.',
      onConfirmClick: () => {
        navigate('/')
        setLoggedIn(true)
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
    switch (loginStatus) {
      case LOGIN_STATUS.LoginSuccess:
        handleLoginSuccess(accessToken!)
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
        handleDifferentSocialLoginAttempt(accessToken!)
        break
      default:
        break
    }
  }

  const sendAuthorization = async (code: string) => {
    try {
      const { data } = await authAxios.post(`account/login/google`, { code })
      console.log('sendAuthorization data:', data)

      const { loginStatus, providerToken, accessToken } = data

      switch (loginStatus) {
        case LOGIN_STATUS.LoginSuccess:
          if (accessToken) {
            localStorage.setItem('access_token', accessToken)
            handleLoginStatus(LOGIN_STATUS.LoginSuccess, undefined, accessToken)
          }
          break
        case LOGIN_STATUS.SignInRequired:
          handleLoginStatus(LOGIN_STATUS.SignInRequired, providerToken)
          break
        case LOGIN_STATUS.DifferentSocialLoginAttempt:
          handleLoginStatus(LOGIN_STATUS.DifferentSocialLoginAttempt)
          break
        default:
          break
      }
    } catch (error) {
      console.error('sendAuthorization failed:', error)
    }
  }

  const handleAuthorization = async (search: string) => {
    const urlParams = new URLSearchParams(search)
    const authorizationCode = urlParams.get('code') || ''

    if (authorizationCode) {
      await sendAuthorization(authorizationCode)
    }
  }

  const fetchTokensInfo = async (accessToken: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    try {
      const { data } = await authAxios.get(`tokens/info`, config)
      console.log('fetchTokensInfo data:', data)
    } catch (error) {
      console.error('Error fetching tokens info:', error)
      dispatch(resetUser())
      openAlert({
        title: '로그인이 만료되었습니다. 다시 로그인해주세요.',
        onConfirmClick: () => {
          navigate('/login')
        },
      })
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
    if (storedAccessToken) {
      fetchTokensInfo(storedAccessToken)
      dispatch(setUser(storedAccessToken))
    }
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
