import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentStay } from '@redux/staySlice'
import { Stay } from '@models/stay'

import IconLink from '@assets/icon/icon-link.svg?react'
import IconKakao from '@assets/icon/icon-kakao.svg?react'
import IconLike from '@assets/icon/icon-like.svg?react'
import IconLikeFill from '@assets/icon/icon-like-fill.svg?react'

import classNames from 'classnames/bind'
import styles from './SocialButton.module.scss'

const cx = classNames.bind(styles)

const SocialButton = ({ stay }: { stay: Stay }) => {
  const dispatch = useDispatch()

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('링크가 복사되었습니다.')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (stay) {
      dispatch(setCurrentStay(stay))
    }
  }, [stay, dispatch])

  return (
    <div className={cx('socialButtons')}>
      <Button
        label="찜하기"
        iconComponent={IconLikeFill || IconLike}
        onClick={() => {}}
      />
      <Button label="공유하기" iconComponent={IconKakao} onClick={() => {}} />
      <Button
        label="링크 복사"
        iconComponent={IconLink}
        onClick={() => handleCopyClipBoard(window.location.href)}
      />
    </div>
  )
}
const Button = ({
  label,
  iconComponent: IconComponent,
  onClick,
  fill,
}: {
  label: string
  iconComponent: React.ElementType
  onClick?: () => void
  fill?: string
  iconWidth?: number
  iconHeight?: number
}) => {
  return (
    <button type="button" onClick={onClick} className={cx('btn')}>
      <IconComponent width={35} height={35} fill={fill} />
      <small>{label}</small>
    </button>
  )
}
export default SocialButton
