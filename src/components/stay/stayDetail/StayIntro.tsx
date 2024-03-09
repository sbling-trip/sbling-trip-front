import { useState } from 'react'
import Title from '@components/shared/Title'

import IconArrow from '@assets/icon/icon-arrowRight.svg?react'
import classNames from 'classnames/bind'
import styles from './StayIntro.module.scss'

const cx = classNames.bind(styles)

interface StayIntroProps {
  description: string
}

const StayIntro = ({ description }: StayIntroProps) => {
  const [showAll, setShowAll] = useState<boolean>(false)

  const handleShowAllClick = () => {
    setShowAll((prev) => !prev)
  }

  return (
    <div className={cx('container')}>
      <Title title="숙소 소개" subTitle="" className={cx('stayTitle')} />
      <div className={cx('intro', { showAll: showAll })}>
        <p className={cx({ showAll: showAll })}>{description}</p>
      </div>
      <div
        role="button"
        className={cx('btnWrap', { showAll: showAll })}
        onClick={handleShowAllClick}
      >
        <button type="button" className={cx('showAllBtn')}>
          모두 보기
          <IconArrow
            width={20}
            height={20}
            fill="var(--blue500)"
            className={cx('iconArrow')}
          />
        </button>
      </div>
    </div>
  )
}

export default StayIntro
