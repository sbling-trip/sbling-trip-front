import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import RoomDetail from './RoomDetail'
import Title from '@components/shared/Title'
import ListRow from '@components/shared/ListRow'
import Carousel from '@components/shared/Carousel'

import useAuth from '@auth/useAuth'
import { useAlertContext } from '@hooks/useAlertContext'
import delimiter from '@utils/delimiter'
import { Room } from '@models/room'
import { setSelectedRoom } from '@redux/roomSlice'
import { Stay } from '@models/stay'

import IconArrow from '/public/assets/icon/icon-arrowRight.svg?react'
import classNames from 'classnames/bind'
import styles from './RoomItem.module.scss'

const cx = classNames.bind(styles)

interface RoomItemProps {
  room: Room
  stay: Stay
}

const RoomItem = ({ room, stay }: RoomItemProps) => {
  const [showRoomDetailModal, setShowRoomDetailModal] = useState<boolean>(false)
  const {
    roomAvailableCount,
    roomSeq,
    roomName,
    roomPrice,
    roomImageUrlList,
    minPeople,
    maxPeople,
  } = room
  const { user } = useAuth()
  const { openAlert } = useAlertContext()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const soldOut = roomAvailableCount === 0
  const reservationLabel = soldOut ? '매진' : '예약하기'

  const handleCloseModal = () => {
    setShowRoomDetailModal(false)
  }

  const handleReservationClick = () => {
    const searchParams = new URLSearchParams(location.search)

    if (user && searchParams.toString() !== '') {
      dispatch(setSelectedRoom(room))
      navigate('/reservation')
    } else if (!user) {
      openAlert({
        title: '로그인이 필요합니다.',
        subTitle: '로그인 페이지로 이동하시겠습니까?',
        onConfirmClick: () => {
          navigate('/login')
        },
        onCancelClick: () => {},
      })
    } else if (searchParams.toString() == '') {
      openAlert({
        title: '여행 날짜를 선택해주세요.',
        onConfirmClick: () => {},
      })
    }
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
            subTitle=""
            className={cx('mainContentTitle')}
          />
          <div className={cx('roomInfo')}>
            <ul className={cx('roomInfoLIst')}>
              <li>{`기준 ${minPeople}명 (최대 ${maxPeople}명)`}</li>
              <li>{`입실 ${stay.checkInTime} - 퇴실 ${stay.checkOutTime}`}</li>
            </ul>
          </div>
        </div>
      }
      rightContent={
        <div className={cx('rightContent')}>
          <button
            type="button"
            className={cx('roomDetailBtn')}
            onClick={() => setShowRoomDetailModal(true)}
            aria-label="상세 정보 확인 버튼"
          >
            <span>상세 정보</span>
            <IconArrow width={20} height={20} fill="var(--blue600)" />
          </button>
          {showRoomDetailModal && (
            <RoomDetail
              room={room}
              onClose={handleCloseModal}
              checkInTime={stay.checkInTime}
              checkOutTime={stay.checkOutTime}
              refundPolicy={stay.refundPolicy}
            />
          )}
          <div className={cx('flexBlock')}>
            <strong className={cx('price')}>{`${delimiter(
              roomPrice,
            )}원`}</strong>
            <button
              type="button"
              disabled={soldOut}
              className={cx('selectBtn')}
              onClick={handleReservationClick}
              aria-label="예약 버튼"
            >
              {reservationLabel}
            </button>
          </div>
        </div>
      }
    />
  )
}

export default RoomItem
