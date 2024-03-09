import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import classNames from 'classnames/bind'
import styles from './CustomCarousel.module.scss'

const cx = classNames.bind(styles)

interface CustomCarouselProps {
  items: {
    staySeq: number
    imageUrl: string
    contents?: React.ReactNode
  }[]
  spaceBetween?: number
  className?: string
}

const CustomCarousel = ({
  items,
  spaceBetween = 30,
  className,
}: CustomCarouselProps) => {
  return (
    <div className={`${className ?? ''} ${cx('swiperWrap')}`}>
      <Swiper
        className={cx('swiper')}
        slidesPerView={4}
        spaceBetween={spaceBetween}
        breakpoints={{
          1: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        rewind={true}
        navigation={true}
        modules={[Navigation]}
      >
        {items.map((stay) => (
          <SwiperSlide key={stay.staySeq} className={cx('swiperSlide')}>
            <article>
              <Link to={`/stay/${stay.staySeq}`}>
                <img src={stay.imageUrl} alt={`${stay.staySeq}번째 이미지`} />
                <>{stay.contents}</>
              </Link>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CustomCarousel
