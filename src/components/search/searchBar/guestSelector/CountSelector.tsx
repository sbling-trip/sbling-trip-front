import { useEffect, useState } from 'react'

import IconMinus from '@assets/icon/icon-minus.svg?react'
import IconPlus from '@assets/icon/icon-plus.svg?react'
import classNames from 'classnames/bind'
import styles from './CountSelector.module.scss'

const cx = classNames.bind(styles)

interface CountSelectorProps {
  title: string
  description: string
  initialCount?: number
  onChange: (count: number) => void
}

const CountSelector = ({
  title,
  description,
  initialCount = 0,
  onChange,
}: CountSelectorProps) => {
  const [count, setCount] = useState(initialCount)

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  const handleIncrement = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    onChange(count)
  }, [count, onChange])

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
          disabled={title === '성인' ? count === 1 : count === 0}
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
