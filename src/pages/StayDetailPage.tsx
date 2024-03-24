import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import MainSlide from '@components/stay/stayDetail/MainSlide'
import RoomList from '@components/stay/room/RoomList'
import StayIntro from '@components/stay/stayDetail/StayIntro'
import StayFacilities from '@components/stay/stayDetail/StayFacilities'
import StayInfo from '@components/stay/stayDetail/StayInfo'
import StayRefundPolicy from '@components/stay/stayDetail/StayRefundPolicy'
import SearchBar from '@components/search/searchBar/SearchBar'
import StayMap from '@components/stay/stayDetail/StayMap'
import Review from '@components/stay/review/Review'
import Carousel from '@components/shared/Carousel'

import useLoadKakao from '@hooks/useLoadKakao'
import useStayList from '@components/stayList/hooks/useStayList'
import useRoomList from '@components/stay/hooks/useRoomList'
import { setCurrentStay } from '@redux/staySlice'

import banner1 from '@assets/banner_4.png'
import banner2 from '@assets/banner_1_small.png'
import classNames from 'classnames/bind'
import styles from './StayDetailPage.module.scss'

const cx = classNames.bind(styles)

const BANNER_IMAGES = [banner1, banner2]

const StayDetailPage = () => {
  useLoadKakao()

  const { staySeq } = useParams<{ staySeq: string }>()

  const dispatch = useDispatch()
  const didMountRef = useRef(false)
  const stayReviewRef = useRef<HTMLDivElement>(null)

  const { fetchCurrentStay, currentStay, handleToggleWish } = useStayList()
  const { rooms } = useRoomList(staySeq || '')
  const roomSeq = rooms && rooms.length > 0 ? rooms[0].roomSeq : undefined

  const {
    checkInTime,
    checkOutTime,
    latitude,
    longitude,
    address,
    description,
    refundPolicy,
    facilitiesDetail,
    foodBeverageArea,
    manager,
    contactNumber,
    homepageUrl,
    parkingAvailable,
    reviewCount,
    reviewScoreAverage,
  } = currentStay! || {}

  const scrollToStayReview = () => {
    if (stayReviewRef.current) {
      stayReviewRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const staySeqNumber = parseInt(staySeq ?? '', 10)

    if (!isNaN(staySeqNumber)) {
      fetchCurrentStay(staySeqNumber)
    } else {
      console.error('Invalid staySeq:', staySeq)
    }
  }, [staySeq])

  useEffect(() => {
    if (!didMountRef.current) {
      dispatch(setCurrentStay(currentStay))
      didMountRef.current = true
    }
  }, [currentStay, dispatch])

  if (!currentStay) {
    return <p>해당 숙소가 없습니다.</p>
  }

  return (
    <main>
      <div className={cx('stayDetailContainer')}>
        <div className={cx('stayDetailInner')}>
          <MainSlide
            currentStay={currentStay!}
            toggleWish={handleToggleWish}
            scrollToStayReview={scrollToStayReview}
          />
          <SearchBar />
          <div className={cx('mainContents')}>
            <section className={cx('info')}>
              <div className={cx('infoBody')}>
                <RoomList staySeq={staySeq!} />
                <hr />
                <StayIntro description={description} />
                <hr />
                <StayFacilities
                  facilitiesDetail={facilitiesDetail}
                  foodBeverageArea={foodBeverageArea}
                />
                <hr />
                <StayInfo
                  manager={manager}
                  checkInTime={checkInTime}
                  checkOutTime={checkOutTime}
                  contactNumber={contactNumber}
                  homepageUrl={homepageUrl}
                  parkingAvailable={parkingAvailable}
                />
                <hr />
                <StayRefundPolicy refundPolicy={refundPolicy} />
                <hr />
              </div>
              <aside className={cx('aside')}>
                <div className={cx('bannerWrap')}>
                  <Carousel
                    images={BANNER_IMAGES}
                    navigation={false}
                    autoplay={true}
                    autoplayDelay={3000}
                    effect="fade"
                    fadeEffect={{
                      crossFade: true,
                      duration: 800,
                    }}
                    pagination={{
                      type: 'bullets',
                      clickable: true,
                    }}
                    className={cx('carousel')}
                  />
                </div>
              </aside>
            </section>
            <section className={cx('stayMap')}>
              <StayMap
                latitude={latitude}
                longitude={longitude}
                address={address}
              />
            </section>
            <section className={cx('stayReview')} ref={stayReviewRef}>
              <Review
                roomSeq={roomSeq!}
                staySeq={staySeq!}
                reviewScoreAverage={reviewScoreAverage}
                reviewCount={reviewCount}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default StayDetailPage
