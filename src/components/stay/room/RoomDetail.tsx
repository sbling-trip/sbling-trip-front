import Dimmed from '@components/shared/Dimmed'
import Title from '@components/shared/Title'
import delimiter from '@utils/delimiter'
import { Room } from '@models/room'

import IconClose from '/public/assets/icon/icon-close.svg?react'
import classNames from 'classnames/bind'
import styles from './RoomDetail.module.scss'

const cx = classNames.bind(styles)

interface RoomDetailProps {
  room: Room
  checkInTime: string
  checkOutTime: string
  refundPolicy: string
  onClose: () => void
}

const RoomDetail = ({
  room,
  checkInTime,
  checkOutTime,
  refundPolicy,
  onClose,
}: RoomDetailProps) => {
  const {
    roomName,
    minPeople,
    maxPeople,
    additionalCharge,
    childAdditionalCharge,
    ottService,
    toiletOption,
    roomOption,
    specialRoomOption,
  } = room

  const roomInfoItems = [
    { title: `입실 ${checkInTime} - 퇴실 ${checkOutTime}` },
    { title: `기준 ${minPeople}명 (최대 ${maxPeople}명)` },
    { title: specialRoomOption },
    { title: roomOption },
    { title: toiletOption },
    { title: ottService },
  ]

  const renderListItem = (items: string[]) => (
    <>
      {items.map((item, index) => (
        <span key={index} className={cx('item')}>
          {item}
        </span>
      ))}
    </>
  )

  return (
    <Dimmed>
      <div className={cx('roomDetail')}>
        <div className={cx('inner')}>
          <div className={cx('top')}>
            <button type="button" className={cx('closeBtn')} onClick={onClose}>
              <IconClose width={30} height={30} />
            </button>
          </div>
          <div className={cx('main')}>
            <div className={cx('detailBody')}>
              <Title title={roomName} subTitle="" className={cx('mainTitle')} />
              <hr />
              <section className={cx('container')}>
                <div>
                  <Title
                    title=""
                    subTitle="객실 정보"
                    className={cx('subTitle')}
                  />
                  <ul>
                    {roomInfoItems.map((item, index) => (
                      <li key={index}>
                        {typeof item.title === 'string'
                          ? item.title
                          : renderListItem(item.title)}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
              <hr />
              <section className={cx('container')}>
                <div>
                  <Title
                    title=""
                    subTitle="숙소 이용 안내"
                    className={cx('subTitle')}
                  />
                  <ul>
                    <li>{`기준 인원 ${minPeople}명 초과 시, 추가 요금 발생`}</li>
                    <li>
                      성인 1인 기준 추가 요금:
                      {` ${delimiter(additionalCharge)}원`}
                    </li>
                    <li>
                      어린이 1인 기준 추가 요금:
                      {` ${delimiter(childAdditionalCharge)}원`}
                    </li>
                  </ul>
                </div>
              </section>
              <hr />
              <section className={cx('container')}>
                <div>
                  <Title
                    title=""
                    subTitle="취소 및 환불 규정"
                    className={cx('subTitle')}
                  />
                  <p>
                    {refundPolicy
                      ? refundPolicy
                      : '객실별 취소 정책이 상이하니 객실 상세정보 또는 숙소에 문의해주세요.'}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Dimmed>
  )
}

export default RoomDetail
