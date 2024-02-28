import Title from '@components/shared/Title'

import IconStar from '@assets/icon/icon-star.svg?react'
import classNames from 'classnames/bind'
import styles from './Review.module.scss'

const cx = classNames.bind(styles)

interface ReviewProps {
  staySeq: string
  reviewScoreAverage: number
  reviewCount: number
}

const Review = ({ reviewScoreAverage, reviewCount }: ReviewProps) => {
  return (
    <div className={cx('reviewContainer')}>
      <Title title="리뷰" subTitle="" className={cx('reviewTitle')}>
        <IconStar
          width={30}
          height={30}
          fill="var(--yellow300)"
          className={cx('iconStar')}
        />
        <div className={cx('subTitle')}>
          <strong>{reviewScoreAverage}</strong>
          <span>
            <strong>{`(${reviewCount})`}</strong>
          </span>
        </div>
      </Title>
    </div>
  )
}

export default Review
