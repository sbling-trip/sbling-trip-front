import { Helmet } from 'react-helmet-async'

interface MetaDataProps {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogUrl?: string
  ogSiteName?: string
  ogType?: string
  ogLocale?: string
}

const MetaData = ({
  title = 'Sbling Trip | 호텔, 리조트, 모텔, 펜션, 게스트하우스, 숙소 예약',
  description = 'Sbling Trip | 여행 숙소 예약은 Sbling Trip과 함께하세요. (호텔, 리조트, 모텔, 펜션, 게스트하우스 예약)',
  keywords = '여행, 호텔, 리조트, 모텔, 펜션, 게스트하우스, 숙소, 예약',
  ogTitle = 'Sbling Trip',
  ogDescription = 'Sbling Trip | 여행 숙소 예약은 Sbling Trip과 함께하세요. (호텔, 리조트, 모텔, 펜션, 게스트하우스 예약)',
  ogUrl = 'https://www.sbling-trip.click',
  ogSiteName = 'Sbling Trip',
  ogType = 'website',
  ogLocale = 'ko-KR',
}: MetaDataProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:description" content={ogDescription} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta
        name="google-site-verification"
        content="EjNSbfJVqMy_6wUY5FPlECg4llgaVR5kzsQsq-0"
      />
    </Helmet>
  )
}

export default MetaData
