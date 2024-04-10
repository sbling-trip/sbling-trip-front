import classNames from 'classnames/bind'
import styles from './NotFoundPage.module.scss'

const cx = classNames.bind(styles)

const NotFoundPage = () => {
  return <p className={cx('notFoundMsg')}>페이지를 찾을 수 없습니다.</p>
}

export default NotFoundPage
