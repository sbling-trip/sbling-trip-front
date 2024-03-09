import { useEffect, useRef } from 'react'
import Title from '@components/shared/Title'

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
  const mapContainer = useRef(null)

  useEffect(() => {
    if (latitude === undefined || longitude === undefined) {
      return
    }

    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_APP_KEY
    }&autoload=false`
    script.async = true

    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(latitude, longitude)

        const options = {
          center: position,
          level: 5,
        }

        try {
          const map = new window.kakao.maps.Map(mapContainer.current!, options)

          const imageSrc =
            'https://cdn1.iconfinder.com/data/icons/twitter-ui-colored/48/JD-21-512.png'
          const imageSize = new window.kakao.maps.Size(80, 80)
          const imageOption = { offset: new window.kakao.maps.Point(27, 69) }

          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
          )

          const marker = new window.kakao.maps.Marker({
            position,
            image: markerImage,
          })

          marker.setMap(map)

          const mapTypeControl = new window.kakao.maps.MapTypeControl()
          map.addControl(
            mapTypeControl,
            window.kakao.maps.ControlPosition.TOPRIGHT,
          )

          const zoomControl = new window.kakao.maps.ZoomControl()
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)
          map.setZoomable(false)
        } catch (error) {
          console.error('Error creating kakao Map:', error)
        }
      })
    }

    script.onerror = (error) => {
      console.error('Error loading kakao Map script:', error)
    }
  }, [latitude, longitude])

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
