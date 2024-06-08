import { useState } from 'react'
import useReview from '../hooks/useReview'

import IconStar from '/public/assets/icon/icon-star.svg?react'
import classNames from 'classnames/bind'
import styles from './ReviewAdd.module.scss'

const cx = classNames.bind(styles)

interface ReviewAddProps {
  roomSeq: number
  staySeq: string
}

const ReviewAdd = ({ roomSeq, staySeq }: ReviewAddProps) => {
  const [selectedStars, setSelectedStars] = useState<number>(-1)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [reviewTitle, setReviewTitle] = useState<string>('')
  const [reviewContent, setReviewContent] = useState<string>('')

  const staySeqNum = parseInt(staySeq, 10)
  const { fetchAddReview } = useReview(staySeqNum)

  const handleSubmitReview = async () => {
    if (selectedStars === -1) {
      alert('⭐️ 별점을 선택해주세요.⭐️')
      return
    }

    try {
      await fetchAddReview(
        staySeqNum,
        roomSeq,
        reviewTitle,
        reviewContent,
        selectedStars + 1,
      )
      setReviewTitle('')
      setReviewContent('')
      setSelectedStars(-1)
      setPreviewImages([])
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    if (title.length > 50) {
      alert('제목은 최대 50자까지 입력할 수 있습니다.')
    } else {
      setReviewTitle(title)
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    if (content.length > 200) {
      alert('리뷰는 최대 200자까지 입력할 수 있습니다.')
    } else {
      setReviewContent(content)
    }
  }

  const handleStarClick = (index: number) => {
    setSelectedStars(index)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.log('files', files)
    if (!files) return

    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/'),
    )

    const previewImageUrls = imageFiles.map((file) => URL.createObjectURL(file))
    setPreviewImages(previewImageUrls)
  }

  const handleImageLoadError = (index: number) => {
    setPreviewImages((prevImages) => {
      const newImages = [...prevImages]
      newImages[index] =
        'https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-6/32/no-image-64.png'
      return newImages
    })
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
              required
              placeholder="제목을 입력해주세요."
              onChange={handleTitleChange}
              className={cx('reviewInput')}
            />
            <textarea
              value={reviewContent}
              maxLength={200}
              required
              placeholder="리뷰를 작성해주세요."
              onChange={handleContentChange}
            />
            <span className={cx('reviewCount')}>
              {reviewContent.length} / 200
            </span>
          </div>
          <div className={cx('selectFile')}>
            <input
              id="fileInput"
              type="file"
              name="fileInput"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className={cx('fileInput')}
            />
            <label htmlFor="fileInput" className={cx('fileInputLabel')}>
              파일 선택
            </label>
            <button
              type="submit"
              className={cx('submitBtn')}
              onClick={handleSubmitReview}
              aria-label="등록 버튼"
            >
              등록
            </button>
          </div>
          <div className={cx('previewImages')}>
            {previewImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`미리보기 이미지 ${index + 1}`}
                className={cx('previewImage')}
                onError={() => handleImageLoadError(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewAdd
