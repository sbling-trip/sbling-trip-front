import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '@auth/useAuth'

import IconMenu from '@assets/icon/icon-menu.svg?react'
import IconSearch from '@assets/icon/icon-search.svg?react'
import IconUser from '@assets/icon/icon-user.svg?react'
import classNames from 'classnames/bind'
import styles from './Navbar.module.scss'

const cx = classNames.bind(styles)

interface LogoutButtonProps {
  onClick: () => void
}

const Navbar = () => {
  const location = useLocation()
  const isLoginOrSignupPage = ['/login', '/signup'].includes(location.pathname)

  const { user, handleLogout } = useAuth()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const LoginButton = () => (
    <Link to="/login">
      <button type="button" className={cx('userLogBtn')}>
        로그인 / 회원가입
      </button>
    </Link>
  )

  const LogoutButton = ({ onClick }: LogoutButtonProps) => (
    <button type="button" onClick={onClick} className={cx('userLogBtn')}>
      로그아웃
    </button>
  )

  const renderUserButton = useCallback(() => {
    if (user) {
      return (
        <div className={cx('user')}>
          <Link to="/my">
            <IconUser width={35} height={35} fill="var(--blue400)" />
          </Link>
          <LogoutButton onClick={() => handleLogout()} />
        </div>
      )
    }

    if (!isLoginOrSignupPage) {
      return (
        <div className={cx('user')}>
          <LoginButton />
        </div>
      )
    }

    return null
  }, [handleLogout, isLoginOrSignupPage, user])

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
              <img
                src="/src/assets/logo.png"
                alt="Sbling Trip"
                className={cx('logo')}
              />
            </Link>
          </h1>
          <div className={cx('navItem')}>
            <div className={cx('search')}>
              <Link to="/search">
                <IconSearch width={30} height={30} fill="var(--blue400)" />
              </Link>
            </div>
            {renderUserButton()}
            <button type="button" className={cx('menuIconBtn')}>
              <IconMenu width={38} height={38} fill="var(--blue400)" />
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar
