import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import useDropdown from '@hooks/useDropdown'

interface UseDatePickerResult {
  displayedDate: string
  setDisplayedDate: React.Dispatch<React.SetStateAction<string>>
  selectedDate: {
    startDate?: string
    endDate?: string
    nights: number
  }
  setSelectedDate: React.Dispatch<
    React.SetStateAction<{
      startDate?: string | undefined
      endDate?: string | undefined
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
    startDate?: string
    endDate?: string
    nights: number
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  })

  const [isDateDropdownOpen, toggleDateDropdown, dateDropdownRef] =
    useDropdown(false)

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
      toggleDateDropdown()
    }
  }

  const handleReset = () => {
    setDisplayedDate('')
    setSelectedDate({
      startDate: undefined,
      endDate: undefined,
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
