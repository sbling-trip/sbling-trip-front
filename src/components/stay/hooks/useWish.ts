import apiClientAxios from '@api/apiClientAxios'

const useWish = () => {
  const toggleWishOnServer = async (staySeq: number, wishState: boolean) => {
    try {
      if (wishState) {
        await apiClientAxios.delete(`/wish/remove?staySeq=${staySeq}`)
      } else {
        await apiClientAxios.post(`/wish/add?staySeq=${staySeq}`)
      }

      return true
    } catch (error) {
      console.error('Failed to update wish state:', error)
    }
  }

  return {
    toggleWishOnServer,
  }
}

export default useWish
