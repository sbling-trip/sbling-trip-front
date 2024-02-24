import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ListRow from '@components/shared/ListRow'
import IconButton from '@components/shared/IconButton'
import { useAlertContext } from '../../hooks/useAlertContext'
import delimiter from '@utils/delimiter'
import { RootState } from '@redux/store'
import { Stay } from '@models/stay'

import IconWish from '@assets/icon/icon-wish.svg?react'
import IconWishFill from '@assets/icon/icon-wish-fill.svg?react'
import styles from './StayItem.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface StayItemProps {
  stay: Stay
  toggleWish: (staySeq: number, wishState: boolean) => void
}

const StayItem = ({ stay, toggleWish }: StayItemProps) => {
  const { user } = useSelector((state: RootState) => state.user)
  const { openAlert } = useAlertContext()

  const navigate = useNavigate()

  const { staySeq, stayName, formattedAddress, wishState } = stay

  const handleToggleWish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!user) {
      openAlert({
        title: '로그인이 필요합니다.',
        subTitle: '로그인 페이지로 이동하시겠습니까?',
        onConfirmClick: () => navigate('/login'),
        onCancelClick: () => {},
      })
    }
    toggleWish(staySeq, !!wishState)
  }

  return (
    <li className={cx('stayItem')}>
      <Link to={`/stay/${staySeq}`}>
        <ListRow
          as="div"
          className={cx('stayItemInner')}
          mainContent={
            <div className={cx('mainContent')}>
              <img
                src="https://images.unsplash.com/photo-1617596225496-1d9da33a144b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA% 3D%3D"
                alt={`${stayName} 이미지`}
                className={cx('mainContentImg')}
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
          rightContent={
            <div className={cx('rightContent')}>
              <h3>{stayName}</h3>
              <span>{formattedAddress}</span>
              <div className={cx('flexRowContainer')}>
                <strong className={cx('stayPrice')}>{`${delimiter(
                  200000,
                )}원`}</strong>
                <button
                  className={cx('reservationBtn')}
                  onClick={() => {
                    openAlert({
                      title: '로그인이 필요합니다.',
                      onConfirmClick: () => {
                        navigate('/login')
                      },
                    })
                  }}
                >
                  예약하기
                </button>
              </div>
            </div>
          }
        />
      </Link>
    </li>
  )
}

export default StayItem
