import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useSelector } from 'react-redux'

import Title from '@components/shared/Title'
import ListRow from '@components/shared/ListRow'
import { RootState } from '@redux/store'
import { Stay } from '@models/stay'

import classNames from 'classnames/bind'
import styles from './SelectedStay.module.scss'

const cx = classNames.bind(styles)

interface SelectedStayProps {
  currentStayInfo: Stay | undefined
}

const SelectedStay = ({ currentStayInfo }: SelectedStayProps) => {
  const { date } = useSelector((state: RootState) => state.date)
  const { room } = useSelector((state: RootState) => state.room)

  const checkInTime = currentStayInfo?.checkInTime || ''
  const checkOutTime = currentStayInfo?.checkOutTime || ''
  const mainStayImage = currentStayInfo?.roomImageUrlList[0]

  const renderSelectedDate = () => {
    if (date && date.checkIn && date.checkOut) {
      const formattedCheckIn = format(
        parseISO(date.checkIn),
        'yy년 M월 d일 (E)',
        { locale: ko },
      )
      const formattedCheckOut = format(
        parseISO(date.checkOut),
        'yy년 M월 d일 (E)',
        { locale: ko },
      )
      return (
        <span>
          {`${formattedCheckIn} ~ ${formattedCheckOut}, ${date.nights}박`}
        </span>
      )
    }
  }

  return (
    <section className={cx('sectionContainer')}>
      <Title title="숙소 정보" subTitle="" className={cx('sectionTitle')} />
      <ListRow
        as="div"
        className={cx('listRow')}
        leftContent={
          <div className={cx('leftContent')}>
            <img
              src={mainStayImage}
              alt={`${currentStayInfo?.stayName} 숙소 사진`}
            />
          </div>
        }
        mainContent={
          <div className={cx('mainContentTitle')}>
            <h3>{currentStayInfo?.stayName}</h3>
            <div className={cx('schedule')}>
              {renderSelectedDate()}
              <span>{room?.roomName}</span>
              <span>{`입실: ${checkInTime}, 퇴실: ${checkOutTime}`}</span>
            </div>
          </div>
        }
      />
    </section>
  )
}

export default SelectedStay
