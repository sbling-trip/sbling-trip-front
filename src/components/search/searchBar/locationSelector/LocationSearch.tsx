import IconSearch from '@assets/icon/icon-search.svg?react'
import IconClose from '@assets/icon/icon-close.svg?react'
import classNames from 'classnames/bind'
import styles from './LocationSearch.module.scss'

const cx = classNames.bind(styles)

interface LocationSearchProps {
  searchTerm: string
  submittedTerm: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onInputClear: () => void
  onIconClick: (e: React.MouseEvent<SVGSVGElement>) => void
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const LocationSearch = ({
  searchTerm,
  onInputChange,
  onInputClear,
  onEnter,
}: LocationSearchProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEnter(e)
    }
  }

  return (
    <div className={cx('dropdown')} onClick={(e) => e.stopPropagation()}>
      <div className={cx('dropdownInner')}>
        <div className={cx('searchContents')}>
          <div className={cx('top')}>
            <div className={cx('searchContainer')}>
              <IconSearch width={22} height={22} />
              <input
                type="text"
                id="location"
                placeholder="여행지를 검색해주세요."
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => {
                  onInputChange(e)
                }}
                onKeyDown={handleKeyDown}
              />
              <IconClose width={20} height={20} onClick={onInputClear} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationSearch
