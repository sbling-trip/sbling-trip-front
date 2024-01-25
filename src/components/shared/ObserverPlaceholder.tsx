import { useEffect, useCallback } from 'react'

interface ObserverPlaceholderProps {
  observerRef: React.RefObject<HTMLLIElement>
  onLoadMore: () => void
}

const ObserverPlaceholder = ({
  observerRef,
  onLoadMore,
}: ObserverPlaceholderProps) => {
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && target.intersectionRatio >= 0) {
        onLoadMore()
      }
    },
    [onLoadMore],
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

  return (
    <li
      ref={observerRef}
      style={{
        width: '100%',
        height: '10px',
      }}
    />
  )
}

export default ObserverPlaceholder
