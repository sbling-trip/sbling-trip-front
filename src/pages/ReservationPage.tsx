import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import SelectedStay from '@components/reservation/SelectedStay'
import PaymentSidebar from '@components/reservation/PaymentSidebar'
import PointUsage from '@components/reservation/PointUsage'
import UserInfo from '@components/reservation/UserInfo'
import Title from '@components/shared/Title'

import useStayList from '@components/stayList/hooks/useStayList'
import { useAlertContext } from '@hooks/useAlertContext'
import useUserPoint from '@auth/useUserPoint'

import { RootState } from '@redux/store'
import { setCurrentStay } from '@redux/staySlice'
import { setPoints } from '@redux/pointSlice'
import { Point } from '@models/point'

import classNames from 'classnames/bind'
import styles from './ReservationPage.module.scss'

const cx = classNames.bind(styles)

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    errors: { name: '', phone: '' },
    isNameValid: false,
    isPhoneValid: false,
    totalPayment: 0,
  })
  const [inputPoints, setInputPoints] = useState<number>(0)
  const [usedPoints, setUsedPoints] = useState<number>(0)

  const navigate = useNavigate()
  const { openAlert } = useAlertContext()

  const dispatch = useDispatch()
  const { currentStay } = useSelector((state: RootState) => state.stay)
  const { stays } = useStayList()
  const { points, fetchUserPoint } = useUserPoint()
  const { point } = points ? points : { point: 0 }

  const currentStayInfo = stays.find(
    (stay) => stay.staySeq === currentStay?.staySeq,
  )
  const stayPrice = currentStayInfo?.minimumRoomPrice ?? 0

  const handlePaymentButtonClick = () => {
    const updatedPoint: Point = {
      userSeq: points!.userSeq,
      pointSeq: points!.pointSeq,
      point: point - usedPoints,
    }

    dispatch(setPoints(updatedPoint))

    openAlert({
      title: '숙소 예약이 완료되었습니다.',
      onConfirmClick: () => {
        navigate('/my')
      },
    })
  }

  const validateField = (name: string, value: string) => {
    let errorMessage = ''

    if (value.trim() === '') {
      return ''
    }

    switch (name) {
      case 'name':
        errorMessage = value.length < 2 ? '이름을 2글자 이상 입력해주세요.' : ''
        break
      case 'phone':
        errorMessage = !/^\d{3}-\d{4}-\d{4}$/.test(value)
          ? '유효한 휴대폰 번호를 입력해주세요.'
          : ''
        break
      default:
        break
    }

    return errorMessage
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const value = e.target.value
    setFormData({
      ...formData,
      [fieldName]: value,
      errors: {
        ...formData.errors,
        [fieldName]: validateField(fieldName, value),
      },
    })
  }

  const handlePointsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setInputPoints(Number(input))
    setUsedPoints(Number(input))
  }

  const handleClickUseAllPoints = () => {
    if (inputPoints > 0) {
      setFormData({
        ...formData,
      })
      setUsedPoints(stayPrice)
    } else {
      setFormData({
        ...formData,
      })
      setUsedPoints(Math.min(point, stayPrice))
    }
  }

  useEffect(() => {
    setFormData({
      ...formData,
      totalPayment: stayPrice - usedPoints,
    })
  }, [usedPoints, stayPrice])

  useEffect(() => {
    if (currentStayInfo) {
      setFormData({
        ...formData,
        totalPayment: currentStayInfo.minimumRoomPrice,
      })
    }
  }, [currentStayInfo])

  useEffect(() => {
    dispatch(setCurrentStay(currentStay))

    if (currentStay) {
      fetchUserPoint()
    }
  }, [dispatch, currentStay])

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
              <SelectedStay currentStayInfo={currentStayInfo} />
              <hr />
              <UserInfo
                formData={formData}
                handleInputChange={handleInputChange}
              />
              <hr />
              <PointUsage
                formData={{
                  point: point,
                }}
                usedPoints={usedPoints}
                handlePointsInputChange={handlePointsInputChange}
                handleClickUseAllPoints={handleClickUseAllPoints}
              />
              <hr />
            </div>
            <PaymentSidebar
              formData={{
                stayPrice,
                usedPoints: usedPoints,
                isNameValid: formData.isNameValid,
                isPhoneValid: formData.isPhoneValid,
                totalPayment: formData.totalPayment,
              }}
              handlePaymentButtonClick={handlePaymentButtonClick}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default ReservationPage
