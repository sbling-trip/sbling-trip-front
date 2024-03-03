import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ListRow from '@components/shared/ListRow'
import IconButton from '@components/shared/IconButton'
import StarRating from '@components/shared/StarRating'

import { useAlertContext } from '../../hooks/useAlertContext'
import delimiter from '@utils/delimiter'
import { RootState } from '@redux/store'
import { Stay } from '@models/stay'

import IconWish from '@assets/icon/icon-wish.svg?react'
import IconWishFill from '@assets/icon/icon-wish-fill.svg?react'
import styles from './StayItem.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface StayItemProps {
  stay: Stay
  toggleWish: (staySeq: number, wishState: boolean) => void
}

const StayItem = ({ stay, toggleWish }: StayItemProps) => {
  const { user } = useSelector((state: RootState) => state.user)
  const { openAlert } = useAlertContext()
  const navigate = useNavigate()

  const {
    staySeq,
    stayName,
    formattedAddress,
    wishState,
    roomImageUrlList,
    minimumRoomPrice,
    reviewScoreAverage,
    reviewCount,
  } = stay

  const mainImageUrl = roomImageUrlList[0]

  const handleToggleWish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!user) {
      openAlert({
        title: '로그인이 필요합니다.',
        subTitle: '로그인 페이지로 이동하시겠습니까?',
        onConfirmClick: () => navigate('/login'),
        onCancelClick: () => {},
      })
    }
    toggleWish(staySeq, !!wishState)
  }

  return (
    <li className={cx('stayItem')}>
      <Link to={`/stay/${staySeq}`}>
        <ListRow
          as="div"
          className={cx('stayItemInner')}
          mainContent={
            <div className={cx('mainContent')}>
              <img
                src={mainImageUrl}
                alt={`${stayName} 이미지`}
                className={cx('mainContentImg')}
              />
              <div className={cx('wishBtn')}>
                <IconButton
                  label={wishState ? '찜 취소' : '찜하기'}
                  iconComponent={wishState ? IconWishFill : IconWish}
                  onClick={handleToggleWish}
                />
              </div>
            </div>
          }
          rightContent={
            <div className={cx('rightContent')}>
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
              <div className={cx('stayPrice')}>
                <strong className={cx('price')}>
                  {`${delimiter(minimumRoomPrice)}원`}
                </strong>
                <span>/ 1박</span>
              </div>
            </div>
          }
        />
      </Link>
    </li>
  )
}

export default StayItem
