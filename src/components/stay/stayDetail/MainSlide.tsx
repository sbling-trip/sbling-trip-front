import { useState } from 'react'
import { SwiperClass } from 'swiper/react'

import Carousel from '@components/shared/Carousel'
import Title from '@components/shared/Title'
import StarRating from '@components/shared/StarRating'
import SocialButton from '@components/stay/stayDetail/SocialButton'
import { Stay } from '@models/stay'

import IconArrow from '@assets/icon/icon-arrowRight.svg?react'
import classNames from 'classnames/bind'
import styles from './MainSlide.module.scss'

const cx = classNames.bind(styles)

interface MainSlideProps {
  currentStay: Stay
  toggleWish: (staySeq: number, wishState: boolean) => Promise<void>
  scrollToStayReview: () => void
}

const MainSlide = ({
  currentStay,
  toggleWish,
  scrollToStayReview,
}: MainSlideProps) => {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.realIndex)
  }

  const {
    staySeq,
    stayName,
    address,
    wishState,
    description,
    reviewScoreAverage,
    reviewCount,
    roomImageUrlList,
  } = currentStay
  const kakaoMainImgUrl =
    roomImageUrlList?.length > 0 ? roomImageUrlList[0] : ''

  return (
    <section className={cx('mainSlide')}>
      <Carousel
        className={cx('carousel')}
        images={roomImageUrlList}
        onSlideChange={handleSlideChange}
      />
      <div className={cx('slideInfo')}>
        <Title title={stayName} subTitle={address} className={cx('slideTitle')}>
          <div className={cx('starRatingWrap')}>
            <StarRating
              score={reviewScoreAverage}
              count={reviewCount}
              className={cx('starRating')}
            >
              <button
                type="button"
                className={cx('goToReviewBtn')}
                onClick={scrollToStayReview}
              >
                <span>리뷰보기</span>
                <IconArrow
                  width={20}
                  height={20}
                  fill="var(--blue500)"
                  className={cx('iconArrow')}
                />
              </button>
            </StarRating>
          </div>
        </Title>
        <div className={cx('slideSocial')}>
          <div className={cx('socialButtons')}>
            <SocialButton
              staySeq={staySeq.toString()}
              stayName={stayName}
              mainImgUrl={kakaoMainImgUrl}
              description={description}
              wishState={!!wishState}
              toggleWish={toggleWish}
            />
          </div>
        </div>
      </div>
      <div className={cx('pagination')}>
        {activeSlide + 1} / {roomImageUrlList.length}
      </div>
    </section>
  )
}

export default MainSlide
