import Title from '@components/shared/Title'
import useAuth from '@auth/useAuth'
import { useAlertContext } from '@hooks/useAlertContext'

import IconGoogle from '@assets/icon/icon-google.svg?react'
import IconKakao from '@assets/icon/icon-kakao.svg?react'
import IconNaver from '@assets/icon/icon-naver.svg?react'

import classNames from 'classnames/bind'
import styles from './LoginPage.module.scss'

const cx = classNames.bind(styles)

const LoginPage = () => {
  const { openAlert } = useAlertContext()
  const { handleGoogleLogin } = useAuth()

  const handleUnderDevelopment = () => {
    openAlert({
      title: '아직 개발 진행 중입니다 !',
      subTitle: ' 구글 계정으로 로그인해주세요. 🙏🏻',
      onConfirmClick: () => {},
    })
  }

  return (
    <div className={cx('loginContainer')}>
      <div className={cx('loginFormContainer')}>
        <Title title="LOGIN" subTitle="로그인" className={cx('formTitle')} />
        <div className={cx('snsLoginContainer')}>
          <div className={cx('snsLogin')}>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className={cx('btn', 'google')}
            >
              <IconGoogle width={28} height={28} />
              <span>구글로 시작하기</span>
            </button>
            <button
              type="button"
              className={cx('btn', 'kakao')}
              onClick={handleUnderDevelopment}
            >
              <IconKakao width={35} height={35} />
              <span>카카오로 시작하기</span>
            </button>
            <button
              type="button"
              className={cx('btn', 'naver')}
              onClick={handleUnderDevelopment}
            >
              <IconNaver width={35} height={35} />
              <span>네이버로 시작하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
