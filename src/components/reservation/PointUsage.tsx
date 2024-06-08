import Title from '@components/shared/Title'
import ListRow from '@components/shared/ListRow'
import delimiter from '@utils/delimiter'

import classNames from 'classnames/bind'
import styles from './PointUsage.module.scss'

const cx = classNames.bind(styles)

interface PointUsageProps {
  formData: {
    point: number
  }
  usedPoints: number
  handlePointsInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleClickUseAllPoints: () => void
}

const PointUsage = ({
  formData,
  usedPoints,
  handlePointsInputChange,
  handleClickUseAllPoints,
}: PointUsageProps) => {
  const { point } = formData

  return (
    <section className={cx('sectionContainer')}>
      <Title title="포인트 사용" subTitle="" className={cx('sectionTitle')} />
      <ListRow
        as="div"
        className={cx('myPoints')}
        mainContent={
          <div className={cx('mainContent')}>
            <span>보유 포인트</span>
            <strong>{`${delimiter(point)}원`}</strong>
          </div>
        }
        rightContent={
          <div className={cx('rightContent')}>
            <div className={cx('pointInputBox')}>
              <input
                type="number"
                step={1000}
                min="1000"
                max={point}
                value={usedPoints}
                onChange={handlePointsInputChange}
                className={cx('pointInput')}
              />
              <span>원</span>
            </div>
            <button
              type="button"
              className={cx('pointBtn')}
              onClick={handleClickUseAllPoints}
              aria-label="포인트 사용 버튼"
            >
              모두 사용
            </button>
          </div>
        }
      />
    </section>
  )
}

export default PointUsage
