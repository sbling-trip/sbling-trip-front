import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SwiperClass } from 'swiper/react'

import SocialButton from '@components/stay/SocialButton'
import StayMap from '@components/stay/StayMap'
import RoomList from '@components/stay/room/RoomList'
import Title from '@components/shared/Title'
import Carousel from '@components/shared/Carousel'
import DatePicker from '@components/shared/DatePicker'
import Review from '@components/stay/review/Review'

import useLoadKakao from '@hooks/useLoadKakao'
import useStayList from '@components/stayList/hooks/useStayList'
import useDatePicker from '@hooks/useDatePicker'
import { setCurrentStay } from '@redux/staySlice'

import IconArrow from '@assets/icon/icon-arrowRight.svg?react'
import classNames from 'classnames/bind'
import styles from './StayDetailPage.module.scss'

const cx = classNames.bind(styles)

const StayDetailPage = () => {
  useLoadKakao()
  const [showAll, setShowAll] = useState<boolean>(false)
  const [activeSlide, setActiveSlide] = useState<number>(0)

  const { staySeq } = useParams<{ staySeq: string }>()
  const didMountRef = useRef(false)

  const { fetchCurrentStay, currentStay, toggleWish } = useStayList()

  const dispatch = useDispatch()

  const {
    stayName,
    latitude,
    longitude,
    address,
    description,
    wishState,
    refundPolicy,
    facilitiesDetail,
    foodBeverageArea,
    reviewCount,
    reviewScoreAverage,
    roomImageUrlList,
  } = currentStay!

  const kakaoMainImgUrl = roomImageUrlList.length > 0 ? roomImageUrlList[0] : ''

  const {
    displayedDate,
    selectedDate,
    setSelectedDate,
    toggleDateDropdown,
    handleDatePickerComplete,
    handleReset,
    isDateDropdownOpen,
    dateDropdownRef,
  } = useDatePicker()

  const handleShowAllClick = () => {
    setShowAll((prev) => !prev)
  }

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.realIndex)
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
    return <div>Loading</div>
  }

  return (
    <main>
      <div className={cx('stayDetailContainer')}>
        <div className={cx('stayDetailInner')}>
          <section className={cx('mainSlide')}>
            <Carousel
              className={cx('carousel')}
              images={roomImageUrlList}
              onSlideChange={handleSlideChange}
            />
            <div className={cx('slideInfo')}>
              <Title
                title={stayName}
                subTitle={address}
                className={cx('slideTitle')}
              />
              <div className={cx('slideSocial')}>
                <div className={cx('socialButtons')}>
                  <SocialButton
                    staySeq={staySeq!}
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
          <div className={cx('mainContents')}>
            <section className={cx('info')}>
              <div className={cx('infoBody')}>
                <RoomList staySeq={staySeq!} />
                <hr />
                <div className={cx('container')}>
                  <Title
                    title="숙소 소개"
                    subTitle=""
                    className={cx('stayTitle')}
                  />
                  <div className={cx('intro', { showAll: showAll })}>
                    <p className={cx({ showAll: showAll })}>{description}</p>
                  </div>
                  <div
                    role="button"
                    className={cx('btnWrap', { showAll: showAll })}
                  >
                    <button
                      type="button"
                      className={cx('showAllBtn')}
                      onClick={handleShowAllClick}
                    >
                      모두 보기
                      <IconArrow
                        width={20}
                        height={20}
                        fill="var(--blue500)"
                        className={cx('iconArrow')}
                      />
                    </button>
                  </div>
                </div>
                <hr />
                <div className={cx('container')}>
                  <Title
                    title="숙소 시설 및 서비스"
                    subTitle=""
                    className={cx('stayTitle')}
                  />
                  <section className={cx('infoSection')}>
                    <ul className={cx('infoList')}>
                      {facilitiesDetail && <li>{facilitiesDetail}</li>}
                      {foodBeverageArea && <li>{foodBeverageArea}</li>}
                    </ul>
                  </section>
                </div>
                <hr />
                <div className={cx('container')}>
                  <Title
                    title="숙소 이용 정보"
                    subTitle=""
                    className={cx('stayTitle')}
                  />
                </div>
                <hr />
                <div className={cx('container')}>
                  <Title
                    title="취소 및 환불 규정"
                    subTitle=""
                    className={cx('stayTitle')}
                  />
                  <ul className={cx('infoList')}>
                    <li>
                      {refundPolicy
                        ? refundPolicy
                        : '객실별 취소 정책이 상이하니 객실 상세정보에서 확인해주세요.'}
                    </li>
                  </ul>
                </div>
                <hr />
              </div>
              <aside className={cx('aside')} ref={dateDropdownRef}>
                <div className={cx('sidebar')}>
                  <button
                    type="button"
                    className={cx('dateBtn')}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleDateDropdown()
                    }}
                  >
                    {(displayedDate && `${displayedDate}`) || '날짜 선택'}
                  </button>
                </div>
                <div className={cx('dropdownContainer')}>
                  {isDateDropdownOpen && (
                    <div
                      className={cx('dropdown')}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className={cx('dropdownInner')}>
                        <DatePicker
                          checkIn={selectedDate.checkIn}
                          checkOut={selectedDate.checkOut}
                          onChange={(dateRange) => {
                            setSelectedDate({
                              checkIn: dateRange.from,
                              checkOut: dateRange.to,
                              nights: dateRange.nights,
                            })
                          }}
                          onComplete={() => {
                            handleDatePickerComplete()
                          }}
                          onReset={handleReset}
                        />
                      </div>
                    </div>
                  )}
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
            <section className={cx('stayReview')}>
              <Review
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
