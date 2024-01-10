interface ListRowProps {
  leftContent?: React.ReactNode
  mainContent?: React.ReactNode
  rightContent?: React.ReactNode
  className?: string
  as?: 'div' | 'li'
}

const ListRow = ({
  leftContent,
  mainContent,
  rightContent,
  className,
  as: Element = 'li',
}: ListRowProps) => {
  return (
    <Element className={className}>
      {leftContent ? leftContent : ''}
      {mainContent}
      {rightContent ? rightContent : ''}
    </Element>
  )
}

export default ListRow
