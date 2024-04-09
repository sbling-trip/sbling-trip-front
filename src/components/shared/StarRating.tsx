import IconStar from '/public/assets/icon/icon-star.svg?react'
import classNames from 'classnames/bind'
import styles from './StarRating.module.scss'

const cx = classNames.bind(styles)

interface StarRatingProps {
  score: number
  count: number
  className?: string
  children?: React.ReactNode
}

const StarRating = ({ score, count, className, children }: StarRatingProps) => {
  return (
    <>
      <IconStar
        width={30}
        height={30}
        fill="var(--yellow300)"
        className={cx('iconStar')}
      />
      <div className={`${className ?? ''} ${cx('starRating')}`}>
        <strong>{score}</strong>
        <span>({count})</span>
        {children}
      </div>
    </>
  )
}

export default StarRating
