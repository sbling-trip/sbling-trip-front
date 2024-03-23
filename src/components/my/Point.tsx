import Title from '@components/shared/Title'
import useUserPoint from '@hooks/useUserPoint'
import delimiter from '@utils/delimiter'

import classNames from 'classnames/bind'
import styles from './Point.module.scss'

const cx = classNames.bind(styles)

const Point = () => {
  const { points } = useUserPoint()
  const { point } = points || {}
  const myPoint = point || 0

  if (!point) {
    return <p>포인트가 없습니다.</p>
  }

  return (
    <div className={cx('pointContainer')}>
      <Title title="포인트" subTitle="" className={cx('pointTitle')} />
      <div className={cx('myPointBox')}>
        <div className={cx('myPoints')}>
          <h3>보유 포인트</h3>
          <strong className={cx('point')}>{`${delimiter(myPoint)}P`}</strong>
        </div>
        <hr />
        <div className={cx('expireInfo')}>
          <span>
            30일 이내 소멸 예정 포인트:
            <strong className={cx('expirePoint')}>0 P</strong>
          </span>
        </div>
        <div className={cx('notice')}>
          <ul>
            <li>적립된 포인트는 숙소 예약 시 현금처럼 사용할 수 있습니다.</li>
            <li>
              단, Sbling Trip 내 일부 특가 또는 할인 이벤트 진행 중인 숙소 예약
              시에는 사용하실 수 없습니다.
            </li>
            <li>
              포인트는 적립일에 따라 유효기간이 다르며, 유효기간 내에 사용되지
              않은 포인트는 자동 소멸합니다.
            </li>
            <li>
              지급된 포인트는 본인만 사용 가능하며 타인에게 양도할 수 없습니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Point
