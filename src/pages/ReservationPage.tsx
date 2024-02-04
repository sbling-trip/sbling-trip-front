import { useState } from 'react'
import Title from '@components/shared/Title'
import ListRow from '@components/shared/ListRow'
import ErrorMessage from '@components/shared/ErrorMessage'
import delimiter from '@utils/delimiter'

import classNames from 'classnames/bind'
import styles from './ReservationPage.module.scss'

const cx = classNames.bind(styles)

const ReservationPage = () => {
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
  })

  const [isNameValid, setIsNameValid] = useState<boolean>(false)
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false)

  const validateField = (name: string, value: string) => {
    let errorMessage = ''

    if (value.trim() === '') {
      return ''
    }

    if (name === 'name' && value.length < 2) {
      errorMessage = '이름을 2글자 이상 입력해주세요.'
    } else if (name === 'phone' && !/^\d{3}-\d{4}-\d{4}$/.test(value)) {
      errorMessage = '유효한 휴대폰 번호를 입력해주세요.'
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }))

    return errorMessage
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    const errorMessage = validateField('name', newName)
    setIsNameValid(errorMessage === '')
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value
    setPhone(newPhone)
    const errorMessage = validateField('phone', newPhone)
    setIsPhoneValid(errorMessage === '')
  }

  return (
    <main>
      <div className={cx('reservationContainer')}>
        <div className={cx('reservationInner')}>
          <Title
            title="예약 확인 및 결제"
            subTitle=""
            className={cx('reservationTitle')}
          />
          <hr />
          <div className={cx('contents')}>
            <div className={cx('contentsBody')}>
              <section className={cx('sectionContainer')}>
                <Title
                  title="숙소 정보"
                  subTitle=""
                  className={cx('sectionTitle')}
                />
                <ListRow
                  as="div"
                  className={cx('listRow')}
                  leftContent={
                    <div className={cx('leftContent')}>
                      <img
                        src="https://images.unsplash.com/photo-1617596225496-1d9da33a144b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA% 3D%3D"
                        alt="숙소 이미지"
                      />
                    </div>
                  }
                  mainContent={
                    <div className={cx('mainContentTitle')}>
                      <h3>숙소 이름</h3>
                      <div className={cx('schedule')}>
                        <span>객실 이름</span>
                        <span>체크인: 15:00 ~ 체크아웃: 11:00</span>
                      </div>
                    </div>
                  }
                />
              </section>
              <hr />
              <section className={cx('sectionContainer')}>
                <Title
                  title="예약자 정보"
                  subTitle=""
                  className={cx('sectionTitle')}
                />
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
                        onChange={handleNameChange}
                        required
                      />
                    </div>
                    <ErrorMessage
                      error={errors.name}
                      className={cx('errorMsg')}
                    />
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
                        onChange={handlePhoneChange}
                        required
                      />
                    </div>
                    <ErrorMessage
                      error={errors.phone}
                      className={cx('errorMsg')}
                    />
                  </div>
                </div>
              </section>
              <hr />
              <section className={cx('sectionContainer')}>
                <Title
                  title="포인트 사용"
                  subTitle=""
                  className={cx('sectionTitle')}
                />
                <ListRow
                  as="div"
                  className={cx('listCol')}
                  mainContent={
                    <div className={cx('mainContent')}>
                      <span>보유 포인트</span>
                      <strong>{delimiter(100000)}</strong>
                    </div>
                  }
                  rightContent={
                    <div className={cx('rightContent')}>
                      <div className={cx('pointInputBox')}>
                        <input
                          type="decimal"
                          min="0"
                          className={cx('pointInput')}
                        />
                        <span>원</span>
                      </div>
                      <button type="button" className={cx('pointBtn')}>
                        모두 사용
                      </button>
                    </div>
                  }
                />
              </section>
              <hr />
            </div>
            <aside className={cx('aside')}>
              <div className={cx('sidebar')}>
                <div className={cx('inner')}>
                  <div className={cx('payment')}>
                    <Title
                      title="결제 정보"
                      subTitle=""
                      className={cx('paymentTitle')}
                    />
                    <div className={cx('paymentInfo')}>
                      <div className={cx('flexBlock')}>
                        <span>예약 금액</span>
                        <strong>결제 금액</strong>
                      </div>
                      <div className={cx('flexBlock')}>
                        <span>포인트 사용</span>
                        <strong>사용한 포인트 금액</strong>
                      </div>
                      <hr />
                      <div className={cx('flexBlock', 'total')}>
                        <span className={cx('totalText')}>총 결제 금액</span>
                        <strong className={cx('totalPrice')}>
                          {delimiter(100000)}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div className={cx('btnWrap')}>
                    <button
                      type="button"
                      className={cx('paymentBtn')}
                      disabled={!isNameValid && isPhoneValid}
                    >
                      {`${delimiter(100000)}원 결제하기`}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ReservationPage
