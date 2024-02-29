import { useState } from 'react'
import Dimmed from '@components/shared/Dimmed'
import { Review } from '@models/review'

import IconClose from '@assets/icon/icon-close.svg?react'
import IconStar from '@assets/icon/icon-star.svg?react'
import classNames from 'classnames/bind'
import styles from './ReviewEdit.module.scss'

const cx = classNames.bind(styles)

interface ReviewEditProps {
  review: Review
  onEdit: (editedReview: Review) => void
  onClose: () => void
  onUpdateModifiedAt: () => void
}

const ReviewEdit = ({
  review,
  onEdit,
  onClose,
  onUpdateModifiedAt,
}: ReviewEditProps) => {
  const [editedReview, setEditedReview] = useState({ ...review })
  const [selectedStars, setSelectedStars] = useState(review.reviewScore - 1)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedReview({ ...editedReview, reviewTitle: e.target.value })
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedReview({ ...editedReview, reviewContent: e.target.value })
  }

  const handleStarClick = (index: number) => {
    setSelectedStars(index)
    setEditedReview({ ...editedReview, reviewScore: index + 1 })
  }

  const handleSubmitReview = () => {
    onEdit(editedReview)
    onUpdateModifiedAt()
  }

  return (
    <Dimmed>
      <div className={cx('reviewEditContainer')}>
        <div className={cx('contents')}>
          <div className={cx('top')}>
            <div className={cx('starWrap')}>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={cx('selectStar')}
                  onClick={() => handleStarClick(index)}
                >
                  <IconStar
                    width={45}
                    height={45}
                    fill={`var(--${
                      selectedStars >= index ? 'yellow' : 'gray'
                    }300)`}
                  />
                </span>
              ))}
            </div>
            <div className={cx('starText')}>
              <span>별점을 선택해주세요.</span>
            </div>
          </div>
          <div className={cx('bottom')}>
            <div className={cx('editor')}>
              <input
                type="text"
                value={editedReview.reviewTitle}
                onChange={handleTitleChange}
                className={cx('reviewInput')}
              />
              <textarea
                value={editedReview.reviewContent}
                onChange={handleContentChange}
              />
            </div>
            <div className={cx('btnWrap')}>
              <button className={cx('cancelBtn')} onClick={onClose}>
                취소
              </button>
              <button
                type="submit"
                className={cx('submitBtn')}
                onClick={handleSubmitReview}
              >
                저장하기
              </button>
            </div>
          </div>
          <button type="button" className={cx('closeBtn')} onClick={onClose}>
            <IconClose width={20} height={20} />
          </button>
        </div>
      </div>
    </Dimmed>
  )
}

export default ReviewEdit
