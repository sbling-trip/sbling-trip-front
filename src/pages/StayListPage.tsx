import Title from '@components/shared/Title'
import StayItem from '@components/stayList/StayItem'
import useStayList from '@components/stayList/hooks/useStayList'

import IconArrowRight from '@assets/icon/icon-arrowRight.svg?react'
import classNames from 'classnames/bind'
import styles from './StayListPage.module.scss'

const cx = classNames.bind(styles)

const StayListPage = () => {
  const { stays, loadMore, showMoreButton } = useStayList()

  return (
    <main>
      <div className={cx('stayListContainer')}>
        <Title
          title="실시간 베스트"
          subTitle=""
          className={cx('stayListTitle')}
        />
        <ul className={cx('stayItemWrap')}>
          {stays.length > 0 &&
            stays.map((stay) => <StayItem stay={stay} key={stay.staySeq} />)}
        </ul>
        {showMoreButton && (
          <button className={cx('showMoreBtn')} onClick={loadMore}>
            <span>더보기</span>
            <IconArrowRight width={28} height={28} fill="var(--white)" />
          </button>
        )}
      </div>
    </main>
  )
}

export default StayListPage
