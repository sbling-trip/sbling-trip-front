import { forwardRef } from 'react'

import IconArrow from '/public/assets/icon/icon-arrowRight.svg?react'
import IconClose from '/public/assets/icon/icon-close.svg?react'
import classNames from 'classnames/bind'
import styles from './SelectionMenu.module.scss'

const cx = classNames.bind(styles)

interface SelectionMenuProps {
  label: string
  isOpen: boolean
  showCloseIcon?: boolean
  selectedResult: string
  setSelectedResult?: React.Dispatch<React.SetStateAction<string>>
  onResultClear?: () => void
  onToggle: () => void
  children?: React.ReactNode
}

const SelectionMenu = forwardRef<HTMLDivElement, SelectionMenuProps>(
  function Dropdown(
    {
      label,
      isOpen = false,
      showCloseIcon = true,
      selectedResult,
      setSelectedResult,
      onResultClear,
      onToggle,
      children,
    },
    ref,
  ) {
    const handleClearIconClick = (e: React.MouseEvent<SVGSVGElement>) => {
      e.stopPropagation()
      if (showCloseIcon && selectedResult && setSelectedResult) {
        setSelectedResult('')
      }
      if (onResultClear) {
        onResultClear()
      }
    }

    return (
      <div className={cx('container')} onClick={onToggle} ref={ref}>
        <span className={cx('selectorLabel')}>{label}</span>
        <div className={cx('flexBlock')}>
          <span className={cx('selectedResult', { base: !selectedResult })}>
            {selectedResult || `${label} 선택`}
          </span>
          {showCloseIcon && selectedResult ? (
            <IconClose
              width={16}
              height={16}
              onClick={(e) => handleClearIconClick(e)}
            />
          ) : (
            <IconArrow width={20} height={20} className={cx('iconArrow')} />
          )}
        </div>
        {isOpen && children}
      </div>
    )
  },
)

SelectionMenu.displayName = 'SelectionMenu'

export default SelectionMenu
