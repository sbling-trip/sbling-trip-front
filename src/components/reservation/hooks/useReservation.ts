import { useDispatch } from 'react-redux'
import apiClientAxios from '@api/apiClientAxios'
import { ListApiResponse } from '@models/api'
import { Reservation } from '@models/reservation'
import { setReservations } from '@redux/reservationSlice'

const useReservation = () => {
  const dispatch = useDispatch()

  const fetchReservationList = async () => {
    try {
      const { data } =
        await apiClientAxios.get<ListApiResponse<Reservation>>(
          `/reservation/list`,
        )
      dispatch(setReservations(data.result))
    } catch (error) {
      console.error('Error fetching rooms:', error)
    }
  }

  return { fetchReservationList }
}

export default useReservation
