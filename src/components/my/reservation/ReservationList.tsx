import Title from '@components/shared/Title'

import classNames from 'classnames/bind'
import styles from './ReservationList.module.scss'

const cx = classNames.bind(styles)

const ReservationList = () => {
  return (
    <div className={cx('reservationList')}>
      <Title title="예약 내역" subTitle="" className={cx('reservationTitle')} />
    </div>
  )
}

export default ReservationList
