import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import SearchSelector from '@components/search/SearchSelector'
import DatePicker from '@components/shared/DatePicker'

import IconSearch from '@assets/icon/icon-search.svg?react'
import classNames from 'classnames/bind'
import styles from './SearchPage.module.scss'

const cx = classNames.bind(styles)

const SearchPage = () => {
  const [isDateDropdownOpen, setDateDropdownOpen] = useState(false)

  const [displayedDate, setDisplayedDate] = useState('')
  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    nights: number
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setDateDropdownOpen(false)
  }

  const handleDropdownToggle = (dropdown: string) => {
    setDateDropdownOpen(dropdown === 'date' ? (prev) => !prev : false)
  }

  const handleDateResultClear = () => {
    setDisplayedDate('')
    setSelectedDate({
      startDate: undefined,
      endDate: undefined,
      nights: 0,
    })
  }

  const handleDatePickerComplete = () => {
    if (selectedDate.startDate && selectedDate.endDate) {
      const formattedStartDate = format(
        parseISO(selectedDate.startDate),
        'M월 dd일',
      )
      const formattedEndDate = format(
        parseISO(selectedDate.endDate),
        'M월 dd일',
      )
      setDisplayedDate(
        `${formattedStartDate} - ${formattedEndDate} (${selectedDate.nights}박)`,
      )
      setDateDropdownOpen(false)
    }
  }

  return (
    <main>
      <div className={cx('searchContainer')}>
        <header className={cx('header')}>
          <form onSubmit={handleFormSubmit} className={cx('form')}>
            <div className={cx('contents')}>
              <SearchSelector
                label="여행지"
                isOpen={true}
                selectedResult={''}
                onToggle={() => {}}
              ></SearchSelector>
              <div className={cx('division')}></div>
              <SearchSelector
                label="일정"
                isOpen={isDateDropdownOpen}
                selectedResult={displayedDate}
                setSelectedResult={setDisplayedDate}
                onResultClear={handleDateResultClear}
                onToggle={() => handleDropdownToggle('date')}
              >
                <div
                  className={cx('dropdown', 'date')}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={cx('dropdownInner')}>
                    <DatePicker
                      startDate={selectedDate.startDate}
                      endDate={selectedDate.endDate}
                      onChange={(dateRange) => {
                        setSelectedDate({
                          startDate: dateRange.from,
                          endDate: dateRange.to,
                          nights: dateRange.nights,
                        })
                      }}
                      onComplete={() => {
                        handleDatePickerComplete()
                      }}
                    />
                  </div>
                </div>
              </SearchSelector>
              <div className={cx('btnContainer')}>
                <button type="submit" className={cx('submitBtn')}>
                  <IconSearch
                    width={30}
                    height={30}
                    className={cx('iconSearch')}
                  />
                </button>
              </div>
            </div>
          </form>
        </header>
      </div>
    </main>
  )
}

export default SearchPage
