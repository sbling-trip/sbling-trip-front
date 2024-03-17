interface BirthDateDayOptionsProps {
  formData: {
    birthAt: string
  }
}

const TODAY = new Date()
const YESTERDAY = new Date(TODAY)
YESTERDAY.setDate(TODAY.getDate() - 1)

const BirthDateDayOptions = ({ formData }: BirthDateDayOptionsProps) => {
  const selectedYear = parseInt(formData.birthAt.slice(0, 4), 10)
  const selectedMonth = parseInt(formData.birthAt.slice(5, 7), 10)
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1)

  return (
    <>
      <option value="" disabled>
        일
      </option>
      {days.map((day) => {
        const date = new Date(selectedYear, selectedMonth - 1, day)
        const isDisabled = date > YESTERDAY

        return (
          <option
            key={day}
            value={day.toString().padStart(2, '0')}
            disabled={isDisabled}
          >
            {day}
          </option>
        )
      })}
    </>
  )
}

export default BirthDateDayOptions
