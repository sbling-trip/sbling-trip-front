// RoomItem.tsx
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Title from '@components/shared/Title'
import ListRow from '@components/shared/ListRow'
import Carousel from '@components/shared/Carousel'
import useStayList from '@components/stayList/hooks/useStayList'
import delimiter from '@utils/delimiter'
import { Room } from '@models/room'
import { setRoom } from '@redux/roomSlice'

import classNames from 'classnames/bind'
import styles from './RoomItem.module.scss'

const cx = classNames.bind(styles)

interface RoomItemProps {
  room: Room
}

const RoomItem = ({ room }: RoomItemProps) => {
  const { roomAvailableCount, roomSeq, roomName, roomPrice, roomImageUrlList } =
    room
  const { stays } = useStayList()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const soldOut = roomAvailableCount === 0
  const reservationLabel = soldOut ? '매진' : '예약'

  const stay = stays.find((stay) => stay.staySeq === room.staySeq)

  const handleReservationClick = () => {
    dispatch(setRoom(room))
    navigate('/reservation')
  }

  if (!stay) {
    return null
  }

  return (
    <ListRow
      key={roomSeq}
      className={cx('roomItem')}
      leftContent={
        <div className={cx('leftContent')}>
          <Carousel images={roomImageUrlList} className={cx('carousel')} />
        </div>
      }
      mainContent={
        <div className={cx('mainContent')}>
          <Title
            title={roomName}
            subTitle={`기준 2명 (최대 4명)`}
            className={cx('mainContentTitle')}
          >
            <span>입실: {stay.checkInTime}</span>
            <span>퇴실: {stay.checkOutTime}</span>
          </Title>
          <strong className={cx('price')}>{`${delimiter(roomPrice)}원`}</strong>
        </div>
      }
      rightContent={
        <div className={cx('rightContent')}>
          <button
            type="button"
            disabled={soldOut}
            className={cx('selectBtn')}
            onClick={handleReservationClick}
          >
            {reservationLabel}
          </button>
        </div>
      }
    />
  )
}

export default RoomItem