import SelectionMenu from '../SelectionMenu'
import CountSelector from './CountSelector'
import { formatGuestCounts } from '@utils/formatGuestCounts'

import classNames from 'classnames/bind'
import styles from '../SearchBar.module.scss'

const cx = classNames.bind(styles)

interface GuestSelectorProps {
  isOpen: boolean
  adultCount: number
  childCount: number
  guestDropdownRef: React.RefObject<HTMLDivElement>
  onToggle: () => void
}

const GuestSelector = ({
  isOpen,
  adultCount,
  childCount,
  guestDropdownRef,

  onToggle,
}: GuestSelectorProps) => {
  return (
    <SelectionMenu
      label="인원"
      isOpen={isOpen}
      showCloseIcon={false}
      selectedResult={formatGuestCounts(adultCount, childCount)}
      onToggle={onToggle}
      ref={guestDropdownRef}
    >
      <div
        className={cx('dropdown', 'guest')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx('dropdownInner')}>
          <CountSelector
            title="성인"
            description="13세 이상"
            minCount={2}
            initialCount={adultCount}
            isAdult={true}
          />
          <CountSelector
            title="어린이"
            description="2세~12세"
            initialCount={childCount}
          />
        </div>
      </div>
    </SelectionMenu>
  )
}

export default GuestSelector
