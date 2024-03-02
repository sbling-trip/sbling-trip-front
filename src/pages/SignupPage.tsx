import Title from '@components/shared/Title'
import SignupForm from '@components/signup/SignupForm'
import useSignupForm from '@components/signup/hooks/useSignupForm'

import classNames from 'classnames/bind'
import styles from './SignupPage.module.scss'

const cx = classNames.bind(styles)

const SignupPage = () => {
  const {
    formData,
    error,
    handleSubmit,
    handleChange,
    handleGenerateUserName,
    handleYearChange,
    handleMonthChange,
    handleDayChange,
  } = useSignupForm()

  return (
    <div className={cx('signupContainer')}>
      <div className={cx('signupInner')}>
        <Title title="JOIN" subTitle="회원가입" className={cx('signupTitle')} />
        <SignupForm
          formData={formData}
          error={error}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleGenerateUserName={handleGenerateUserName}
          handleYearChange={handleYearChange}
          handleMonthChange={handleMonthChange}
          handleDayChange={handleDayChange}
        />
      </div>
    </div>
  )
}

export default SignupPage
