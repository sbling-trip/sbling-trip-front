import { useEffect, useRef, useState } from 'react'
import { format, parseISO } from 'date-fns'
import SearchSelector from '@components/search/SearchSelector'
import LocationSearch from '@components/search/LocationSearch'
import DatePicker from '@components/shared/DatePicker'
import CountSelector from '@components/search/CountSelector'

import IconSearch from '@assets/icon/icon-search.svg?react'
import classNames from 'classnames/bind'
import styles from './SearchPage.module.scss'

const cx = classNames.bind(styles)

const SearchPage = () => {
  const isMobile = window.innerWidth < 768
  const numberOfMonths = isMobile ? 1 : 2

  const [isLocationDropdownOpen, setLocationDropdownOpen] = useState(false)
  const [isDateDropdownOpen, setDateDropdownOpen] = useState(false)
  const [isGuestDropdownOpen, setGuestDropdownOpen] = useState(false)

  const [searchLocation, setSearchLocation] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const [adultCount, setAdultCount] = useState(1)
  const [childCount, setChildCount] = useState(0)
  const [infantCount, setInfantCount] = useState(0)

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

  const locationDropdownRef = useRef<HTMLDivElement | null>(null)
  const dateDropdownRef = useRef<HTMLDivElement | null>(null)
  const guestDropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        (isLocationDropdownOpen || isGuestDropdownOpen || isDateDropdownOpen) &&
        (!locationDropdownRef.current ||
          !locationDropdownRef.current.contains(e.target as Node)) &&
        (!dateDropdownRef.current ||
          !dateDropdownRef.current.contains(e.target as Node)) &&
        (!guestDropdownRef.current ||
          !guestDropdownRef.current.contains(e.target as Node))
      ) {
        closeDropdowns()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLocationDropdownOpen, isDateDropdownOpen, isGuestDropdownOpen])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    closeDropdowns()
  }

  const handleLocationEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    handleLocationSubmit()
  }

  const handleLocationSubmit = () => {
    setSelectedLocation(searchLocation)
    setSearchLocation('')
    setLocationDropdownOpen(false)
  }

  const handleLocationClear = () => {
    setSelectedLocation('')
  }

  const handleInputClear = () => {
    setSearchLocation('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLocation(e.target.value)
  }

  const handleDropdownToggle = (dropdown: 'location' | 'date' | 'guest') => {
    setLocationDropdownOpen(dropdown === 'location' ? (prev) => !prev : false)
    setDateDropdownOpen(dropdown === 'date' ? (prev) => !prev : false)
    setGuestDropdownOpen(dropdown === 'guest' ? (prev) => !prev : false)
  }

  const closeDropdowns = () => {
    setLocationDropdownOpen(false)
    setDateDropdownOpen(false)
    setGuestDropdownOpen(false)
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

  const formatGuestCountsString = () => {
    const parts = []

    if (adultCount > 0) {
      parts.push(`성인 ${adultCount}명`)
    }

    if (childCount > 0) {
      parts.push(`어린이 ${childCount}명`)
    }

    if (infantCount > 0) {
      parts.push(`유아 ${infantCount}명`)
    }

    return parts.join(', ')
  }

  return (
    <main>
      <div className={cx('searchContainer')}>
        <header className={cx('header')}>
          <form onSubmit={handleFormSubmit} className={cx('form')}>
            <div className={cx('contents')}>
              <SearchSelector
                label="여행지"
                isOpen={isLocationDropdownOpen}
                selectedResult={selectedLocation}
                setSelectedResult={setSelectedLocation}
                onToggle={() => handleDropdownToggle('location')}
                ref={locationDropdownRef}
              >
                {isLocationDropdownOpen && (
                  <LocationSearch
                    searchTerm={searchLocation}
                    submittedTerm={selectedLocation}
                    onInputChange={handleInputChange}
                    onInputClear={handleInputClear}
                    onIconClick={handleLocationClear}
                    onEnter={handleLocationEnter}
                  />
                )}
              </SearchSelector>
              <div className={cx('division')}></div>
              <SearchSelector
                label="일정"
                isOpen={isDateDropdownOpen}
                selectedResult={displayedDate}
                setSelectedResult={setDisplayedDate}
                onResultClear={handleDateResultClear}
                onToggle={() => handleDropdownToggle('date')}
                ref={dateDropdownRef}
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
                      onReset={handleDateResultClear}
                      numberOfMonths={numberOfMonths}
                    />
                  </div>
                </div>
              </SearchSelector>
              <div className={cx('division')}></div>
              <SearchSelector
                label="인원"
                isOpen={isGuestDropdownOpen}
                showCloseIcon={false}
                selectedResult={formatGuestCountsString()}
                onToggle={() => handleDropdownToggle('guest')}
                ref={guestDropdownRef}
              >
                <div
                  className={cx('dropdown', 'guest')}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={cx('dropdownInner')}>
                    <CountSelector
                      title="성인"
                      description="13세 이상"
                      initialCount={adultCount}
                      onChange={(count) => setAdultCount(count)}
                    />
                    <CountSelector
                      title="어린이"
                      description="2세~12세"
                      initialCount={childCount}
                      onChange={(count) => setChildCount(count)}
                    />
                    <CountSelector
                      title="유아"
                      description="2세 미만"
                      initialCount={infantCount}
                      onChange={(count) => setInfantCount(count)}
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
