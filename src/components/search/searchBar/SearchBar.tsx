import { useState } from 'react'
import SelectionMenu from './SelectionMenu'
import LocationSearch from './locationSelector/LocationSearch'
import DatePicker from './dateSelector/DatePicker'
import CountSelector from './guestSelector/CountSelector'

import useDropdown from '@hooks/useDropdown'
import useDatePicker from '@hooks/useDatePicker'

import IconSearch from '@assets/icon/icon-search.svg?react'
import classNames from 'classnames/bind'
import styles from './SearchBar.module.scss'

const cx = classNames.bind(styles)

const SearchBar = () => {
  const isMobile = window.innerWidth < 768
  const numberOfMonths = isMobile ? 1 : 2

  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [searchLocation, setSearchLocation] = useState<string>('')
  const [adultCount, setAdultCount] = useState<number>(2)
  const [childCount, setChildCount] = useState<number>(0)

  const {
    displayedDate,
    setDisplayedDate,
    selectedDate,
    setSelectedDate,
    toggleDateDropdown,
    handleDatePickerComplete,
    handleReset,
    isDateDropdownOpen,
    dateDropdownRef,
  } = useDatePicker()

  const [isLocationDropdownOpen, toggleLocationDropdown, locationDropdownRef] =
    useDropdown(false)
  const [isGuestDropdownOpen, toggleGuestDropdown, guestDropdownRef] =
    useDropdown(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const countsQueryString = formatGuestCountsString()
    const queryString = new URLSearchParams({
      query: selectedLocation,
      checkIn: selectedDate.checkIn || '',
      checkOut: selectedDate.checkOut || '',
      adultCount: String(adultCount),
      childCount: String(childCount),
    })

    if (countsQueryString) {
      queryString.append('counts', countsQueryString)
    }

    if (searchLocation) {
      setSelectedLocation(searchLocation)
    }
  }

  const handleLocationEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    handleLocationSubmit()
  }

  const handleLocationSubmit = () => {
    setSelectedLocation(searchLocation)
    setSearchLocation('')
    toggleLocationDropdown()
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

  const handleDropdownToggle = (dropdown: 'location' | 'guest' | 'date') => {
    if (dropdown === 'location') {
      toggleLocationDropdown()
    } else if (dropdown === 'guest') {
      toggleGuestDropdown()
    } else if (dropdown === 'date') {
      toggleDateDropdown()
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

    return parts.join(', ')
  }

  const renderLocationDropdown = () =>
    isLocationDropdownOpen && (
      <LocationSearch
        searchTerm={searchLocation}
        submittedTerm={selectedLocation}
        onInputChange={handleInputChange}
        onInputClear={handleInputClear}
        onIconClick={handleLocationClear}
        onEnter={handleLocationEnter}
      />
    )

  const renderDateDropdown = () => (
    <div
      className={cx('dropdown', 'date')}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={cx('dropdownInner')}>
        <DatePicker
          checkIn={selectedDate.checkIn}
          checkOut={selectedDate.checkOut}
          onChange={(dateRange) => {
            setSelectedDate({
              checkIn: dateRange.from,
              checkOut: dateRange.to,
              nights: dateRange.nights,
            })
          }}
          onComplete={() => {
            handleDatePickerComplete()
          }}
          onReset={handleReset}
          numberOfMonths={numberOfMonths}
        />
      </div>
    </div>
  )

  const renderGuestDropdown = () => (
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
      </div>
    </div>
  )

  return (
    <main>
      <div className={cx('searchContainer')}>
        <header className={cx('header')}>
          <form onSubmit={handleFormSubmit} className={cx('form')}>
            <div className={cx('contents')}>
              <SelectionMenu
                label="여행지"
                isOpen={isLocationDropdownOpen}
                selectedResult={selectedLocation}
                setSelectedResult={setSelectedLocation}
                onToggle={() => handleDropdownToggle('location')}
                ref={locationDropdownRef}
              >
                {renderLocationDropdown()}
              </SelectionMenu>
              <div className={cx('division')}></div>
              <SelectionMenu
                label="일정"
                isOpen={isDateDropdownOpen}
                selectedResult={displayedDate}
                setSelectedResult={setDisplayedDate}
                onResultClear={handleReset}
                onToggle={() => handleDropdownToggle('date')}
                ref={dateDropdownRef}
              >
                {renderDateDropdown()}
              </SelectionMenu>
              <div className={cx('division')}></div>
              <SelectionMenu
                label="인원"
                isOpen={isGuestDropdownOpen}
                showCloseIcon={false}
                selectedResult={formatGuestCountsString()}
                onToggle={() => handleDropdownToggle('guest')}
                ref={guestDropdownRef}
              >
                {renderGuestDropdown()}
              </SelectionMenu>
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

export default SearchBar
