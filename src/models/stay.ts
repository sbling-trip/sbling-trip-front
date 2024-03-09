export interface Stay {
  staySeq: number
  stayName: string
  address: string
  originalAddress: string
  formattedAddress: string
  checkInTime: string
  checkOutTime: string
  description: string
  latitude: number
  longitude: number
  refundPolicy: string
  facilitiesDetail: string
  foodBeverageArea: string
  wishState: boolean
  reviewCount: number
  reviewScoreAverage: number
  roomImageUrlList: string[]
  manager: string
  contactNumber: string
  homepageUrl: string
  parkingAvailable: boolean
  minimumRoomPrice: number
}

export enum StayType {
  Motel = 1,
  Hotel = 2,
  Pension = 3,
  GuestHouse = 4,
}
