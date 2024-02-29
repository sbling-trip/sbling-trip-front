const BirthDateYearOptions = () => {
  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, index) => currentYear - index,
  )

  return (
    <>
      <option value="" disabled>
        년도
      </option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </>
  )
}

export default BirthDateYearOptions
