import { Link, useNavigate } from 'react-router-dom'
import { useAlertContext } from '@hooks/useAlertContext'

import IconSearch from '@assets/icon/icon-search.svg?react'
import IconUser from '@assets/icon/icon-user.svg?react'

import classNames from 'classnames/bind'
import styles from './Navbar.module.scss'

const cx = classNames.bind(styles)

const Navbar = () => {
  const navigate = useNavigate()

  const { openAlert } = useAlertContext()

  const handleLogout = () => {
    openAlert({
      title: '로그아웃 하시겠습니까?',
      onConfirmClick: () => {
        navigate('/')
      },
      onCancelClick: () => {},
    })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <header>
        <nav>
          <h1>
            <Link
              to="/"
              aria-label="Sibling Trip 홈페이지"
              role="link"
              onClick={scrollToTop}
            >
              SIBLING TRIP
            </Link>
          </h1>
          <div className={cx('navItem')}>
            <div className={cx('searchContainer')}>
              <Link to="/search">
                <IconSearch width={30} height={30} fill="var(--gray700)" />
              </Link>
            </div>
            <div className={cx('userContainer')}>
              <Link to="/my">
                <IconUser width={35} height={35} fill="var(--gray700)" />
              </Link>
              <Link to="/login">
                <button type="button" className={cx('userLogBtn')}>
                  로그인
                </button>
              </Link>
              <Link to="/signup">
                <button type="button" className={cx('userSignupBtn')}>
                  회원가입
                </button>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className={cx('userLogBtn')}
              >
                로그아웃
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar
