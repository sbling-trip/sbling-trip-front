import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setDates } from '@redux/searchSlice'
import SelectionMenu from '../SelectionMenu'
import DatePicker from './DatePicker'

import classNames from 'classnames/bind'
import styles from '../SearchBar.module.scss'

const cx = classNames.bind(styles)

interface DateSelectorProps {
  isOpen: boolean
  displayedDate: string
  setDisplayedDate: React.Dispatch<React.SetStateAction<string>>
  selectedDate: {
    checkInDate?: string
    checkOutDate?: string
    nights?: number
  }
  onToggle: () => void
  dateDropdownRef: React.RefObject<HTMLDivElement>
  onReset: () => void
  onComplete: () => void
}

const IS_MOBILE = window.innerWidth < 768
const NUMBER_OF_MONTHS = IS_MOBILE ? 1 : 2

const DateSelector = ({
  isOpen,
  displayedDate,
  setDisplayedDate,
  selectedDate,
  onToggle,
  dateDropdownRef,
  onReset,
  onComplete,
}: DateSelectorProps) => {
  const dispatch = useDispatch()

  const handleChangeDate = (dateRange: { from?: string; to?: string }) => {
    dispatch(
      setDates({ checkIn: dateRange.from || '', checkOut: dateRange.to || '' }),
    )

    const formattedCheckIn = format(parseISO(dateRange.from!), 'yy.MM.dd (E)', {
      locale: ko,
    })
    const formattedCheckOut = format(parseISO(dateRange.to!), 'yy.MM.dd (E)', {
      locale: ko,
    })
    setDisplayedDate(`${formattedCheckIn} ~ ${formattedCheckOut}`)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const checkInDate = searchParams.get('checkInDate') || ''
    const checkOutDate = searchParams.get('checkOutDate') || ''
    const formattedCheckIn = checkInDate
      ? format(parseISO(checkInDate), 'yy.MM.dd (E)', { locale: ko })
      : ''
    const formattedCheckOut = checkOutDate
      ? format(parseISO(checkOutDate), 'yy.MM.dd (E)', { locale: ko })
      : ''

    if (formattedCheckIn && formattedCheckOut) {
      setDisplayedDate(`${formattedCheckIn} ~ ${formattedCheckOut}`)
    } else {
      setDisplayedDate('')
    }
  }, [location])

  return (
    <SelectionMenu
      label="일정"
      isOpen={isOpen}
      selectedResult={displayedDate}
      setSelectedResult={setDisplayedDate}
      onToggle={onToggle}
      ref={dateDropdownRef}
    >
      <div
        className={cx('dropdown', 'date')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx('dropdownInner')}>
          <DatePicker
            checkIn={selectedDate.checkInDate}
            checkOut={selectedDate.checkOutDate}
            onChange={handleChangeDate}
            onComplete={onComplete}
            onReset={onReset}
            numberOfMonths={NUMBER_OF_MONTHS}
          />
        </div>
      </div>
    </SelectionMenu>
  )
}

export default DateSelector
