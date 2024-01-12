import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import StayItem from '@components/stayList/StayItem'
import useStayList from '@components/stayList/hooks/useStayList'

import IconSearch from '@assets/icon/icon-search.svg?react'
import classNames from 'classnames/bind'
import styles from './SearchPage.module.scss'

const cx = classNames.bind(styles)

const SearchPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const initialSearchQuery = queryParams.get('query') || ''

  const [searchTerm, setSearchTerm] = useState(initialSearchQuery)

  const { stays } = useStayList()

  const filteredStays = stays.filter(
    (stay) =>
      stay.stayName.includes(searchTerm) || stay.address.includes(searchTerm),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/search?query=${searchTerm}`)
    }
  }

  const renderNoResult = () => (
    <div className={cx('noResult')}>
      <h3>검색 결과가 없습니다.</h3>
    </div>
  )

  const renderSearchResults = () => (
    <ul className={cx('stayItemWrap')}>
      {filteredStays.map((stay) => (
        <StayItem stay={stay} key={stay.staySeq} />
      ))}
    </ul>
  )

  return (
    <main>
      <div className={cx('searchContainer')}>
        <div className={cx('searchHeader')}>
          <div className={cx('searchHeaderInner')}>
            <div className={cx('searchIcon')}>
              <IconSearch width={30} height={30} fill="var(--blue400)" />
            </div>
            <input
              type="text"
              placeholder="원하는 숙소 혹은 지역을 검색해보세요."
              className={cx('searchInput')}
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        {searchTerm !== '' && (
          <div className={cx('searchResults')}>
            {filteredStays.length === 0
              ? renderNoResult()
              : renderSearchResults()}
          </div>
        )}
      </div>
    </main>
  )
}

export default SearchPage
