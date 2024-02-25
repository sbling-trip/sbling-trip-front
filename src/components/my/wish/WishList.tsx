import Title from '@components/shared/Title'
import WishItem from './WishItem'
import useStayList from '@components/stayList/hooks/useStayList'

import classNames from 'classnames/bind'
import styles from './WishList.module.scss'

const cx = classNames.bind(styles)

const WishList = () => {
  const { stays, toggleWish } = useStayList()
  const wishStays = stays.filter((stay) => stay.wishState).reverse()

  return (
    <div className={cx('wishListContainer')}>
      <Title title="찜한 숙소" subTitle="" className={cx('wishTitle')} />
      <ul className={cx('wishList')}>
        {wishStays.map((wish) => (
          <WishItem key={wish.staySeq} wish={wish} toggleWish={toggleWish} />
        ))}
      </ul>
    </div>
  )
}

export default WishList
