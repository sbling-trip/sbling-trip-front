export interface Reservation {
  reservationSeq: number
  staySeq: number
  roomSeq: number
  stayName: string
  roomName: string
  checkInDate: string
  checkOutDate: string
  adultGuestCount: number
  childGuestCount: number
  paymentPrice: number
  specialRequests: string
  bookingDate: string
  paymentStatus: string
  reservationStatus: string
}
