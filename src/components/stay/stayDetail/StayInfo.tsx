import { Link } from 'react-router-dom'
import Title from '@components/shared/Title'

import classNames from 'classnames/bind'
import styles from './StayInfo.module.scss'

const cx = classNames.bind(styles)

interface StayInfoProps {
  manager: string
  checkInTime: string
  checkOutTime: string
  contactNumber: string
  homepageUrl: string
  parkingAvailable: boolean
}

const StayInfo = ({
  manager,
  checkInTime,
  checkOutTime,
  contactNumber,
  homepageUrl,
  parkingAvailable,
}: StayInfoProps) => {
  return (
    <div className={cx('container')}>
      <Title title="숙소 이용 정보" subTitle="" className={cx('stayTitle')} />
      <div className={cx('detailInfoContainer')}>
        <section className={cx('infoSection')}>
          <>
            <h3 className={cx('infoTitle')}>기본 정보</h3>
            <ul className={cx('infoList')}>
              <li>{`입실: ${checkInTime} ~ 퇴실: ${checkOutTime}`}</li>
              <li>무료 Wi-Fi</li>
              <li>전 객실 금연</li>
              <li>Bath Amenity (치약, 칫솔 유료)</li>
              <li>{parkingAvailable ? '주차 가능' : '주차 불가'}</li>
              {manager && (
                <li>
                  {manager ? `대표 ${manager}:` : ''} {contactNumber}
                </li>
              )}
              {homepageUrl && (
                <li>
                  <Link
                    to={homepageUrl}
                    target="_blank"
                    className={cx('homepageLink')}
                  >
                    {homepageUrl}
                  </Link>
                </li>
              )}
            </ul>
          </>
        </section>
      </div>
    </div>
  )
}

export default StayInfo
