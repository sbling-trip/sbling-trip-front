import TermsAndConditions from '@components/shared/TermsAndConditions'
import Title from '@components/shared/Title'
import useTermsAgreement from '@hooks/useTermsAgreement'
import delimiter from '@utils/delimiter'

import classNames from 'classnames/bind'
import styles from './PaymentSidebar.module.scss'

const cx = classNames.bind(styles)

interface PaymentSidebarProps {
  formData: {
    roomPrice: number
    usedPoints: number
    isNameValid: boolean
    isPhoneValid: boolean
    totalPayment: number
  }
  handlePaymentButtonClick: () => void
}

const PaymentSidebar = ({
  formData,
  handlePaymentButtonClick,
}: PaymentSidebarProps) => {
  const { roomPrice, usedPoints, totalPayment } = formData

  const {
    selectAllTerms,
    termsAgreed,
    handleSelectAgreeAll,
    handleSelectTerm,
  } = useTermsAgreement({
    initialTerms: { term1: false, term2: false, term3: false },
  })

  return (
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
                <strong>{`${delimiter(roomPrice)}원`}</strong>
              </div>
              <div className={cx('flexBlock')}>
                <span>포인트 사용</span>
                <strong>{`- ${delimiter(usedPoints)}원`}</strong>
              </div>
              <hr />
              <div className={cx('flexBlock', 'total')}>
                <span className={cx('totalText')}>총 결제 금액</span>
                <strong className={cx('totalPrice')}>
                  {`${delimiter(totalPayment)}원`}
                </strong>
              </div>
            </div>
          </div>
          <TermsAndConditions
            selectAllTerms={selectAllTerms}
            termsAgreed={termsAgreed}
            handleSelectAgreeAll={handleSelectAgreeAll}
            handleSelectTerm={handleSelectTerm}
          />
          <div className={cx('btnWrap')}>
            <button
              type="submit"
              className={cx('paymentBtn')}
              onClick={handlePaymentButtonClick}
            >
              {`${delimiter(totalPayment)}원 결제하기`}
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default PaymentSidebar
