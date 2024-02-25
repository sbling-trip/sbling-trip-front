import { Link } from 'react-router-dom'
import ListRow from '@components/shared/ListRow'
import IconButton from '@components/shared/IconButton'
import { Wish } from '@models/wish'

import IconWishFill from '@assets/icon/icon-wish-fill.svg?react'
import IconWish from '@assets/icon/icon-wish.svg?react'
import classNames from 'classnames/bind'
import styles from './WishItem.module.scss'

const cx = classNames.bind(styles)

interface WishItemProps {
  wish: Wish
  toggleWish: (staySeq: number, wishState: boolean) => void
}

const WishItem = ({ wish, toggleWish }: WishItemProps) => {
  const { staySeq, stayName, wishState, address } = wish

  const handleToggleWish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleWish(staySeq, !!wishState)
  }

  return (
    <li className={cx('wishItem')}>
      <Link to={`/stay/${staySeq}`}>
        <ListRow
          as="div"
          className={cx('wishItemInner')}
          leftContent={
            <div className={cx('leftContent')}>
              <img
                src="https://images.unsplash.com/photo-1617596225496-1d9da33a144b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA% 3D %3D"
                alt={`${stayName} 이미지`}
                className={cx('leftContentImg')}
              />
              <div className={cx('wishBtn')}>
                <IconButton
                  label={wishState ? '찜 취소' : '찜하기'}
                  iconComponent={wishState ? IconWishFill : IconWish}
                  onClick={handleToggleWish}
                />
              </div>
            </div>
          }
          mainContent={
            <div className={cx('mainContent')}>
              <h3>{stayName}</h3>
              <span>{address}</span>
            </div>
          }
        />
      </Link>
    </li>
  )
}

export default WishItem
