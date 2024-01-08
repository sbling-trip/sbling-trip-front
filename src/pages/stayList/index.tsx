import useStayList from '@components/stayList/hooks/useStayList'

import classNames from 'classnames/bind'
import styles from './StayList.module.scss'

const cx = classNames.bind(styles)

const StayListPage = () => {
  const { stays } = useStayList()

  return (
    <main>
      <div className={cx('stayListContainer')}>
        <ul className={cx('stayItemWrap')}>
          {stays.length > 0 &&
            stays.map((stay) => <li key={stay.staySeq}></li>)}
        </ul>
      </div>
    </main>
  )
}

export default StayListPage
