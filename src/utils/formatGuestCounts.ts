/**
 * 성인과 어린이 인원 수를 받아 포맷팅된 문자열을 반환합니다.
 * @param {number} adultCount 성인 인원수
 * @param {number} childCount 어린이 인원수
 * @returns {string} 포맷팅된 문자열
 */
export const formatGuestCounts = (
  adultCount: number,
  childCount: number,
): string => {
  const parts = []

  if (adultCount > 0) {
    parts.push(`성인 ${adultCount}명`)
  }

  if (childCount > 0) {
    parts.push(`어린이 ${childCount}명`)
  }

  return parts.join(', ')
}
