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
  const prevPageDisabled = currentPage === initialPage || currentPage <= 4
  const nextPageDisabled = Math.ceil(currentPage / 5) * 5 >= totalPages

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

  const fetchAddReview = async (
    staySeq: number,
    roomSeq: number,
    reviewTitle: string,
    reviewContent: string,
    reviewScore: number,
  ) => {
    try {
      await apiAxios.post<ListApiResponse<Review>>(
        `/review/add?staySeq=${staySeq}&roomSeq=${roomSeq}&reviewTitle=${reviewTitle}&reviewContent=${reviewContent}&reviewScore=${reviewScore}`,
        {},
      )

      await fetchReviews(currentPage)
    } catch (error) {
      console.error('Error adding review:', error)
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

  const fetchEditReview = async (
    reviewSeq: number,
    reviewTitle: string,
    reviewContent: string,
    reviewScore: number,
  ) => {
    await apiAxios.put(
      `/review/update?reviewSeq=${reviewSeq}&reviewTitle=${reviewTitle}&reviewContent=${reviewContent}&reviewScore=${reviewScore}`,
      {},
    )

    await fetchReviews(currentPage)
  }

  const prevPageReviews = async () => {
    const startPage = Math.max(Math.floor((currentPage - 1) / 5) * 5 + 1, 1)
    const prevPage = currentPage - 5 >= 1 ? startPage - 6 : 0
    await fetchReviews(prevPage)
  }

  const nextPageReviews = async () => {
    const startPage = Math.max(Math.floor((currentPage - 1) / 5) * 5 + 1, 1)
    const nextPage = Math.min(startPage + 4, totalPages)
    await fetchReviews(nextPage)
  }

  const handlePageClick = (pageNumber: number) => {
    fetchReviews(pageNumber - 1)
  }

  useEffect(() => {
    if (staySeq) {
      fetchReviews(currentPage)
    }
  }, [])

  return {
    fetchReviews,
    fetchAddReview,
    fetchDeleteReview,
    fetchEditReview,
    prevPageReviews,
    nextPageReviews,
    handlePageClick,
    prevPageDisabled,
    nextPageDisabled,
    reviews,
    currentPage: currentPage + 1,
    totalPages,
  }
}

export default useReview
