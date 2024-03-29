import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import ReservationItem from './ReservationItem'
import Title from '@components/shared/Title'
import useReservation from '@components/reservation/hooks/useReservation'
import { RootState } from '@redux/store'

import classNames from 'classnames/bind'
import styles from './ReservationList.module.scss'

const cx = classNames.bind(styles)

const ReservationList = () => {
  const { fetchReservationList } = useReservation()
  const { reservations } = useSelector((state: RootState) => state.reservation)

  useEffect(() => {
    fetchReservationList()
  }, [])

  return (
    <div className={cx('reservationList')}>
      <Title title="예약 내역" subTitle="" className={cx('reservationTitle')} />
      {reservations.length === 0 ? (
        <p className={cx('noReservationsMsg')}>예약 내역이 없습니다.</p>
      ) : (
        <ul className={cx('reservations')}>
          {reservations.map((reservation) => (
            <ReservationItem
              key={reservation.staySeq}
              reservation={reservation}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ReservationList
