import IconArrow from '@assets/icon/icon-arrowRight.svg?react'
import classNames from 'classnames/bind'
import styles from './Pagination.module.scss'

const cx = classNames.bind(styles)

interface PaginationProps {
  currentPage: number
  totalPages: number
  prevPageDisabled: boolean
  nextPageDisabled: boolean
  prevPageReviews: () => void
  nextPageReviews: () => void
  handlePageClick: (pageNumber: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  prevPageDisabled,
  nextPageDisabled,
  prevPageReviews,
  nextPageReviews,
  handlePageClick,
}: PaginationProps) => {
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1
  const endPage = Math.min(startPage + 4, totalPages)

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  )

  return (
    <div className={cx('pagination')}>
      <button
        type="button"
        onClick={prevPageReviews}
        disabled={prevPageDisabled}
      >
        <IconArrow
          width={25}
          height={25}
          fill="var(--blue400)"
          className={cx('iconArrow', 'left')}
        />
      </button>
      <ul className={cx('pageNumbers')}>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              type="button"
              aria-label={`${pageNumber} 페이지`}
              className={pageNumber === currentPage ? cx('active') : ''}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={nextPageReviews}
        disabled={nextPageDisabled || totalPages === endPage}
      >
        <IconArrow
          width={25}
          height={25}
          fill="var(--blue400)"
          className={cx('iconArrow', 'right')}
        />
      </button>
    </div>
  )
}

export default Pagination
