import styles from './IconButton.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const IconButton = ({
  label,
  iconComponent: IconComponent,
  onClick,
}: {
  label: string
  iconComponent: React.ElementType
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx('btn')}
      aria-label={`${label} 버튼`}
    >
      <IconComponent width={35} height={35} />
      <small className={cx('label')}>{label}</small>
    </button>
  )
}

export default IconButton
