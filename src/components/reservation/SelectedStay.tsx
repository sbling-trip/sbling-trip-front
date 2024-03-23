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
  const { checkInDate, checkOutDate, adultGuestCount, childGuestCount } =
    useSelector((state: RootState) => state.search)
  const { selectedRoom } = useSelector((state: RootState) => state.room)

  const checkInTime = currentStayInfo?.checkInTime || ''
  const checkOutTime = currentStayInfo?.checkOutTime || ''
  const selectedStayImage = currentStayInfo?.roomImageUrlList[0]
  const selectedStayName = currentStayInfo?.stayName

  const formattedCheckIn = checkInDate
    ? format(parseISO(checkInDate), 'yy년 MM월 dd일 (E)', { locale: ko })
    : ''
  const formattedCheckOut = checkOutDate
    ? format(parseISO(checkOutDate), 'yy년 MM월 dd일 (E)', { locale: ko })
    : ''

  return (
    <section className={cx('sectionContainer')}>
      <Title title="숙소 정보" subTitle="" className={cx('sectionTitle')} />
      <ListRow
        as="div"
        className={cx('listRow')}
        leftContent={
          <div className={cx('leftContent')}>
            <img
              src={selectedStayImage}
              alt={`${selectedStayName} 숙소 사진`}
            />
          </div>
        }
        mainContent={
          <div className={cx('mainContentTitle')}>
            <h3>{selectedStayName}</h3>
            <div className={cx('schedule')}>
              {formattedCheckIn && formattedCheckOut && (
                <span>{`${formattedCheckIn} - ${formattedCheckOut}`}</span>
              )}
              <span>{`성인: ${adultGuestCount}, 아동: ${childGuestCount}`}</span>
              <span>{selectedRoom?.roomName}</span>
              <span>{`입실: ${checkInTime} - 퇴실: ${checkOutTime}`}</span>
            </div>
          </div>
        }
      />
    </section>
  )
}

export default SelectedStay
