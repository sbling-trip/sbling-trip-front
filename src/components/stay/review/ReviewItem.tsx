import { useState } from 'react'
import { useSelector } from 'react-redux'
import ReviewEdit from './ReviewEdit'
import ListRow from '@components/shared/ListRow'
import Carousel from '@components/shared/Carousel'
import useReview from '../hooks/useReview'
import { RootState } from '@redux/store'
import { Review } from '@models/review'

import IconArrow from '/public/assets/icon/icon-arrowRight.svg?react'
import IconStar from '/public/assets/icon/icon-star.svg?react'
import classNames from 'classnames/bind'
import styles from './ReviewItem.module.scss'

const cx = classNames.bind(styles)

interface ReviewItemProps {
  review: Review
  staySeq: string
}

const ReviewItem = ({ review, staySeq }: ReviewItemProps) => {
  const {
    userSeq,
    roomName,
    reviewTitle,
    reviewContent,
    reviewScore,
    reviewImageUrlList,
    createdAt,
    modifiedAt,
  } = review
  const [showAll, setShowAll] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [isReviewUpdated, setIsReviewUpdated] = useState<boolean>(false)
  const { fetchDeleteReview, fetchEditReview } = useReview(
    parseInt(staySeq, 10),
  )

  const { user } = useSelector((state: RootState) => state.user)
  const isReviewCreatedByUser = user && user.userSeq === review.userSeq

  const handleShowAllClick = () => {
    setShowAll((prev) => !prev)
  }

  const handleDelete = async () => {
    try {
      await fetchDeleteReview(review.reviewSeq)
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  const handleEditReview = (editedReview: Review) => {
    fetchEditReview(
      editedReview.reviewSeq,
      editedReview.reviewTitle,
      editedReview.reviewContent,
      editedReview.reviewScore,
    ).then(() => {
      setShowEditModal(false)
      handleUpdateModifiedAt()
    })
  }

  const handleCloseEdit = () => {
    setShowEditModal(false)
  }

  const handleUpdateModifiedAt = () => {
    setIsReviewUpdated(true)
  }

  const integerPart = Math.floor(reviewScore)
  const emptyStars = Math.max(0, 5 - integerPart)
  const filledStars = Array.from({ length: integerPart }, (_, index) => (
    <IconStar
      key={index}
      width={18}
      height={18}
      fill="var(--yellow300)"
      className={cx('iconStar')}
    />
  ))
  const emptyStar = Array.from({ length: emptyStars }, (_, index) => (
    <IconStar
      key={integerPart + index}
      width={18}
      height={18}
      fill="var(--gray300)"
      className={cx('iconStar')}
    />
  ))

  const stars = [...filledStars, ...emptyStar]

  return (
    <ListRow
      as="div"
      className={cx('reviewItem')}
      leftContent={
        <div className={cx('commentInfo')}>
          <div className={cx('top')}>
            <div className={cx('scoreWrap')}>
              <div className={cx('starWrap')}>{stars}</div>
              <span className={cx('user')}>{userSeq}</span>
            </div>
            <div className={cx('dateWrap')}>
              <span className={cx('date')}>
                {isReviewUpdated
                  ? modifiedAt.substring(0, 10)
                  : createdAt.substring(0, 10)}
              </span>
              <span className={cx('roominfo')}>{roomName}</span>
            </div>
          </div>
          {isReviewCreatedByUser && (
            <div className={cx('bottom')}>
              <button
                type="button"
                className={cx('btn', 'edit')}
                onClick={() => setShowEditModal(true)}
              >
                수정
              </button>
              {showEditModal && (
                <ReviewEdit
                  review={review}
                  onEdit={handleEditReview}
                  onClose={handleCloseEdit}
                  onUpdateModifiedAt={handleUpdateModifiedAt}
                />
              )}
              <button
                type="button"
                className={cx('btn', 'delete')}
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      }
      mainContent={
        <div className={cx('commentWrap')}>
          <div className={cx('comment')}>
            <h4>{reviewTitle}</h4>
            <p>{reviewContent}</p>
          </div>
          {reviewContent.length > 80 && (
            <div role="button" className={cx('btnWrap', { showAll })}>
              <button
                type="button"
                className={cx('showAllBtn')}
                onClick={handleShowAllClick}
              >
                더 보기
                <IconArrow
                  width={20}
                  height={20}
                  fill="var(--blue500)"
                  className={cx('iconArrow')}
                />
              </button>
            </div>
          )}
        </div>
      }
      rightContent={
        reviewImageUrlList.length && (
          <Carousel
            images={reviewImageUrlList}
            pagination={{
              type: 'bullets',
              clickable: true,
            }}
            className={cx('carousel')}
          />
        )
      }
    ></ListRow>
  )
}

export default ReviewItem
