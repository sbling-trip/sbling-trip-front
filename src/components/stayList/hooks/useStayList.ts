import { useEffect, useState } from 'react'
import axiosInstance from '@api/axios'
import { Stay } from '@models/stay'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { addStays, setCurrentStay, setStays } from '@redux/staySlice'
import { ApiResponse } from '@models/api'

const useStayList = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [showMoreButton, setShowMoreButton] = useState(true)

  const dispatch = useDispatch()
  const { stays } = useSelector((state: RootState) => state.stay)

  const formatLocation = (address: string) => {
    const [province, city] = address.split(' ', 2)
    const filteredProvince = province.slice(0, 2)
    return `${filteredProvince} / ${city}`
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

  const fetchStays = async (pageNum: number) => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<Stay>>(
        `api/stay/list?cursor=${pageNum}`,
      )

      if (pageNum === 0) {
        dispatch(setStays(formatStays(data.result)))
      } else {
        dispatch(addStays(formatStays(data.result)))
      }

      setShowMoreButton(data.result.length > 0)
    } catch (error) {
      console.error('Error fetching stays:', error)
    }
  }

  const getStayBySeq = (staySeq: number) =>
    stays.find((stay) => stay.staySeq === staySeq)

  const fetchStayDetail = async (staySeq: number) => {
    const existingStay = getStayBySeq(staySeq)

    if (existingStay) {
      dispatch(setCurrentStay(existingStay))
    }
  }

  useEffect(() => {
    fetchStays(currentPage)
  }, [])

  const loadMore = async () => {
    try {
      const nextPage = currentPage + 1
      const { data } = await axiosInstance.get<ApiResponse<Stay>>(
        `/stay/list?cursor=${nextPage}`,
      )

      dispatch(addStays(formatStays(data.result)))
      setCurrentPage(nextPage)
      setShowMoreButton(data.result.length > 0)
    } catch (error) {
      console.error('Error fetching more stays:', error)
    }
  }

  return {
    stays,
    loadMore,
    showMoreButton,
    fetchStayDetail,
  }
}

export default useStayList
