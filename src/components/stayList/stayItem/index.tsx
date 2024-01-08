import { Link } from 'react-router-dom'
import { Stay } from '@models/stay'

import IconStar from '@assets/icon-star.svg?react'
import styles from './StayItem.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface StayItemProps {
  stay: Stay
}

const StayItem = ({ stay }: StayItemProps) => {
  return (
    <li className={cx('stayItem')}>
      <Link to={`/stay/${stay.staySeq}`}>
        <div className={cx('stayItemInner')}>
          <div className={cx('stayItemLeft')}>
            <img
              src="https://images.unsplash.com/photo-1617596225496-1d9da33a144b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA% 3D%3D"
              alt={`${stay.stayName} 이미지`}
            />
          </div>
          <div className={cx('stayItemRight')}>
            <h2>{stay.stayName}</h2>
            <span>{stay.address}</span>
            <span>{stay.checkInTime}</span>
            <span>{stay.checkOutTime}</span>
            <IconStar width={30} height={30} fill="var(--yellow300)" />
            <div className={cx('bottomFlexRow')}>
              <strong>200000 원</strong>
              <button className={cx('reservationBtn')}>예약하기</button>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default StayItem
