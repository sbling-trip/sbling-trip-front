import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import classNames from 'classnames/bind'
import styles from './Carousel.module.scss'

const cx = classNames.bind(styles)

interface CarouselProps {
  images: string[]
  spaceBetween?: number
  rewind?: boolean
  mousewheel?: boolean
  navigation?: boolean
  autoplay?: boolean
  autoplayDelay?: number
  effect?: string
  fadeEffect?: {
    crossFade?: boolean
    duration?: number
  }
  pagination?: {
    type?: 'bullets' | 'fraction' | 'progressbar' | undefined
    clickable?: boolean
  }
  breakpoints?: {
    [key: number]: {
      slidesOffsetBefore?: number
      slidesPerView?: number
      spaceBetween?: number
      centeredSlides?: boolean
    }
  }
  className?: string
}

const Carousel = ({
  images,
  spaceBetween = 20,
  rewind = true,
  mousewheel = true,
  navigation = true,
  pagination = undefined,
  autoplay = false,
  autoplayDelay = 3000,
  effect = 'slide',
  fadeEffect,
  breakpoints,
  className,
}: CarouselProps) => {
  return (
    <div className={cx('swiperContainer')}>
      <Swiper
        className={`${className ?? ''} ${cx('swiper')}`}
        spaceBetween={spaceBetween}
        rewind={rewind}
        mousewheel={mousewheel}
        navigation={navigation}
        pagination={pagination}
        breakpoints={breakpoints}
        effect={effect}
        fadeEffect={fadeEffect}
        autoplay={
          autoplay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
              }
            : false
        }
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
      >
        {images.map((imgUrl, idx) => (
          <SwiperSlide key={imgUrl}>
            <img src={imgUrl} alt={`${idx + 1}번째 이미지`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carousel
