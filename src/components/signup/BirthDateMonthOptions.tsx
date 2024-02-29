interface BirthDateMonthOptionsProps {
  formData: {
    birthAt: string
  }
}

const BirthDateMonthOptions = ({ formData }: BirthDateMonthOptionsProps) => {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const months = Array.from({ length: 12 }, (_, index) => index + 1)

  return (
    <>
      <option value="" disabled={!formData.birthAt.slice(5, 7)}>
        월
      </option>
      {months.map((month) => {
        const isDisabled =
          formData.birthAt.slice(0, 4) === currentYear.toString() &&
          month > currentMonth

        return (
          <option
            key={month}
            value={month.toString().padStart(2, '0')}
            disabled={isDisabled}
          >
            {month}
          </option>
        )
      })}
    </>
  )
}

export default BirthDateMonthOptions
