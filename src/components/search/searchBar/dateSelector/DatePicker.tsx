import { DateFormatter, DateRange, DayPicker } from 'react-day-picker'
import {
  addDays,
  addMonths,
  differenceInDays,
  format,
  isSameDay,
  parseISO,
} from 'date-fns'
import { ko } from 'date-fns/locale'

import 'react-day-picker/dist/style.css'
import IconReset from '/public/assets/icon/icon-reset.svg?react'
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

  const isDefaultDateRange =
    checkIn === format(addMonths(today, 1), DATE_FORMAT) &&
    checkOut === format(addDays(addMonths(today, 1), 1), DATE_FORMAT)

  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (dateRange == null || !dateRange.from || !dateRange.to) {
      return
    }

    const { from, to } = dateRange

    if (isSameDay(from, to)) {
      return
    }

    onChange({
      from: format(from, DATE_FORMAT),
      to: format(to, DATE_FORMAT),
      nights: differenceInDays(to, from),
    })
  }

  const selectedDate = {
    from: checkIn != null ? parseISO(checkIn) : undefined,
    to: checkOut != null ? parseISO(checkOut) : undefined,
  }

  const handleComplete = () => {
    onComplete()
    onChange({
      from: selectedDate.from
        ? format(selectedDate.from, DATE_FORMAT)
        : undefined,
      to: selectedDate.to ? format(selectedDate.to, DATE_FORMAT) : undefined,
      nights:
        selectedDate.from && selectedDate.to
          ? differenceInDays(selectedDate.to, selectedDate.from)
          : 0,
    })
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
          onClick={onReset}
          disabled={isDefaultDateRange}
          aria-label="일정 초기화 버튼"
        >
          <IconReset width={18} height={18} />
          초기화
        </button>
        <button
          type="button"
          className={cx('btn', 'complete')}
          onClick={handleComplete}
          aria-label="일정 선택 완료 버튼"
        >
          선택 완료
        </button>
      </div>
    </>
  )
}

export default DatePicker
