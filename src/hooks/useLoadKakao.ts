import { useEffect } from 'react'

const useLoadKakao = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js'
    script.async = true

    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        try {
          window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY)
        } catch (error) {
          console.error('Error initializing Kakao:', error)
        }
      }
    }

    script.onerror = (error) => {
      console.error('Error loading Kakao SDK:', error)
    }

    document.head.appendChild(script)
  }, [])
}

export default useLoadKakao
