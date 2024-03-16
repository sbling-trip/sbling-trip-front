import { useEffect, useState } from 'react'
import apiClientAxios from '@api/apiClientAxios'
import { Room } from '@models/room'
import { ListApiResponse } from '@models/api'

const useRoomList = (staySeq: string) => {
  const [rooms, setRooms] = useState<Room[] | null>(null)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await apiClientAxios.get<ListApiResponse<Room>>(
          `/room/info?staySeq=${staySeq}`,
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
