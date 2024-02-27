export interface Review {
  reviewSeq: number
  userSeq: number
  roomSeq: number
  roomName: string
  reviewTitle: string
  reviewContent: string
  reviewScore: number
  reviewImageUrlList: string[]
  createdAt: string
  modifiedAt: string
}
