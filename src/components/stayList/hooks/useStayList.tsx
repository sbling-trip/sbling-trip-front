import { useEffect, useState } from 'react'
import axiosInstance from '@api/axios'
import { Stay } from '@models/stay'

interface ApiResponse {
  result: Stay[]
}

const useStayList = () => {
  const [stays, setStays] = useState<Stay[]>([])
  const [currentPage, setCurrentPage] = useState(0)

  const formatLocation = (address: string) => {
    const [province, city] = address.split(' ').slice(0, 2)
    const filteredProvince = province.slice(0, 2)
    return `${filteredProvince} / ${city}`
  }

  const formatTime = (time: string) => time?.slice(0, 5)
  const removeParentheses = (str: string) =>
    str?.replace(/\((.*?)\)/g, '').trim()

  const formatStays = (data: Stay[]) =>
    data.map((stay) => ({
      ...stay,
      stayName: removeParentheses(stay.stayName),
      address: formatLocation(stay.address),
      checkInTime: formatTime(stay.checkInTime),
      checkOutTime: formatTime(stay.checkOutTime),
    }))

  const fetchStays = async (pageNum: number) => {
    try {
      const { data } = await axiosInstance.get<ApiResponse>(
        `/stay/list?cursor=${pageNum}`,
      )
      console.log('data.result', data.result)
      console.log('formatStays', formatStays(data.result))
      setStays((prevStays) => [...prevStays, ...formatStays(data.result)])
    } catch (error) {
      console.error('Error fetching stays:', error)
    }
  }

  useEffect(() => {
    fetchStays(currentPage)
  }, [])

  const loadMore = async () => {
    try {
      const { data } = await axiosInstance.get<ApiResponse>(
        `/stay/list?cursor=${currentPage}`,
      )
      setStays((prevStays) => [...prevStays, ...formatStays(data.result)])
      setCurrentPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.error('Error fetching more stays:', error)
    }
  }

  console.log('currentPage', currentPage)

  return { stays, loadMore }
}

export default useStayList
