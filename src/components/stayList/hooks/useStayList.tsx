import { useEffect, useState } from 'react'
import axiosInstance from '@api/axios'
import { Stay } from '@models/stay'
import { ApiResponse } from '@models/api'

const useStayList = () => {
  const [stays, setStays] = useState<Stay[]>([])

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
      setStays((prevStays) => [...prevStays, ...formatStays(data.result)])
    } catch (error) {
      console.error('Error fetching stays:', error)
    }
  }

  useEffect(() => {
    fetchStays(0)
  }, [])

  return { stays }
}

export default useStayList
