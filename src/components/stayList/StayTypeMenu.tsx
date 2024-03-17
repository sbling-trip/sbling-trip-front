import { StayType } from '@models/stay'

import classNames from 'classnames/bind'
import styles from './StayTypeMenu.module.scss'

const cx = classNames.bind(styles)

interface StayTypeMenuProps {
  activeTab: StayType
  handleTabClick: (type: StayType) => void
}

const StayTypeMenu = ({ activeTab, handleTabClick }: StayTypeMenuProps) => {
  return (
    <div className={cx('stayTypeMenu')}>
      <ul role="tablist" className={cx('tablist')}>
        <MenuItem
          type={StayType.Hotel}
          label="호텔"
          active={activeTab === StayType.Hotel}
          handleTabClick={handleTabClick}
        />
        <MenuItem
          type={StayType.Motel}
          label="모텔"
          active={activeTab === StayType.Motel}
          handleTabClick={handleTabClick}
        />
        <MenuItem
          type={StayType.Pension}
          label="펜션"
          active={activeTab === StayType.Pension}
          handleTabClick={handleTabClick}
        />
        <MenuItem
          type={StayType.GuestHouse}
          label="게스트하우스"
          active={activeTab === StayType.GuestHouse}
          handleTabClick={handleTabClick}
        />
      </ul>
    </div>
  )
}

interface MenuItemProps {
  type: StayType
  label: string
  active: boolean
  handleTabClick: (type: StayType) => void
}

const MenuItem = ({ type, label, active, handleTabClick }: MenuItemProps) => {
  return (
    <li
      role="tab"
      tabIndex={0}
      aria-selected={active ? 'true' : 'false'}
      className={active ? cx('active') : ''}
      onClick={() => handleTabClick(type)}
    >
      {label}
    </li>
  )
}

export default StayTypeMenu
