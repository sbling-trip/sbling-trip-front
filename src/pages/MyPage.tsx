import { Outlet } from 'react-router-dom'
import Sidebar from '@components/my/Sidebar'

import classNames from 'classnames/bind'
import styles from './MyPage.module.scss'

const cx = classNames.bind(styles)

const MyPage = () => {
  const isMyPage = location.pathname.startsWith('/my')

  return (
    <div className={cx('myContainer')}>
      <div className={cx('inner')}>
        {isMyPage && (
          <>
            <div className={cx('leftSide')}>
              <Sidebar />
            </div>
            <div className={cx('mainContents')}>
              <Outlet />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default MyPage
