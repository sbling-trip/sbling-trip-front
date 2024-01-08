import { useCallback, useEffect, useRef } from 'react'
import useStayList from '@components/stayList/hooks/useStayList'
import StayItem from '@components/stayList/stayItem'

import classNames from 'classnames/bind'
import styles from './StayList.module.scss'

const cx = classNames.bind(styles)

const StayListPage = () => {
  const { stays, loadMore } = useStayList()
  const observerRef = useRef<HTMLLIElement | null>(null)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && target.intersectionRatio > 0) {
        loadMore()
      }
    },
    [loadMore],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    })

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [observerRef, handleObserver])

  if (!stays) {
    return <div>Loading</div>
  }

  const ObserverPlaceholder = () => (
    <li
      ref={observerRef}
      style={{
        width: '100%',
        height: '10px',
        backgroundColor: 'pink',
      }}
    ></li>
  )

  return (
    <main>
      <div className={cx('stayListContainer')}>
        <ul className={cx('stayItemWrap')}>
          {stays.length > 0 &&
            stays.map((stay, index) => [
              <StayItem stay={stay} key={stay.staySeq} />,
              index === stays.length - 1 && (
                <ObserverPlaceholder key={`observer-${index}`} />
              ),
            ])}
        </ul>
      </div>
    </main>
  )
}

export default StayListPage
