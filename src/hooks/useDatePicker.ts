import { useEffect, useState } from 'react'
import { addDays, addMonths, format } from 'date-fns'
import useDropdown from '@hooks/useDropdown'
import { useDispatch } from 'react-redux'
import { setDates, resetDates } from '@redux/searchSlice'

const DATE_FORMAT = 'yyyy-MM-dd'

const useDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<{
    checkIn?: string
    checkOut?: string
  }>({
    checkIn: format(addMonths(new Date(), 1), DATE_FORMAT),
    checkOut: format(addDays(addMonths(new Date(), 1), 1), DATE_FORMAT),
  })

  const [isDateDropdownOpen, toggleDateDropdown, dateDropdownRef] =
    useDropdown(false)

  const dispatch = useDispatch()

  const handleDatePickerComplete = () => {
    if (selectedDate.checkIn && selectedDate.checkOut) {
      toggleDateDropdown()
    }
  }

  const handleReset = () => {
    setSelectedDate({
      checkIn: format(addMonths(new Date(), 1), DATE_FORMAT),
      checkOut: format(addDays(addMonths(new Date(), 1), 1), DATE_FORMAT),
    })
    dispatch(resetDates())
  }

  useEffect(() => {
    if (
      selectedDate.checkIn !== undefined &&
      selectedDate.checkOut !== undefined
    ) {
      dispatch(
        setDates({
          checkIn: selectedDate.checkIn,
          checkOut: selectedDate.checkOut,
        }),
      )
    }
  }, [dispatch, selectedDate])

  return {
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
