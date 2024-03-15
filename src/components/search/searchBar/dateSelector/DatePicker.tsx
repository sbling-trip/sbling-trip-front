import { DateFormatter, DateRange, DayPicker } from 'react-day-picker'
import { differenceInDays, format, isSameDay, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'

import IconReset from '@assets/icon/icon-reset.svg?react'
import 'react-day-picker/dist/style.css'
import classNames from 'classnames/bind'
import styles from './DatePicker.module.scss'

const cx = classNames.bind(styles)

export interface DatePickerProps {
  checkIn?: string
  checkOut?: string
  onChange: (dateRange: { from?: string; to?: string; nights: number }) => void
  onComplete: () => void
  onReset: () => void
  numberOfMonths?: number
}

const DATE_FORMAT = 'yyyy-MM-dd'

const DatePicker = ({
  checkIn,
  checkOut,
  onChange,
  onComplete,
  onReset,
  numberOfMonths = 1,
}: DatePickerProps) => {
  const today = new Date()

  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (dateRange == null) {
      return
    }

    const { from, to } = dateRange

    if (from && to && isSameDay(from, to)) {
      return
    }

    onChange({
      from: from ? format(from, DATE_FORMAT) : undefined,
      to: to ? format(to, DATE_FORMAT) : undefined,
      nights: from && to ? differenceInDays(to, from) : 0,
    })
  }

  const selectedDate = {
    from: checkIn != null ? parseISO(checkIn) : undefined,
    to: checkOut != null ? parseISO(checkOut) : undefined,
  }

  const resetDates = () => {
    onReset()
  }

  const formatCaption: DateFormatter = (date, options) => {
    const formattedDate = format(date, 'yyyy년 M월', {
      locale: options?.locale,
    })
    return formattedDate
  }

  return (
    <>
      <DayPicker
        className={cx('dayPicker')}
        mode="range"
        locale={ko}
        numberOfMonths={numberOfMonths}
        fromDate={today}
        defaultMonth={today}
        onSelect={handleDayClick}
        selected={selectedDate}
        formatters={{ formatCaption }}
        modifiersClassNames={{
          selected: cx('selected'),
          today: cx('today'),
        }}
      />
      <div className={cx('buttons')}>
        <button
          type="button"
          className={cx('btn', 'reset')}
          onClick={resetDates}
        >
          <IconReset width={18} height={18} />
          초기화
        </button>
        <button
          type="button"
          className={cx('btn', 'complete')}
          onClick={onComplete}
        >
          선택 완료
        </button>
      </div>
    </>
  )
}

export default DatePicker
