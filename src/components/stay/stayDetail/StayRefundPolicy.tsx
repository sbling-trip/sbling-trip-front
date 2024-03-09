import Title from '@components/shared/Title'

import classNames from 'classnames/bind'
import styles from './StayRefundPolicy.module.scss'

const cx = classNames.bind(styles)

interface StayRefundPolicyProps {
  refundPolicy: string
}

const StayRefundPolicy = ({ refundPolicy }: StayRefundPolicyProps) => {
  return (
    <div className={cx('container')}>
      <Title
        title="취소 및 환불 규정"
        subTitle=""
        className={cx('stayTitle')}
      />
      <ul className={cx('infoList')}>
        <li>
          {refundPolicy
            ? refundPolicy
            : '객실별 취소 정책이 상이하니 객실 상세정보에서 확인해주세요.'}
        </li>
      </ul>
    </div>
  )
}

export default StayRefundPolicy
