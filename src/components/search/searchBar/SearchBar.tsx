import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DateSelector from './dateSelector/DateSelector'
import GuestSelector from './guestSelector/GuestSelector'
import MobileSearchResultInput from './MobileSearchResultInput'
import Title from '@components/shared/Title'
import { serializeSearchParams } from '@utils/serializeSearchParams'
import useDatePicker from '@hooks/useDatePicker'
import useDropdown from '@hooks/useDropdown'

import apiClientAxios from '@api/apiClientAxios'
import { ListApiResponse } from '@models/api'
import { Stay } from '@models/stay'
import { RootState } from '@redux/store'
import { setSearchResultStays } from '@redux/staySlice'
import { setSearch } from '@redux/searchSlice'
import { setSearchResultRooms } from '@redux/roomSlice'

import IconClose from '@assets/icon/icon-close.svg?react'
import IconSearch from '@assets/icon/icon-search.svg?react'
import classNames from 'classnames/bind'
import styles from './SearchBar.module.scss'

const cx = classNames.bind(styles)

const SearchBar = () => {
  const [displayedDate, setDisplayedDate] = useState<string>('')
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)
  const [isGuestDropdownOpen, toggleGuestDropdown, guestDropdownRef] =
    useDropdown(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { checkInDate, checkOutDate, adultGuestCount, childGuestCount } =
    useSelector((state: RootState) => state.search)

  const {
    handleDatePickerComplete,
    handleReset,
    toggleDateDropdown,
    isDateDropdownOpen,
    dateDropdownRef,
  } = useDatePicker()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const requestData = {
      checkInDate: checkInDate || '',
      checkOutDate: checkOutDate || '',
      adultGuestCount: adultGuestCount,
      childGuestCount: childGuestCount,
    }

    dispatch(setSearch(requestData))
    const searchString = serializeSearchParams(requestData)
    let apiUrl = ''

    if (location.pathname === '/' || location.pathname.startsWith('/search')) {
      apiUrl = `/search/stay/list?${searchString}`
      try {
        const { data } = await apiClientAxios.get<ListApiResponse<Stay>>(apiUrl)
        dispatch(setSearchResultStays(data.result))
        navigate(`/search?${searchString}`)
      } catch (error) {
        console.error('Error fetching stays:', error)
      }
    } else if (location.pathname.startsWith('/stay')) {
      const staySeq = location.pathname.split('/')[2]
      apiUrl = `/search/room/list?staySeq=${staySeq}&${searchString}`
      try {
        const { data } = await apiClientAxios.get(apiUrl)
        dispatch(setSearchResultRooms(data.result))
        navigate(`/stay/${staySeq}?${searchString}`)
      } catch (error) {
        console.error('Error fetching rooms:', error)
      }
    }
  }

  const handleDropdownToggle = (dropdown: 'guest' | 'date') => {
    if (dropdown === 'guest') {
      toggleGuestDropdown()
    } else if (dropdown === 'date') {
      toggleDateDropdown()
    }
  }

  const handleMobileSearchClose = () => {
    setIsMobileModalOpen((prev) => !prev)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const requestData = {
      checkInDate: searchParams.get('checkInDate') || '',
      checkOutDate: searchParams.get('checkOutDate') || '',
      adultGuestCount: parseInt(searchParams.get('adultGuestCount') || '0'),
      childGuestCount: parseInt(searchParams.get('childGuestCount') || '0'),
    }
    dispatch(setSearch(requestData))
  }, [location, dispatch])

  return (
    <>
      <MobileSearchResultInput
        onClick={handleMobileSearchClose}
        displayedDate={displayedDate}
        adultCount={adultGuestCount}
        childCount={childGuestCount}
      />
      <div className={cx('mobileModal', { open: isMobileModalOpen })}>
        <Title
          title="숙소 찾기"
          subTitle=""
          className={cx('mobileModalTitle')}
        />
        <button
          type="button"
          className={cx('closeBtn')}
          onClick={handleMobileSearchClose}
        >
          <IconClose width={20} height={20} />
        </button>
        <div className={cx('searchContainer')}>
          <header className={cx('header')}>
            <form onSubmit={handleFormSubmit} className={cx('form')}>
              <div className={cx('contents')}>
                <DateSelector
                  isOpen={isDateDropdownOpen}
                  displayedDate={displayedDate}
                  setDisplayedDate={setDisplayedDate}
                  selectedDate={{ checkInDate, checkOutDate }}
                  onToggle={() => handleDropdownToggle('date')}
                  dateDropdownRef={dateDropdownRef}
                  onReset={handleReset}
                  onComplete={handleDatePickerComplete}
                />
                <div className={cx('division')}></div>
                <GuestSelector
                  isOpen={isGuestDropdownOpen}
                  adultCount={adultGuestCount}
                  childCount={childGuestCount}
                  onToggle={() => handleDropdownToggle('guest')}
                  guestDropdownRef={guestDropdownRef}
                />
                <div className={cx('btnContainer')}>
                  <button
                    type="submit"
                    className={cx('submitBtn')}
                    onClick={handleMobileSearchClose}
                  >
                    <span>숙소 검색</span>
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
      </div>
    </>
  )
}

export default SearchBar
