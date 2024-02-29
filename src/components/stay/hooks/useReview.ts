import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { setReviews } from '@redux/reviewSlice'
import apiAxios from '@api/apiAxios'
import { Review } from '@models/review'
import { ObjectApiResponse, ListApiResponse } from '@models/api'
import { CustomMeta } from '@models/customMeta'

const PAGE_SIZE = 10

const useReview = (staySeq: number, initialPage: number = 0) => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState<number>(1)

  const dispatch = useDispatch()
  const { reviews } = useSelector((state: RootState) => state.review)

  const fetchReviews = async (pageNum: number) => {
    try {
      const { data } = await apiAxios.get<
        ObjectApiResponse<Review, CustomMeta>
      >(`/review/list?staySeq=${staySeq}&cursor=${pageNum}`)

      const extractedReviews = data.result.payload
      const totalReviewCount = data.result.meta.totalReviewCount
      const totalPages = Math.ceil(totalReviewCount / PAGE_SIZE)

      dispatch(setReviews({ reviews: extractedReviews, totalReviewCount }))
      setCurrentPage(pageNum)
      setTotalPages(totalPages)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const fetchDeleteReview = async (reviewSeq: number) => {
    try {
      await apiAxios.delete<ListApiResponse<Review>>(
        `/review/remove?reviewSeq=${reviewSeq}`,
      )

      await fetchReviews(currentPage)
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  useEffect(() => {
    if (staySeq) {
      fetchReviews(currentPage)
    }
  }, [])

  return {
    fetchReviews,
    fetchDeleteReview,
    reviews,
    currentPage: currentPage + 1,
    totalPages,
  }
}

export default useReview
