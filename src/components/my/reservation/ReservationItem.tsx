import ListRow from '@components/shared/ListRow'
import { Reservation } from '@models/reservation'

import classNames from 'classnames/bind'
import styles from './ReservationItem.module.scss'

const cx = classNames.bind(styles)

interface ReservationItemProps {
  reservation: Reservation
}

const ReservationItem = ({ reservation }: ReservationItemProps) => {
  const {
    stayName,
    roomName,
    checkInDate,
    checkOutDate,
    adultGuestCount,
    childGuestCount,
    reservationStatus,
    bookingDate,
    paymentStatus,
  } = reservation

  const formatDate = (dateString: string) => {
    return dateString.split('T')[0]
  }

  return (
    <li className={cx('item')}>
      <ListRow
        as="div"
        className={cx('inner')}
        mainContent={
          <div className={cx('mainContent')}>
            <h3 className={cx('stayName')}>{stayName}</h3>
            <ul>
              <li>객실: {roomName}</li>
              <li>{`체크인: ${formatDate(checkInDate)} ~ 체크아웃: ${formatDate(
                checkOutDate,
              )}`}</li>
              <li>{`성인: ${adultGuestCount}명 아동: ${childGuestCount}명`}</li>
              <li>예약일: {formatDate(bookingDate)}</li>
              <li>
                결제 상태:{' '}
                {paymentStatus === 'paid' ? '결제 완료' : '결제 대기'}
              </li>
              <li>
                예약 상태:
                {reservationStatus === 'confirmed'
                  ? '예약 완료'
                  : '예약 진행중'}
              </li>
            </ul>
          </div>
        }
      />
    </li>
  )
}

export default ReservationItem
