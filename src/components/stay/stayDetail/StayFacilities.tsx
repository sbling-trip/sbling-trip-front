import Title from '@components/shared/Title'

import classNames from 'classnames/bind'
import styles from './StayFacilities.module.scss'

const cx = classNames.bind(styles)

interface StayFacilitiesProps {
  facilitiesDetail: string
  foodBeverageArea: string
}

const StayFacilities = ({
  facilitiesDetail,
  foodBeverageArea,
}: StayFacilitiesProps) => {
  return (
    <div className={cx('container')}>
      <Title
        title="숙소 시설 및 서비스"
        subTitle=""
        className={cx('stayTitle')}
      />
      <ul className={cx('infoList')}>
        {facilitiesDetail && <li>{facilitiesDetail}</li>}
        {foodBeverageArea && <li>{foodBeverageArea}</li>}
      </ul>
    </div>
  )
}

export default StayFacilities
