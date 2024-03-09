import { useEffect, useState } from 'react'
import StayList from '@components/stayList/StayList'
import StayTypeMenu from '@components/stayList/StayTypeMenu'
import StayItemContents from '@components/stayList/StayItemContents'
import Title from '@components/shared/Title'
import CustomCarousel from '@components/shared/CustomCarousel'

import useStayList from '@components/stayList/hooks/useStayList'
import { StayType } from '@models/stay'

import classNames from 'classnames/bind'
import styles from './MainPage.module.scss'

const cx = classNames.bind(styles)

const MainPage = () => {
  const {
    stays,
    staysByType,
    handleStayTypeChange,
    fetchLoadMore,
    toggleWish,
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

  if (!selectedStays || !stays) {
    return <div>Loading</div>
  }

  return (
    <main>
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
            items={selectedStays.map((stay) => ({
              imageUrl: stay.roomImageUrlList[0],
              staySeq: stay.staySeq,
              contents: <StayItemContents stay={stay} />,
            }))}
          />
        </div>
      </section>
      <StayList
        stays={stays}
        fetchLoadMore={fetchLoadMore}
        toggleWish={toggleWish}
      />
    </main>
  )
}

export default MainPage
