import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlertContext } from '@hooks/useAlertContext'

import { RootState } from '@redux/store'
import { setUser } from '@redux/userSlice'
import apiClientAxios from '@api/apiClientAxios'
import authClientAxios from '@api/authClientAxios'
import { ItemApiResponse } from '@models/api'
import { User } from '@models/user'

const useUserInfo = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)
  const { openAlert } = useAlertContext()

  const handleConfirmClick = () => {
    setTimeout(() => {
      window.location.href = '/login'
    }, 100)
  }

  const fetchValidateToken = async () => {
    try {
      await authClientAxios.get('/tokens/info')
      return true
    } catch (error) {
      console.error('Error validating token:', error)
      localStorage.removeItem('access_token')
      openAlert({
        title: '토큰이 유효하지 않습니다. 다시 로그인 해주세요.',
        onConfirmClick: handleConfirmClick,
      })
      return false
    }
  }

  const fetchUserInfo = async () => {
    try {
      const { data } =
        await apiClientAxios.get<ItemApiResponse<User>>('/user/me')
      dispatch(setUser(data.result))
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }

  const fetchUpdateUserInfo = async (updatedUserData: Partial<User>) => {
    try {
      const { data } = await apiClientAxios.put<ItemApiResponse<User>>(
        '/user/update',
        updatedUserData,
      )
      dispatch(setUser(data.result))
      await fetchUserInfo()
    } catch (error) {
      console.error('Failed to update user data:', error)
    }
  }

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token')

    const fetchUserData = async () => {
      if (storedAccessToken) {
        const isValidToken = await fetchValidateToken()
        if (isValidToken) {
          fetchUserInfo()
        }
      }
    }

    if (!user) {
      fetchUserData()
    }
  }, [])

  return { user, fetchUserInfo, fetchUpdateUserInfo }
}

export default useUserInfo
