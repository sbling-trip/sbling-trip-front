import { useEffect, useRef } from 'react'

interface MapLocationParams {
  latitude?: number
  longitude?: number
}

const useKakaoMap = ({ latitude, longitude }: MapLocationParams) => {
  const mapContainer = useRef<HTMLDivElement>(null)

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

  return mapContainer
}

export default useKakaoMap
