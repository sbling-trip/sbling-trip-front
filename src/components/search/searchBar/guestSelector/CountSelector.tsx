import { useDispatch } from 'react-redux'
import { setGuestCounts } from '@redux/searchSlice'
import { useEffect, useState } from 'react'

import IconMinus from '@assets/icon/icon-minus.svg?react'
import IconPlus from '@assets/icon/icon-plus.svg?react'
import classNames from 'classnames/bind'
import styles from './CountSelector.module.scss'

const cx = classNames.bind(styles)

interface CountSelectorProps {
  title?: string
  description?: string
  minCount?: number
  initialCount?: number
  isAdult?: boolean
}

const CountSelector = ({
  title,
  description,
  minCount = 0,
  initialCount = 0,
  isAdult = false,
}: CountSelectorProps) => {
  const dispatch = useDispatch()
  const [count, setCount] = useState(initialCount ?? 0)

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  const handleIncrement = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    dispatch(
      setGuestCounts({
        adultCount: isAdult ? count : 2,
        childCount: !isAdult ? count : 0,
      }),
    )
  }, [dispatch, isAdult, count])

  return (
    <div className={cx('selector')}>
      <div className={cx('selectorText')}>
        <h3 className={cx('title')}>{title}</h3>
        <span className={cx('description')}>{description}</span>
      </div>
      <div className={cx('selectorButton')}>
        <button
          type="button"
          className={cx('btn')}
          onClick={handleDecrement}
          disabled={count === minCount}
        >
          <IconMinus width={24} height={20} />
        </button>
        <div className={cx('count')}>
          <span>{count}</span>
        </div>
        <button type="button" className={cx('btn')} onClick={handleIncrement}>
          <IconPlus width={24} height={20} />
        </button>
      </div>
    </div>
  )
}

export default CountSelector
