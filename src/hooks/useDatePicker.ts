import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import useDropdown from '@hooks/useDropdown'

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

const useDatePicker = (): UseDatePickerResult => {
  const [displayedDate, setDisplayedDate] = useState('')
  const [selectedDate, setSelectedDate] = useState<{
    checkIn?: string
    checkOut?: string
    nights: number
  }>({
    checkIn: undefined,
    checkOut: undefined,
    nights: 0,
  })

  const [isDateDropdownOpen, toggleDateDropdown, dateDropdownRef] =
    useDropdown(false)

  const handleDatePickerComplete = () => {
    if (selectedDate.checkIn && selectedDate.checkOut) {
      const formattedcheckIn = format(
        parseISO(selectedDate.checkIn),
        'M월 dd일',
      )
      const formattedcheckOut = format(
        parseISO(selectedDate.checkOut),
        'M월 dd일',
      )
      setDisplayedDate(
        `${formattedcheckIn} - ${formattedcheckOut} (${selectedDate.nights}박)`,
      )

      toggleDateDropdown()
    }
  }

  const handleReset = () => {
    setDisplayedDate('')
    setSelectedDate({
      checkIn: undefined,
      checkOut: undefined,
      nights: 0,
    })
  }

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
