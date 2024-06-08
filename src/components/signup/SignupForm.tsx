import ErrorMessage from '@components/shared/ErrorMessage'
import TermsAndConditions from '@components/shared/TermsAndConditions'
import BirthDateYearOptions from '@components/signup/BirthDateYearOptions'
import BirthDateMonthOptions from '@components/signup/BirthDateMonthOptions'
import BirthDateDayOptions from '@components/signup/BirthDateDayOptions'
import useTermsAgreement from '@hooks/useTermsAgreement'

import classNames from 'classnames/bind'
import styles from './SignupForm.module.scss'

const cx = classNames.bind(styles)

interface SignupFormProps {
  formData: {
    userName: string
    birthAt: string
    gender: string
  }
  error: {
    userName: string
    birthAt: string
    gender: string
  }
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void
  handleGenerateUserName: () => void
  handleYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleMonthChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleDayChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SignupForm = ({
  formData,
  error,
  handleSubmit,
  handleChange,
  handleGenerateUserName,
  handleYearChange,
  handleMonthChange,
  handleDayChange,
}: SignupFormProps) => {
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

  return (
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
            aria-label="사용자 이름 랜덤 생성 버튼"
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
          <select onChange={handleDayChange} value={formData.birthAt.slice(8)}>
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
          aria-label="작성 완료 버튼"
        >
          작성 완료
        </button>
      </div>
    </form>
  )
}

export default SignupForm
