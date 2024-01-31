import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Title from '@components/shared/Title'
import ErrorMessage from '@components/shared/ErrorMessage'
import useAuth from '@auth/useAuth'

import IconKakao from '@assets/icon/icon-kakao-fill.svg?react'
import IconNaver from '@assets/icon/icon-naver.svg?react'
import IconGoogle from '@assets/icon/icon-google.svg?react'

import classNames from 'classnames/bind'
import styles from './LoginPage.module.scss'

const cx = classNames.bind(styles)

const LoginPage = () => {
  const initialFormState = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialFormState)
  const [error, setError] = useState<string | null>(null)

  const { handleGoogleLogin, user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)

    setFormData({
      ...formData,
      [name]: value,
    })

    setError(null)
  }

  return (
    <div className={cx('loginContainer')}>
      <div className={cx('loginFormContainer')}>
        <Title title="LOGIN" subTitle="로그인" className={cx('formTitle')} />
        <form role="form" className={cx('form')}>
          <div className={cx('formBlock')}>
            <label htmlFor="email">이메일</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="ID@example.com"
              autoComplete="off"
              required
            />
          </div>
          <div className={cx('formBlock')}>
            <label htmlFor="password">비밀번호</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="비밀번호"
              autoComplete="off"
              required
            />
          </div>
          {error && <ErrorMessage error={error} className={cx('error')} />}
          <div className={cx('formBlock', 'btnBlock')}>
            <button type="submit" className={cx('submitBtn')}>
              로그인
            </button>
          </div>
          <div className={cx('snsLoginContainer')}>
            <strong>SNS 계정으로 로그인하기</strong>
            <div className={cx('snsLogin')}>
              <button type="button" className={cx('btn')}>
                <IconKakao width={60} height={60} />
              </button>
              <button type="button" className={cx('btn')}>
                <IconNaver width={60} height={60} />
              </button>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className={cx('btn', 'google')}
              >
                <IconGoogle width={30} height={30} />
              </button>
            </div>
          </div>
          <hr />
          <div className={cx('formBlock', 'checkUser')}>
            <span>아직 회원이 아니신가요?</span>
            <Link to="/signup" className={cx('formLink')}>
              <span>회원가입하기</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
