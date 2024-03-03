import { Link } from 'react-router-dom'
import ListRow from '@components/shared/ListRow'
import Carousel from '@components/shared/Carousel'
import IconButton from '@components/shared/IconButton'
import { useAlertContext } from '@hooks/useAlertContext'
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
  const { staySeq, stayName, wishState, address, roomImageUrlList } = wish
  const { openAlert } = useAlertContext()

  const handleToggleWish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    openAlert({
      title: '찜을 해제하시겠습니까?',
      onConfirmClick: () => {
        toggleWish(staySeq, !!wishState)
      },
      onCancelClick: () => {},
    })
  }

  return (
    <li className={cx('wishItem')}>
      <Link to={`/stay/${staySeq}`}>
        <ListRow
          as="div"
          className={cx('wishItemInner')}
          leftContent={
            <div className={cx('leftContent')}>
              <Carousel images={roomImageUrlList} className={cx('carousel')} />
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
