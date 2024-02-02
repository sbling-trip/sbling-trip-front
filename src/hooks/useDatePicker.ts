import { useEffect, useState } from 'react'
import { addDays, addMonths, format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import useDropdown from '@hooks/useDropdown'
import { useDispatch } from 'react-redux'
import { resetDate, setDate } from '@redux/dateSlice'

interface UseDatePickerResult {
  displayedDate: string
  setDisplayedDate: React.Dispatch<React.SetStateAction<string>>
  selectedDate: {
    checkIn?: string
    checkOut?: string
    nights: number
  }
  setSelectedDate: React.Dispatch<
    React.SetStateAction<{
      checkIn?: string | undefined
      checkOut?: string | undefined
      nights: number
    }>
  >
  toggleDateDropdown: () => void
  handleDatePickerComplete: () => void
  handleReset: () => void
  isDateDropdownOpen: boolean
  dateDropdownRef: React.RefObject<HTMLDivElement>
}

const DateFormat = 'yyyy-MM-dd'

const useDatePicker = (): UseDatePickerResult => {
  const [displayedDate, setDisplayedDate] = useState('')
  const [selectedDate, setSelectedDate] = useState<{
    checkIn?: string
    checkOut?: string
    nights: number
  }>({
    checkIn: format(addMonths(new Date(), 1), DateFormat),
    checkOut: format(addDays(addMonths(new Date(), 1), 1), DateFormat),
    nights: 1,
  })

  const [isDateDropdownOpen, toggleDateDropdown, dateDropdownRef] =
    useDropdown(false)

  const dispatch = useDispatch()

  const handleDatePickerComplete = () => {
    if (selectedDate.checkIn && selectedDate.checkOut) {
      const formattedcheckIn = format(
        parseISO(selectedDate.checkIn),
        'M월 d일 ',
        { locale: ko },
      )
      const formattedcheckOut = format(
        parseISO(selectedDate.checkOut),
        'M월 d일 ',
        { locale: ko },
      )
      setDisplayedDate(
        `${formattedcheckIn} ~ ${formattedcheckOut} (${selectedDate.nights}박)`,
      )
      toggleDateDropdown()
    }
  }

  const handleReset = () => {
    setDisplayedDate('')
    setSelectedDate({
      checkIn: format(addMonths(new Date(), 1), DateFormat),
      checkOut: format(addDays(addMonths(new Date(), 1), 1), DateFormat),
      nights: 1,
    })
    dispatch(resetDate())
  }

  useEffect(() => {
    dispatch(setDate(selectedDate))
  }, [dispatch, selectedDate])

  return {
    displayedDate,
    setDisplayedDate,
    selectedDate,
    setSelectedDate,
    toggleDateDropdown,
    handleDatePickerComplete,
    handleReset,
    isDateDropdownOpen,
    dateDropdownRef,
  }
}

export default useDatePicker
