import StarRating from '@components/shared/StarRating'
import delimiter from '@utils/delimiter'
import { Stay } from '@models/stay'

import classNames from 'classnames/bind'
import styles from './StayItemContents.module.scss'

const cx = classNames.bind(styles)

interface StayItemContentsProps {
  stay: Stay
}

const StayItemContents = ({ stay }: StayItemContentsProps) => {
  const {
    stayName,
    formattedAddress,
    reviewScoreAverage,
    reviewCount,
    minimumRoomPrice,
  } = stay

  return (
    <div className={cx('textContents')}>
      <div className={cx('top')}>
        <h3>{stayName}</h3>
        <span className={cx('address')}>{formattedAddress}</span>
        <div className={cx('starRatingWrap')}>
          <StarRating
            score={reviewScoreAverage}
            count={reviewCount}
            className={cx('starRating')}
          />
        </div>
      </div>
      <div className={cx('bottom')}>
        <strong className={cx('price')}>{`${delimiter(
          minimumRoomPrice,
        )}원`}</strong>
        <span>/ 1박</span>
      </div>
    </div>
  )
}

export default StayItemContents
