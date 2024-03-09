import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import IconButton from '@components/shared/IconButton'
import useShareKakao from '@components/stay/hooks/useShareKakao'
import { useAlertContext } from '../../../hooks/useAlertContext'
import { RootState } from '@redux/store'

import IconLink from '@assets/icon/icon-link.svg?react'
import IconKakao from '@assets/icon/icon-kakao.svg?react'
import IconWish from '@assets/icon/icon-wish.svg?react'
import IconWishFill from '@assets/icon/icon-wish-fill.svg?react'

interface SocialButtonProps {
  staySeq: string
  stayName: string
  mainImgUrl: string
  description: string
  wishState: boolean
  toggleWish: (staySeq: number, wishState: boolean) => void
}

const SocialButton = ({
  staySeq,
  stayName,
  mainImgUrl,
  description,
  wishState,
  toggleWish,
}: SocialButtonProps) => {
  const { user } = useSelector((state: RootState) => state.user)
  const { openAlert } = useAlertContext()
  const navigate = useNavigate()
  const share = useShareKakao()

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('링크가 복사되었습니다.')
    } catch (error) {
      console.log(error)
    }
  }

  const handleToggleWish = () => {
    if (!user) {
      openAlert({
        title: '로그인이 필요합니다.',
        subTitle: '로그인 페이지로 이동하시겠습니까?',
        onConfirmClick: () => navigate('/login'),
        onCancelClick: () => {},
      })
    }
    toggleWish(parseInt(staySeq, 10), !!wishState)
  }

  return (
    <>
      <IconButton
        label={wishState ? '찜 취소' : '찜하기'}
        iconComponent={wishState ? IconWishFill : IconWish}
        onClick={handleToggleWish}
      />
      <IconButton
        label="공유하기"
        iconComponent={IconKakao}
        onClick={() => {
          share({
            title: stayName,
            description,
            imageUrl: mainImgUrl,
            btnLabel: '확인하기',
          })
        }}
      />
      <IconButton
        label="링크 복사"
        iconComponent={IconLink}
        onClick={() => handleCopyClipBoard(window.location.href)}
      />
    </>
  )
}

export default SocialButton
