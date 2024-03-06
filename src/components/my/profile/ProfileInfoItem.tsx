import classNames from 'classnames/bind'
import styles from './Profile.module.scss'

const cx = classNames.bind(styles)

interface ProfileInfoItemProps {
  title: string
  content: string | JSX.Element
  className?: string
  as?: 'div' | 'span'
}

const ProfileInfoItem = ({
  title,
  content,
  className,
  as: Element = 'span',
}: ProfileInfoItemProps) => {
  return (
    <div className={cx('infoItem')}>
      <div className={cx('title')}>
        <h4
          className={
            title === '닉네임' || title === '약관 동의' ? cx('edit') : ''
          }
        >
          {title}
        </h4>
      </div>
      <div className={cx('infoContents')}>
        <Element className={className}>{content}</Element>
      </div>
    </div>
  )
}

export default ProfileInfoItem
