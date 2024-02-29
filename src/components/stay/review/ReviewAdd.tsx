import { useState } from 'react'

import IconStar from '@assets/icon/icon-star.svg?react'
import classNames from 'classnames/bind'
import styles from './ReviewAdd.module.scss'

const cx = classNames.bind(styles)

const ReviewAdd = () => {
  const [selectedStars, setSelectedStars] = useState<number>(-1)
  const [reviewTitle, setReviewTitle] = useState<string>('')
  const [reviewContent, setReviewContent] = useState<string>('')

  const handleSubmitReview = async () => {
    if (selectedStars === -1) {
      alert('⭐️ 별점을 선택해주세요.⭐️')
      return
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewTitle(e.target.value)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(e.target.value)
  }

  const handleStarClick = (index: number) => {
    setSelectedStars(index)
  }

  return (
    <div className={cx('reviewAddContainer')}>
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
                  width={30}
                  height={30}
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
              value={reviewTitle}
              maxLength={50}
              placeholder="제목을 입력해주세요."
              onChange={handleTitleChange}
              className={cx('reviewInput')}
            />
            <textarea
              value={reviewContent}
              maxLength={200}
              placeholder="리뷰를 작성해주세요."
              onChange={handleContentChange}
            />
            <span className={cx('reviewCount')}>
              {reviewContent.length} / 200
            </span>
          </div>
          <button
            type="submit"
            className={cx('submitBtn')}
            onClick={handleSubmitReview}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewAdd
