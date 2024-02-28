import ReviewItem from './ReviewItem'
import { Review } from '@models/review'

import classNames from 'classnames/bind'
import styles from './ReviewList.module.scss'

const cx = classNames.bind(styles)

interface ReviewListProps {
  reviews: Review[]
  staySeq: string
}

const ReviewList = ({ reviews, staySeq }: ReviewListProps) => {
  return (
    <div className={cx('reviewList')}>
      {reviews.map((review, index) => (
        <ReviewItem key={index} staySeq={staySeq} review={review} />
      ))}
    </div>
  )
}

export default ReviewList
