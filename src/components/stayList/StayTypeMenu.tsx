import { StayType } from '@models/stay'
import classNames from 'classnames/bind'
import styles from './StayTypeMenu.module.scss'

const cx = classNames.bind(styles)

interface StayTypeMenuProps {
  activeTab: StayType
  handleTabClick: (type: StayType) => void
}

const StayTypeMenu = ({ activeTab, handleTabClick }: StayTypeMenuProps) => {
  const renderMenu = (type: StayType, label: string) => (
    <li
      role="tab"
      tabIndex={0}
      aria-selected={activeTab === type ? 'true' : 'false'}
      className={activeTab === type ? cx('active') : ''}
      onClick={() => handleTabClick(type)}
    >
      {label}
    </li>
  )

  return (
    <div className={cx('stayTypeMenu')}>
      <ul role="tablist" className={cx('tablist')}>
        {renderMenu(StayType.Hotel, '호텔')}
        {renderMenu(StayType.Motel, '모텔')}
        {renderMenu(StayType.Pension, '펜션')}
        {renderMenu(StayType.GuestHouse, '게스트하우스')}
      </ul>
    </div>
  )
}

export default StayTypeMenu
