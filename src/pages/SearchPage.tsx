import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Title from '@components/shared/Title'
import SearchBar from '@components/search/searchBar/SearchBar'
import StayItem from '@components/stayList/StayItem'
import useStayList from '@components/stayList/hooks/useStayList'
import { RootState } from '@redux/store'
import { setSearch } from '@redux/searchSlice'

import classNames from 'classnames/bind'
import styles from './SearchPage.module.scss'

const cx = classNames.bind(styles)

const SearchPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { searchResultStays } = useSelector((state: RootState) => state.stay)
  const { handleToggleWish } = useStayList()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const requestData = {
      checkInDate: searchParams.get('checkInDate') || '',
      checkOutDate: searchParams.get('checkOutDate') || '',
      adultGuestCount: parseInt(searchParams.get('adultGuestCount') || '0'),
      childGuestCount: parseInt(searchParams.get('childGuestCount') || '0'),
    }
    dispatch(setSearch(requestData))
  }, [location, dispatch])

  return (
    <main>
      <SearchBar />
      <div className={cx('searchResultContainer')}>
        <Title
          title="숙소 검색 결과"
          subTitle=""
          className={cx('resultTitle')}
        />
        {searchResultStays.length === 0 ? (
          <p className={cx('noSearchResultMsg')}>
            해당하는 검색 결과가 없습니다.
          </p>
        ) : (
          <ul className={cx('resultList')}>
            {searchResultStays.map((stay, index) => (
              <StayItem
                stay={stay}
                key={index}
                toggleWish={handleToggleWish}
                to={`/stay/${stay.staySeq}${location.search}`}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}

export default SearchPage
