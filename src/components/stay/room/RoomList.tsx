import { useSelector } from 'react-redux'
import Title from '@components/shared/Title'
import RoomItem from './RoomItem'
import useRoomList from '../hooks/useRoomList'
import { RootState } from '@redux/store'
import { Stay } from '@models/stay'

import classNames from 'classnames/bind'
import styles from './RoomList.module.scss'

const cx = classNames.bind(styles)

interface RoomListProps {
  currentStay: Stay
}

const RoomList = ({ currentStay }: RoomListProps) => {
  const { rooms: initialRooms } = useRoomList(currentStay.staySeq.toString())
  const { searchResultRooms } = useSelector((state: RootState) => state.room)
  const searchParams = new URLSearchParams(location.search)
  const hasSearchParams = searchParams.toString() !== ''

  return (
    <div className={cx('container')}>
      <Title
        title="객실 선택"
        subTitle="1박 기준"
        className={cx('roomsTitle')}
      />
      <div className={cx('roomListWrap')}>
        {hasSearchParams ? (
          searchResultRooms.length > 0 ? (
            searchResultRooms.map((room) => (
              <RoomItem key={room.roomSeq} room={room} stay={currentStay} />
            ))
          ) : (
            <p>예약 가능한 객실이 없습니다.</p>
          )
        ) : (
          initialRooms.map((room) => (
            <RoomItem key={room.roomSeq} room={room} stay={currentStay} />
          ))
        )}
      </div>
    </div>
  )
}

export default RoomList
