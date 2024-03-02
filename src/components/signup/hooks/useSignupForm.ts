import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useTermsAgreement from '@hooks/useTermsAgreement'
import { useAlertContext } from '@hooks/useAlertContext'
import updateBirthdate from '@utils/updateBirthdate'
import authAxios from '@api/authAxios'

const useSignupForm = () => {
  const initialFormState = {
    userName: '',
    birthAt: '',
    gender: '',
  }

  const [formData, setFormData] = useState(initialFormState)
  const [error, setError] = useState(initialFormState)

  const location = useLocation()
  const locationState = location.state as { providerToken: string }

  const { openAlert } = useAlertContext()
  const { termsAgreed } = useTermsAgreement({
    initialTerms: { term1: false, term2: false, term3: false },
  })

  const handleConfirmClick = () => {
    setTimeout(() => {
      window.location.href = '/'
    }, 100)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const requestData = {
        agree: {
          marketing: termsAgreed.term1,
          location: termsAgreed.term2,
          service: termsAgreed.term3,
        },
        birthAt: new Date(formData.birthAt).toISOString(),
        gender: formData.gender,
        userName: formData.userName,
        providerToken: locationState.providerToken,
      }

      const { data } = await authAxios.post(
        '/account/sign-in/google',
        requestData,
      )

      if (data.accessToken) {
        localStorage.setItem('access_token', data.accessToken)
      } else {
        console.error('서버 응답에서 액세스 토큰이 없습니다.')
      }

      openAlert({
        title: '회원가입이 완료되었습니다.',
        onConfirmClick: handleConfirmClick,
      })
    } catch (error) {
      console.error('Signup failed', error)
    }
  }

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
    handleSubmit,
    handleChange,
    handleGenerateUserName,
    handleYearChange,
    handleMonthChange,
    handleDayChange,
  }
}

export default useSignupForm
