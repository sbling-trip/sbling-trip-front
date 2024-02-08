import { useRef } from 'react'
import useStayList from '@components/stayList/hooks/useStayList'
import StayItem from '@components/stayList/StayItem'
import Title from '@components/shared/Title'
import ObserverPlaceholder from '@components/shared/ObserverPlaceholder'

import classNames from 'classnames/bind'
import styles from './StayList.module.scss'

const cx = classNames.bind(styles)

const StayList = () => {
  const { stays, loadMore } = useStayList()
  const observerRef = useRef<HTMLLIElement | null>(null)

  if (!stays) {
    return <div>Loading</div>
  }

  return (
    <div className={cx('stayListContainer')}>
      <Title
        title="실시간 베스트"
        subTitle=""
        className={cx('stayListTitle')}
      />
      <ul className={cx('stayItemWrap')}>
        {stays.map((stay, index) => [
          <StayItem stay={stay} key={stay.staySeq} />,
          index === stays.length - 1 && (
            <ObserverPlaceholder
              observerRef={observerRef}
              onLoadMore={loadMore}
              key={`observer-${index}`}
            />
          ),
        ])}
      </ul>
    </div>
  )
}

export default StayList
