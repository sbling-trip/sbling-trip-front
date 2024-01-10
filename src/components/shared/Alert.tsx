import Dimmed from './Dimmed'
import Title from './Title'

import styles from './Alert.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface AlertProps {
  isOpen?: boolean
  title?: React.ReactNode
  subTitle?: React.ReactNode
  btnTxt?: string
  onBtnClick: () => void
  className?: string
}

const Alert = ({
  isOpen,
  title,
  subTitle,
  btnTxt = '확인',
  onBtnClick,
  className,
}: AlertProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <Dimmed>
      <div className={cx('alert')}>
        {(title || subTitle) && (
          <Title
            title={title as string}
            subTitle={subTitle as string}
            className={`${className ?? ''} ${cx('alertMsg')}`}
          />
        )}
        <div className={cx('flexRowContainer')}>
          <button
            onClick={onBtnClick}
            className={`${className ?? ''} ${cx('alertBtn')}`}
          >
            {btnTxt}
          </button>
        </div>
      </div>
    </Dimmed>
  )
}

export default Alert
