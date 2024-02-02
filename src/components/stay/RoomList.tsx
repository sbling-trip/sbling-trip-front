import Title from '@components/shared/Title'
import RoomItem from './RoomItem'
import useRoomList from './hooks/useRoomList'

import classNames from 'classnames/bind'
import styles from './RoomList.module.scss'

const cx = classNames.bind(styles)

const RoomList = ({ staySeq }: { staySeq: string }) => {
  const { rooms } = useRoomList(staySeq)

  console.log('rooms', rooms)

  return (
    <div className={cx('container')}>
      <Title
        title="객실 선택"
        subTitle="1박 기준"
        className={cx('roomsTitle')}
      />
      <div className={cx('roomListWrap')}>
        <ul className={cx('roomList')}>
          {rooms?.map((room) => <RoomItem key={room.roomSeq} room={room} />)}
        </ul>
      </div>
    </div>
  )
}

export default RoomList
