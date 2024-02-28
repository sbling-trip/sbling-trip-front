type FormDataType = {
  userName: string
  birthAt: string
  gender: string
}

type UpdatePart = 'year' | 'month' | 'day'

const updateBirthdate = (
  formData: FormDataType,
  part: UpdatePart,
  value: string,
): FormDataType => {
  const currentYear = formData.birthAt.slice(0, 4)
  const currentMonth = formData.birthAt.slice(5, 7)
  const currentDay = formData.birthAt.slice(8)

  let updatedBirthdate = ''

  if (part === 'year') {
    updatedBirthdate = `${value}-${currentMonth}-${currentDay}`
  } else if (part === 'month') {
    updatedBirthdate = `${currentYear}-${value}-${currentDay}`
  } else if (part === 'day') {
    updatedBirthdate = `${currentYear}-${currentMonth}-${value}`
  }

  return {
    ...formData,
    birthAt: updatedBirthdate,
  }
}

export default updateBirthdate
