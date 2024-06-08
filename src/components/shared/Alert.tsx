import Dimmed from './Dimmed'
import Title from './Title'

import styles from './Alert.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface AlertProps {
  isOpen?: boolean
  title?: React.ReactNode
  subTitle?: React.ReactNode
  confirmTxt?: string
  cancelTxt?: string
  onConfirmClick: () => void
  onCancelClick?: () => void
  className?: string
}

const Alert = ({
  isOpen,
  title,
  subTitle,
  confirmTxt = '확인',
  cancelTxt = '취소',
  onConfirmClick,
  onCancelClick,
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
          {onCancelClick && (
            <button
              onClick={onCancelClick}
              className={`${className ?? ''} ${cx('btn', 'cancel')}`}
              aria-label="취소 버튼"
            >
              {cancelTxt}
            </button>
          )}
          <button
            onClick={onConfirmClick}
            className={`${className ?? ''} ${cx('btn', 'comfirm')}`}
            aria-label="확인 버튼"
          >
            {confirmTxt}
          </button>
        </div>
      </div>
    </Dimmed>
  )
}

export default Alert
