import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import MainSlide from '@components/stay/stayDetail/MainSlide'
import RoomList from '@components/stay/room/RoomList'
import StayIntro from '@components/stay/stayDetail/StayIntro'
import StayFacilities from '@components/stay/stayDetail/StayFacilities'
import StayInfo from '@components/stay/stayDetail/StayInfo'
import StayRefundPolicy from '@components/stay/stayDetail/StayRefundPolicy'

import StayMap from '@components/stay/stayDetail/StayMap'
import Review from '@components/stay/review/Review'
import DatePicker from '@components/shared/DatePicker'

import useLoadKakao from '@hooks/useLoadKakao'
import useStayList from '@components/stayList/hooks/useStayList'
import useRoomList from '@components/stay/hooks/useRoomList'
import useDatePicker from '@hooks/useDatePicker'
import { setCurrentStay } from '@redux/staySlice'

import classNames from 'classnames/bind'
import styles from './StayDetailPage.module.scss'

const cx = classNames.bind(styles)

const StayDetailPage = () => {
  useLoadKakao()

  const { staySeq } = useParams<{ staySeq: string }>()

  const dispatch = useDispatch()
  const didMountRef = useRef(false)
  const stayReviewRef = useRef<HTMLDivElement>(null)

  const { fetchCurrentStay, currentStay, toggleWish } = useStayList()
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
    return <div>Loading</div>
  }

  return (
    <main>
      <div className={cx('stayDetailContainer')}>
        <div className={cx('stayDetailInner')}>
          <MainSlide
            currentStay={currentStay}
            toggleWish={toggleWish}
            scrollToStayReview={scrollToStayReview}
          />
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
