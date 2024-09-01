import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useWish from '@components/stay/hooks/useWish'
import { RootState } from '@redux/store'
import { addStays, setCurrentStay, setStays } from '@redux/staySlice'
import apiClientAxios from '@api/apiClientAxios'
import { ListApiResponse, ItemApiResponse } from '@models/api'
import { Stay } from '@models/stay'

const useStayList = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [staysByType, setStaysByType] = useState<{ [key: number]: Stay[] }>({})
  const [isMoreDataAvailable, setIsMoreDataAvailable] = useState(true)

  const dispatch = useDispatch()
  const { stays, currentStay } = useSelector((state: RootState) => state.stay)
  const { toggleWishOnServer } = useWish()

  const formatLocation = (address: string) => {
    const [province, city] = address.split(' ', 2)
    const filteredProvince = province.slice(0, 2)
    return `${filteredProvince} ∙ ${city}`
  }

  const removeParentheses = (str: string) =>
    str?.replace(/\((.*?)\)/g, '').trim()

  const formatStays = (data: Stay[]) =>
    data.map((stay) => ({
      ...stay,
      stayName: removeParentheses(stay.stayName),
      originalAddress: stay.address,
      formattedAddress: formatLocation(stay.address),
    }))

  const fetchStayList = async () => {
    if (!isMoreDataAvailable) return // 더 이상 불러올 데이터가 없으면 함수를 종료
    try {
      const { data } = await apiClientAxios.get<ListApiResponse<Stay>>(
        `/stay/list?cursor=${currentPage}`,
      )

      if (data.result.length === 0) {
        setIsMoreDataAvailable(false) // 더 이상 불러올 데이터가 없는 경우
      } else if (currentPage === 0) {
        dispatch(setStays(formatStays(data.result)))
      } else {
        dispatch(addStays(formatStays(data.result)))
      }
    } catch (error) {
      console.error('Error fetching stay list:', error)
    }
  }

  const fetchStayListByType = async (type: number) => {
    try {
      const { data } = await apiClientAxios.get<ListApiResponse<Stay>>(
        `/stay/list/recommend/review-rank?stayType=${type}`,
      )
      setStaysByType((prevStays) => ({
        ...prevStays,
        [type]: formatStays(data.result),
      }))
    } catch (error) {
      console.error('Error fetching stay list by type:', error)
    }
  }

  const fetchCurrentStay = async (staySeq: number) => {
    try {
      const { data } = await apiClientAxios.get<ItemApiResponse<Stay>>(
        `/stay/info?staySeq=${staySeq}`,
      )
      dispatch(setCurrentStay(data.result))
    } catch (error) {
      console.error('Error fetching stay:', error)
    }
  }

  const fetchLoadMore = async () => {
    if (!isMoreDataAvailable) return // 더 이상 불러올 데이터가 없으면 함수 종료
    try {
      const nextPage = currentPage + 1
      const { data } = await apiClientAxios.get<ListApiResponse<Stay>>(
        `/stay/list?cursor=${nextPage}`,
      )

      if (data.result.length === 0) {
        setIsMoreDataAvailable(false) // 더 이상 불러올 데이터가 없는 경우
      } else {
        dispatch(addStays(formatStays(data.result)))
        setCurrentPage(nextPage)
      }
    } catch (error) {
      console.error('Error fetching more stays:', error)
    }
  }

  const handleToggleWish = async (staySeq: number, wishState: boolean) => {
    const success = await toggleWishOnServer(staySeq, wishState)
    if (success) {
      await Promise.all([fetchCurrentStay(staySeq), fetchStayList()])
    }
  }

  const handleStayTypeChange = async (type: number) => {
    if (!staysByType[type]) {
      await fetchStayListByType(type)
    }
  }

  useEffect(() => {
    fetchStayList()
  }, [])

  return {
    stays,
    currentStay,
    staysByType,
    fetchCurrentStay,
    fetchLoadMore,
    handleToggleWish,
    handleStayTypeChange,
  }
}

export default useStayList
