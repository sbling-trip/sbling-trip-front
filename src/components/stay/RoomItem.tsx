import { useNavigate } from 'react-router-dom'
import Title from '@components/shared/Title'
import ListRow from '@components/shared/ListRow'
import Carousel from '@components/shared/Carousel'
import delimiter from '@utils/delimiter'
import { Room } from '@models/room'

import classNames from 'classnames/bind'
import styles from './RoomItem.module.scss'

const cx = classNames.bind(styles)

interface RoomItemProps {
  room: Room
}

const RoomItem = ({ room }: RoomItemProps) => {
  const { roomAvailableCount, roomSeq, roomName, roomPrice, roomImageUrlList } =
    room

  const soldOut = roomAvailableCount === 0
  const reservationLabel = soldOut ? '매진' : '예약'

  const navigate = useNavigate()

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
            subTitle={`기준 4명 (최대 ${roomAvailableCount}명)`}
            className={cx('mainContentTitle')}
          >
            <span>입실: 퇴실:</span>
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
            onClick={() => {
              navigate('/reservation')
            }}
          >
            {reservationLabel}
          </button>
        </div>
      }
    />
  )
}

export default RoomItem
