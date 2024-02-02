export interface Room {
  roomSeq: number
  staySeq: number
  stayName: string
  stayType: number
  roomName: string
  roomType: number
  roomPrice: number
  roomAvailableCount: number
  roomImageUrlList: [string]
  ottService: [string]
  toiletOption: [string]
  roomOption: [string]
  specialRoomOption: [string]
}
