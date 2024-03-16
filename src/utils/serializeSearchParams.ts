interface RequestData {
  checkInDate: string
  checkOutDate: string
  adultGuestCount: number
  childGuestCount: number
}

/**
 * 검색 파라미터 문자열을 생성하는 함수입니다.
 * @param data 요청 데이터 객체
 * @returns 생성된 검색 파라미터 문자열
 */
export const serializeSearchParams = (data: RequestData): string => {
  const searchParams = new URLSearchParams()

  Object.entries(data).forEach(([key, value]) => {
    if (value !== '') {
      searchParams.append(key, String(value))
    }
  })

  return searchParams.toString()
}
