import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { addStays, setCurrentStay, setStays } from '@redux/staySlice'
import apiClientAxios from '@api/apiClientAxios'
import { ListApiResponse, ItemApiResponse } from '@models/api'
import { Stay } from '@models/stay'

const useStayList = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [staysByType, setStaysByType] = useState<{ [key: number]: Stay[] }>({})
  const dispatch = useDispatch()
  const { stays, currentStay } = useSelector((state: RootState) => state.stay)

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
    try {
      const { data } = await apiClientAxios.get<ListApiResponse<Stay>>(
        `/stay/list?cursor=${currentPage}`,
      )

      if (currentPage === 0) {
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
    try {
      const nextPage = currentPage + 1
      const { data } = await apiClientAxios.get<ListApiResponse<Stay>>(
        `/stay/list?cursor=${nextPage}`,
      )

      dispatch(addStays(formatStays(data.result)))
      setCurrentPage(nextPage)
    } catch (error) {
      console.error('Error fetching more stays:', error)
    }
  }

  const toggleWish = async (staySeq: number, wishState: boolean) => {
    try {
      if (wishState) {
        await apiClientAxios.delete(`/wish/remove?staySeq=${staySeq}`)
      } else {
        await apiClientAxios.post(`/wish/add?staySeq=${staySeq}`)
      }
      await Promise.all([fetchCurrentStay(staySeq), fetchStayList()])
    } catch (error) {
      console.error('Failed to update wish state:', error)
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
    toggleWish,
    handleStayTypeChange,
  }
}

export default useStayList
