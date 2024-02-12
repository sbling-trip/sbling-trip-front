import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Title from '@components/shared/Title'
import ErrorMessage from '@components/shared/ErrorMessage'
import TermsAndConditions from '@components/shared/TermsAndConditions'
import useTermsAgreement from '@hooks/useTermsAgreement'
import authAxios from '@api/authAxios'
import { setUser } from '@redux/userSlice'

import classNames from 'classnames/bind'
import styles from './SignupPage.module.scss'

const cx = classNames.bind(styles)

const SignupPage = () => {
  const initialFormState = {
    userName: '',
    birthAt: '',
    gender: '',
  }

  const [formData, setFormData] = useState(initialFormState)
  const [error, setError] = useState(initialFormState)

  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as { providerToken: string }

  const dispatch = useDispatch()

  const {
    selectAllTerms,
    termsAgreed,
    handleSelectAgreeAll,
    handleSelectTerm,
  } = useTermsAgreement({
    initialTerms: { term1: false, term2: false, term3: false, term4: false },
  })

  const isSubmitButtonDisabled =
    Object.values(formData).some(
      (value) => typeof value === 'string' && value.trim().length === 0,
    ) ||
    !termsAgreed.term1 ||
    !termsAgreed.term2 ||
    !termsAgreed.term3

  const handleGenerateuserName = () => {
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
        'account/sign-in/google',
        requestData,
      )

      console.log('Signup successful data', data)

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token)
        dispatch(setUser(data.user))
      } else {
        console.error('서버 응답에서 액세스 토큰이 없습니다.')
      }

      alert('회원가입이 완료되었습니다.')
      navigate('/')
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
    updateBirthdate('year', newYear)
  }

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value
    updateBirthdate('month', newMonth)
  }

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = e.target.value
    updateBirthdate('day', newDay)
  }

  const updateBirthdate = (part: string, value: string) => {
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

    setFormData({
      ...formData,
      birthAt: updatedBirthdate,
    })
  }

  const renderYearOptions = () => {
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

  const renderMonthOptions = () => {
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

  const renderDayOptions = () => {
    const selectedYear = parseInt(formData.birthAt.slice(0, 4), 10)
    const selectedMonth = parseInt(formData.birthAt.slice(5, 7), 10)
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate()
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1)

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    return (
      <>
        <option value="" disabled>
          일
        </option>
        {days.map((day) => {
          const date = new Date(selectedYear, selectedMonth - 1, day)
          const isDisabled = date > yesterday

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

  return (
    <div className={cx('signupContainer')}>
      <div className={cx('signupInner')}>
        <Title title="JOIN" subTitle="회원가입" className={cx('formTitle')} />
        <form role="form" className={cx('form')} onSubmit={handleSubmit}>
          <div className={cx('formBlock')}>
            <label htmlFor="userName">닉네임</label>
            <div className={cx('flexBlock')}>
              <input
                onChange={handleChange}
                type="text"
                name="userName"
                id="userName"
                placeholder="닉네임을 작성해주세요."
                value={formData.userName}
                autoComplete="off"
                required
                className={cx({
                  error: !!error.userName,
                })}
              />
              <button
                type="button"
                className={cx('userNameBtn')}
                onClick={handleGenerateuserName}
              >
                랜덤 생성
              </button>
            </div>
            <ErrorMessage error={error.userName} className={cx('errorMsg')} />
          </div>
          <div className={cx('formBlock')}>
            <label htmlFor="birthAt">생년월일</label>
            <div className={cx('birthdateDropdowns')}>
              <select
                onChange={handleYearChange}
                value={formData.birthAt.slice(0, 4)}
              >
                {renderYearOptions()}
              </select>
              <select
                onChange={handleMonthChange}
                value={formData.birthAt.slice(5, 7)}
              >
                {renderMonthOptions()}
              </select>
              <select
                onChange={handleDayChange}
                value={formData.birthAt.slice(8)}
              >
                {renderDayOptions()}
              </select>
            </div>
            <ErrorMessage error={error.birthAt} className={cx('errorMsg')} />
          </div>
          <div className={cx('formBlock')}>
            <label htmlFor="gender">성별</label>
            <div className={cx('genderRadio')}>
              <div className={cx('genderBlock')}>
                <input
                  type="radio"
                  id="M"
                  value="M"
                  name="gender"
                  checked={formData.gender === 'M'}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="M" className={cx('genderLabel')}>
                  남성
                </label>
              </div>
              <div className={cx('genderBlock')}>
                <input
                  type="radio"
                  id="F"
                  value="F"
                  name="gender"
                  checked={formData.gender === 'F'}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="F" className={cx('genderLabel')}>
                  여성
                </label>
              </div>
            </div>
            <ErrorMessage error={error.gender} className={cx('errorMsg')} />
          </div>
          <TermsAndConditions
            selectAllTerms={selectAllTerms}
            termsAgreed={termsAgreed}
            handleSelectAgreeAll={handleSelectAgreeAll}
            handleSelectTerm={handleSelectTerm}
          />
          <div className={cx('formBlock', 'btnBlock')}>
            <button
              type="submit"
              className={cx('submitBtn')}
              disabled={isSubmitButtonDisabled}
            >
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
