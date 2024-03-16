import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@redux/store'
import { setPoints } from '@redux/pointSlice'
import apiClientAxios from '@api/apiClientAxios'
import { ItemApiResponse } from '@models/api'
import { Point } from '@models/point'

const useUserPoint = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)
  const { points } = useSelector((state: RootState) => state.point)

  const fetchUserPoint = async () => {
    try {
      const { data } =
        await apiClientAxios.get<ItemApiResponse<Point>>('/point/me')
      dispatch(setPoints(data.result))
    } catch (error) {
      console.error('Failed to fetch user point:', error)
    }
  }

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token')

    const fetchUserPointData = async () => {
      if (storedAccessToken) {
        fetchUserPoint()
      }
    }

    if (user) {
      fetchUserPointData()
    }
  }, [user])

  return { points, fetchUserPoint }
}

export default useUserPoint
