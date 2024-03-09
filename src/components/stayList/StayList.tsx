import { useRef } from 'react'
import StayItem from '@components/stayList/StayItem'
import Title from '@components/shared/Title'
import ObserverPlaceholder from '@components/shared/ObserverPlaceholder'
import { Stay } from '@models/stay'

import classNames from 'classnames/bind'
import styles from './StayList.module.scss'

const cx = classNames.bind(styles)

interface StayListProps {
  stays: Stay[]
  fetchLoadMore: () => void
  toggleWish: (staySeq: number, wishState: boolean) => void
}

const StayList = ({ stays, fetchLoadMore, toggleWish }: StayListProps) => {
  const observerRef = useRef<HTMLLIElement | null>(null)

  if (!stays) {
    return <div>Loading</div>
  }

  return (
    <div className={cx('stayListContainer')}>
      <Title title="전체 숙소" subTitle="" className={cx('stayListTitle')} />
      <ul className={cx('stayItemWrap')}>
        {stays.map((stay, index) => [
          <StayItem stay={stay} key={stay.staySeq} toggleWish={toggleWish} />,
          index === stays.length - 1 && (
            <ObserverPlaceholder
              observerRef={observerRef}
              onLoadMore={fetchLoadMore}
              key={`observer-${index}`}
            />
          ),
        ])}
      </ul>
    </div>
  )
}

export default StayList
