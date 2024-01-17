import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import StayItem from '@components/stayList/StayItem'
import useStayList from '@components/stayList/hooks/useStayList'
import useDebounce from '@components/search/hooks/useDebounce'

import IconSearch from '@assets/icon/icon-search.svg?react'
import IconClose from '@assets/icon/icon-close.svg?react'
import classNames from 'classnames/bind'
import styles from './SearchPage.module.scss'

const cx = classNames.bind(styles)

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const initialSearchQuery = searchParams.get('query') || ''
  const [query, setQuery] = useState<string>(initialSearchQuery)
  const debouncedQuery = useDebounce(query, 300)

  const navigate = useNavigate()

  const { stays } = useStayList()

  const filteredStays = stays.filter(
    (stay) =>
      stay.stayName.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      stay.address.toLowerCase().includes(debouncedQuery.toLowerCase()),
  )

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && debouncedQuery.trim() !== '') {
      searchParams.set('query', debouncedQuery)
      navigate(`/search?query=${debouncedQuery}`)
    }
  }

  const handleQueryClear = () => {
    setQuery('')
    searchParams.delete('query')
    navigate(`/search`)
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
              value={query}
              onChange={handleQueryChange}
              onKeyDown={handleSearchKeyDown}
            />
            {query !== '' && (
              <button
                type="button"
                className={cx('clearBtn')}
                onClick={handleQueryClear}
              >
                <IconClose width={30} height={30} />
              </button>
            )}
          </div>
        </div>
        {query !== '' && (
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
