import Title from '@components/shared/Title'
import StayList from '@components/stayList/StayList'

import classNames from 'classnames/bind'
import styles from './MainPage.module.scss'

const cx = classNames.bind(styles)

const MainPage = () => {
  return (
    <main>
      <section className={cx('mainHeader')}>
        <div className={cx('mainHeaderInner')}>
          <Title
            title="인기 감성 숙소"
            subTitle=""
            className={cx('mainHeaderTitle')}
          />
        </div>
      </section>
      <StayList />
    </main>
  )
}

export default MainPage
