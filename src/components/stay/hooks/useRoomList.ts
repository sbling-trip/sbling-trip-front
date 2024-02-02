import { useEffect, useState } from 'react'
import axiosInstance from '@api/axios'
import { Room } from '@models/room'
import { ApiResponse } from '@models/api'

const useRoomList = (staySeq: string) => {
  const [rooms, setRooms] = useState<Room[] | null>(null)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axiosInstance.get<ApiResponse<Room>>(
          '/room/info',
          {
            params: {
              stay_seq: staySeq,
            },
          },
        )

        setRooms(data.result)
      } catch (error) {
        console.error('Error fetching rooms:', error)
      }
    }

    fetchRooms()
  }, [staySeq])

  return { rooms }
}

export default useRoomList
