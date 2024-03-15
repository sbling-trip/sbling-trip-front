import { useSelector } from 'react-redux'
import SearchBar from '@components/search/searchBar/SearchBar'
import { RootState } from '@redux/store'

import classNames from 'classnames/bind'
import styles from './SearchPage.module.scss'

const cx = classNames.bind(styles)

const SearchPage = () => {
  const { stays } = useSelector((state: RootState) => state.stay)

  return (
    <main>
      <SearchBar />
      <div className={cx('searchResultContainer')}>
        <ul className={cx('resultList')}>
          {stays.map((stay, index) => (
            <li key={index}>
              <p>{stay.stayName}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default SearchPage
