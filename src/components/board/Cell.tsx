export const Cell = ({
  value,
  colIndex,
  rowIndex,
}: {
  value: number
  colIndex: number
  rowIndex: number
}) => {
  const bgColor = value ? 'bg-gray-100' : 'white'

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let nextCell: HTMLDivElement | null = null

    switch (e.key) {
      case 'ArrowUp':
        nextCell = document.querySelector(
          `[data-position="${rowIndex - 1},${colIndex}"]`,
        )
        break
      case 'ArrowDown':
        nextCell = document.querySelector(
          `[data-position="${rowIndex + 1},${colIndex}"]`,
        )
        break
      case 'ArrowLeft':
        nextCell = document.querySelector(
          `[data-position="${rowIndex},${colIndex - 1}"]`,
        )
        break
      case 'ArrowRight':
        nextCell = document.querySelector(
          `[data-position="${rowIndex},${colIndex + 1}"]`,
        )
        break
    }

    if (nextCell) {
      e.preventDefault()
      nextCell.focus()
    }
  }

  return (
    <CellWrapper colIndex={colIndex} rowIndex={rowIndex} bgColor={bgColor}>
      <div
        key={colIndex}
        tabIndex={0}
        data-position={`${rowIndex},${colIndex}`}
        onKeyDown={handleKeyDown}
        className={`
      w-12 h-12
      flex items-center justify-center
      text-xl font-medium
      focus:outline-none
      focus:ring-4
      focus:ring-offset-2
      focus:z-10
      focus:ring-blue-500
      rounded-md
      `}
      >
        {value || ''}
      </div>
    </CellWrapper>
  )
}

const CellWrapper = ({
  children,
  colIndex,
  rowIndex,
  bgColor,
}: {
  children: React.ReactNode
  colIndex: number
  rowIndex: number
  bgColor: string
}) => {
  return (
    <div
      className={`
        relative w-12 h-12
        ${bgColor}
        flex items-center justify-center
        text-xl font-medium
      focus:ring-blue-500
        ${colIndex === 0 ? '' : 'border-l'}
        ${colIndex % 3 === 0 && colIndex !== 0 ? 'border-l-2 border-l-gray-800' : 'border-l-1 border-l-gray-300'}
        ${rowIndex === 0 ? '' : 'border-t'} 
        ${rowIndex % 3 === 0 && rowIndex !== 0 ? 'border-t-2 border-t-gray-800' : 'border-t-1 border-t-gray-300'}
      `}
    >
      {children}
    </div>
  )
}
