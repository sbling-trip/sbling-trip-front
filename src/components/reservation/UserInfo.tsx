import Title from '@components/shared/Title'
import ErrorMessage from '@components/shared/ErrorMessage'

import classNames from 'classnames/bind'
import styles from './UserInfo.module.scss'

const cx = classNames.bind(styles)

interface UserInfoProps {
  formData: {
    name: string
    phone: string
    errors: { name: string; phone: string }
    isNameValid: boolean
    isPhoneValid: boolean
  }
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => void
}

const UserInfo = ({ formData, handleInputChange }: UserInfoProps) => {
  const { name, phone, errors } = formData

  return (
    <section className={cx('sectionContainer')}>
      <Title title="예약자 정보" subTitle="" className={cx('sectionTitle')} />
      <div className={cx('reservationPerson')}>
        <div className={cx('rowBlock')}>
          <label htmlFor="name">예약자 이름</label>
          <div className={cx('inputWrap')}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="예약자"
              autoComplete="off"
              value={name}
              onChange={(e) => handleInputChange(e, 'name')}
              required
            />
          </div>
          <ErrorMessage error={errors.name} className={cx('errorMsg')} />
        </div>
        <div className={cx('rowBlock')}>
          <label htmlFor="phone">휴대폰 번호</label>
          <div className={cx('inputWrap')}>
            <input
              type="text"
              name="phone"
              id="phone"
              inputMode="tel"
              placeholder="010-1234-5678"
              autoComplete="off"
              value={phone}
              onChange={(e) => handleInputChange(e, 'phone')}
              required
            />
          </div>
          <ErrorMessage error={errors.phone} className={cx('errorMsg')} />
        </div>
      </div>
    </section>
  )
}

export default UserInfo
