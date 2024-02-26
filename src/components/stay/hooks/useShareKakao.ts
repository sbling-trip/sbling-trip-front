import { useCallback } from 'react'

interface shareKakaoProps {
  title: string
  description: string
  imageUrl: string
  btnLabel: string
}

const useShareKakao = () => {
  const handleShare = useCallback(
    ({ title, description, imageUrl, btnLabel }: shareKakaoProps) => {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: btnLabel,
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      })
    },
    [],
  )

  return handleShare
}

export default useShareKakao
