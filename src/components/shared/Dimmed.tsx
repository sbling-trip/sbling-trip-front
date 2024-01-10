import classNames from 'classnames/bind'
import styles from './Dimmed.module.scss'

const cx = classNames.bind(styles)

const Dimmed = ({ children }: { children: React.ReactNode }) => {
  return <div className={cx('overlay')}>{children}</div>
}

export default Dimmed
