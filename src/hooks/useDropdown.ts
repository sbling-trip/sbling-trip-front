import { useEffect, useRef, useState } from 'react'

const useDropdown = (
  initialState = false,
): [boolean, () => void, React.RefObject<HTMLDivElement>] => {
  const [isDropdownOpen, setDropdownOpen] = useState(initialState)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setDropdownOpen((prev) => !prev)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return [isDropdownOpen, toggleDropdown, dropdownRef]
}

export default useDropdown
