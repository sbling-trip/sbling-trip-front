import { useState } from 'react'
import updateBirthdate from '@utils/updateBirthdate'

const useSignupForm = () => {
  const initialFormState = {
    userName: '',
    birthAt: '',
    gender: '',
  }

  const [formData, setFormData] = useState(initialFormState)
  const [error, setError] = useState(initialFormState)

  const validateField = (name: string, value: string): string => {
    if (value.trim() === '') {
      return ''
    }

    if (name === 'userName') {
      return value.length >= 3
        ? ''
        : '닉네임은 한글, 영문 3~12자 이내로 작성해주세요.'
    }

    return ''
  }

  const handleGenerateUserName = () => {
    const firstAdjectives = [
      '귀엽고',
      '멋지고',
      '강하고',
      '행복하고',
      '시원하고',
      '다정하고',
      '활발하고',
    ]
    const secondAdjectives = [
      '새로운',
      '아름다운',
      '똑똑한',
      '창의적인',
      '탁월한',
      '긍정적인',
      '꼼꼼한',
    ]
    const nouns = [
      '사람',
      '이쁜이',
      '멋쟁이',
      '사랑이',
      '블링이',
      '여행자',
      '방랑가',
    ]

    const getRandomElement = (array: string[]) =>
      array[Math.floor(Math.random() * array.length)]

    const randomUserName =
      `${getRandomElement(firstAdjectives)}` +
      `${getRandomElement(secondAdjectives)}` +
      `${getRandomElement(nouns)}` +
      `${self.crypto.randomUUID().substring(0, 5)}`

    setFormData({
      ...formData,
      userName: randomUserName,
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target

    if (type === 'radio') {
      setFormData({
        ...formData,
        [name]: value,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })

      setError({
        ...error,
        [name]: validateField(name, value),
      })
    }
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value
    const updatedFormData = updateBirthdate(formData, 'year', newYear)
    setFormData(updatedFormData)
  }

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value
    const updatedFormData = updateBirthdate(formData, 'month', newMonth)
    setFormData(updatedFormData)
  }

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = e.target.value
    const updatedFormData = updateBirthdate(formData, 'day', newDay)
    setFormData(updatedFormData)
  }

  return {
    formData,
    error,
    handleChange,
    handleGenerateUserName,
    handleYearChange,
    handleMonthChange,
    handleDayChange,
  }
}

export default useSignupForm
