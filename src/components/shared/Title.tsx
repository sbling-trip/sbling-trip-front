import classNames from 'classnames/bind'
import styles from './Title.module.scss'

const cx = classNames.bind(styles)

interface TitleProps {
  title: string
  subTitle: string
  className?: string
  children?: React.ReactNode
}

const Title = ({ title, subTitle, children, className }: TitleProps) => {
  return (
    <div className={className}>
      {title && <h2 className={cx('title')}>{title}</h2>}
      {subTitle && <h3 className={cx('subTitle')}>{subTitle}</h3>}
      {children}
    </div>
  )
}

export default Title
