import ReviewList from '@components/stay/review/ReviewList'
import Title from '@components/shared/Title'
import useReview from '../hooks/useReview'

import IconStar from '@assets/icon/icon-star.svg?react'
import classNames from 'classnames/bind'
import styles from './Review.module.scss'

const cx = classNames.bind(styles)

interface ReviewProps {
  staySeq: string
  reviewScoreAverage: number
  reviewCount: number
}

const Review = ({ staySeq, reviewScoreAverage, reviewCount }: ReviewProps) => {
  const { reviews } = useReview(parseInt(staySeq ?? ''))

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
      <ReviewList reviews={reviews} staySeq={staySeq} />
    </div>
  )
}

export default Review
