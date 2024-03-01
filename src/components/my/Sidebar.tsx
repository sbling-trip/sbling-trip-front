import { Link, useLocation } from 'react-router-dom'

import IconArrow from '@assets/icon/icon-arrowRight.svg?react'
import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'

const cx = classNames.bind(styles)

const Sidebar = () => {
  const location = useLocation()

  const getMenuItems = () => {
    return [
      { to: '/my', label: '예약 내역' },
      { to: '/my/point', label: '포인트' },
      { to: '/my/wish', label: '찜한 숙소' },
      { to: '/my/profile', label: '프로필 관리' },
    ]
  }

  const menuItems = getMenuItems()

  return (
    <aside className={cx('sidebar')}>
      <ul>
        {menuItems.map((item: { to: string; label: string }) => (
          <li key={item.to} className={cx('menuItem')}>
            <Link to={item.to} className={cx('menuLink')}>
              <span
                className={location.pathname === item.to ? cx('selected') : ''}
              >
                {item.label}
              </span>
              <IconArrow
                width={20}
                height={20}
                fill="var(--gray400)"
                className={location.pathname === item.to ? cx('selected') : ''}
              />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
