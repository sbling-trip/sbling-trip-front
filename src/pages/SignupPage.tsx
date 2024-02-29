import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Title from '@components/shared/Title'
import ErrorMessage from '@components/shared/ErrorMessage'
import TermsAndConditions from '@components/shared/TermsAndConditions'
import BirthDateYearOptions from '@components/signup/BirthDateYearOptions'
import BirthDateMonthOptions from '@components/signup/BirthDateMonthOptions'
import BirthDateDayOptions from '@components/signup/BirthDateDayOptions'

import useSignupForm from '@components/signup/hooks/useSignupForm'
import useTermsAgreement from '@hooks/useTermsAgreement'
import { useAlertContext } from '@hooks/useAlertContext'
import authAxios from '@api/authAxios'
import { setUser } from '@redux/userSlice'

import classNames from 'classnames/bind'
import styles from './SignupPage.module.scss'

const cx = classNames.bind(styles)

const SignupPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as { providerToken: string }
  const {
    formData,
    error,
    handleChange,
    handleGenerateUserName,
    handleYearChange,
    handleMonthChange,
    handleDayChange,
  } = useSignupForm()

  const dispatch = useDispatch()
  const { openAlert } = useAlertContext()
  const {
    selectAllTerms,
    termsAgreed,
    handleSelectAgreeAll,
    handleSelectTerm,
  } = useTermsAgreement({
    initialTerms: { term1: false, term2: false, term3: false },
  })

  const isSubmitButtonDisabled =
    Object.values(formData).some(
      (value) => typeof value === 'string' && value.trim().length === 0,
    ) || !termsAgreed.term1

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

      console.log('Signup successful data', data)

      if (data.providerToken) {
        localStorage.setItem('access_token', data.providerToken)
        dispatch(setUser(data))
      } else {
        console.error('서버 응답에서 액세스 토큰이 없습니다.')
      }

      openAlert({
        title: '회원가입이 완료되었습니다.',
        onConfirmClick: () => {
          navigate('/')
        },
      })
    } catch (error) {
      console.error('Signup failed', error)
    }
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
                onClick={handleGenerateUserName}
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
                <BirthDateYearOptions />
              </select>
              <select
                onChange={handleMonthChange}
                value={formData.birthAt.slice(5, 7)}
              >
                <BirthDateMonthOptions formData={formData} />
              </select>
              <select
                onChange={handleDayChange}
                value={formData.birthAt.slice(8)}
              >
                <BirthDateDayOptions formData={formData} />
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
