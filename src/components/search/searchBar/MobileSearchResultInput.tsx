import { formatGuestCounts } from '@utils/formatGuestCounts'

import IconSearch from '/public/assets/icon/icon-search.svg?react'
import IconArrow from '/public/assets/icon/icon-arrowRight.svg?react'
import classNames from 'classnames/bind'
import styles from './MobileSearchResultInput.module.scss'

const cx = classNames.bind(styles)

interface MobileSearchResultInputProps {
  onClick: () => void
  displayedDate: string
  adultCount: number
  childCount: number
}

const MobileSearchResultInput = ({
  onClick,
  displayedDate,
  adultCount,
  childCount,
}: MobileSearchResultInputProps) => {
  return (
    <div className={cx('mobileSearchResult')} onClick={onClick}>
      <div className={cx('container')}>
        <div className={cx('inner')}>
          <div className={cx('searchIconWrap')}>
            <IconSearch width={30} height={30} fill="var(--blue400)" />
          </div>
          <div className={cx('searchResultText')}>
            <strong>숙소 찾기</strong>
            <span>
              {displayedDate
                ? `${displayedDate} · ${formatGuestCounts(
                    adultCount,
                    childCount,
                  )}`
                : `${formatGuestCounts(adultCount, childCount)}`}
            </span>
          </div>
          <button type="button" className={cx('arrowBtn')}>
            <IconArrow
              width={25}
              height={25}
              fill="var(--blue400)"
              className={cx('iconArrow')}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileSearchResultInput
