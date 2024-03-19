import Title from '@components/shared/Title'
import useKakaoMap from '../hooks/useKakaoMap'

import IconCopy from '@assets/icon/icon-copy.svg?react'
import IconMap from '@assets/icon/icon-map.svg?react'
import classNames from 'classnames/bind'
import styles from './StayMap.module.scss'

const cx = classNames.bind(styles)

interface StayMapProps {
  latitude?: number
  longitude?: number
  address?: string
}

const StayMap = ({ latitude, longitude, address }: StayMapProps) => {
  const mapContainer = useKakaoMap({ latitude, longitude })

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address!)
    alert('주소가 복사되었습니다.')
  }

  const handleViewMap = () => {
    window.open(`https://map.kakao.com/link/search/${address}`, '_blank')
  }

  return (
    <div className={cx('stayMapContainer')}>
      <Title title="숙소 정보" subTitle="" className={cx('stayMapTitle')} />
      <div className={cx('stayMapWrap')}>
        <div ref={mapContainer} className={cx('stayMapRef')}></div>
      </div>
      <div className={cx('stayMapContent')}>
        <span className={cx('address')}>{address}</span>
        <div className={cx('btnContainer')}>
          <button
            type="button"
            className={cx('btn')}
            onClick={handleCopyAddress}
          >
            <span className={cx('flexBlock')}>
              <IconCopy width={25} height={25} />
              주소 복사
            </span>
          </button>
          <button
            type="button"
            className={cx('btn', 'iconMap')}
            onClick={handleViewMap}
          >
            <span className={cx('flexBlock', 'iconGap')}>
              <IconMap width={23} height={23} />
              지도 보기
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default StayMap
