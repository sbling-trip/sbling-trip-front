import { useEffect, useState } from 'react'
import StayList from '@components/stayList/StayList'
import StayTypeMenu from '@components/stayList/StayTypeMenu'
import StayItemContents from '@components/stayList/StayItemContents'
import SearchBar from '@components/search/searchBar/SearchBar'
import Title from '@components/shared/Title'
import Carousel from '@components/shared/Carousel'
import CustomCarousel from '@components/shared/CustomCarousel'

import useStayList from '@components/stayList/hooks/useStayList'
import { StayType } from '@models/stay'
import MetaData from '@metadata/MetaData'

import classNames from 'classnames/bind'
import styles from './MainPage.module.scss'

const cx = classNames.bind(styles)

const MAIN_BANNER_IMAGES = [
  '/assets/banner_1.png',
  '/assets/banner_2.png',
  '/assets/banner_3.png',
  '/assets/banner_4.png',
]

const MainPage = () => {
  const {
    stays,
    staysByType,
    handleStayTypeChange,
    fetchLoadMore,
    handleToggleWish,
  } = useStayList()
  const [activeTab, setActiveTab] = useState<StayType>(StayType.Hotel)
  const selectedStays = staysByType[activeTab]

  const handleTabClick = async (type: StayType) => {
    setActiveTab(type)
    handleStayTypeChange(type)
  }

  useEffect(() => {
    handleTabClick(activeTab)
  }, [])

  return (
    <main>
      <MetaData />
      <section className={cx('mainSearch')}>
        <SearchBar />
      </section>
      <section className={cx('mainRecommend')}>
        <div className={cx('stayRecommend')}>
          <Title
            title="인기 추천 숙소"
            subTitle=""
            className={cx('recommendTitle')}
          />
          <StayTypeMenu activeTab={activeTab} handleTabClick={handleTabClick} />
          <CustomCarousel
            className={cx('carousel')}
            items={
              selectedStays
                ? selectedStays.map((stay) => ({
                    imageUrl: stay.roomImageUrlList[0],
                    staySeq: stay.staySeq,
                    contents: <StayItemContents stay={stay} />,
                  }))
                : []
            }
          />
        </div>
      </section>
      <section className={cx('mainBanner')}>
        <div className={cx('inner')}>
          <Carousel
            images={MAIN_BANNER_IMAGES}
            navigation={false}
            autoplay={true}
            autoplayDelay={3500}
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
      </section>
      <StayList
        stays={stays}
        fetchLoadMore={fetchLoadMore}
        toggleWish={handleToggleWish}
      />
    </main>
  )
}

export default MainPage
