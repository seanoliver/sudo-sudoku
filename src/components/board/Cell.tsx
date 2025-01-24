import { useKeyboardNavigation } from '@/utils/hooks/useKeyboardNavigation'

interface CellProps {
  value: number
  colIndex: number
  rowIndex: number
  isPreFilled?: boolean
  isValid?: boolean
  isFocused?: boolean
  onFocus?: () => void
  onChange?: (value: number) => void
}

interface CellStyleProps {
  isPreFilled?: boolean
  isValid?: boolean
  isFocused?: boolean
}

export const Cell = ({
  value,
  colIndex,
  rowIndex,
  isPreFilled,
  isValid,
  isFocused,
}: CellProps) => {
  const onKeyDown = useKeyboardNavigation(rowIndex, colIndex)

  const getCellStyles = ({
    isPreFilled,
    isValid,
    isFocused,
  }: CellStyleProps) => {
    return `
      ${isPreFilled ? 'bg-gray-100' : 'bg-white'}
      ${isValid ? '' : 'border-red-500 text-red-500'}
      ${isFocused ? 'border-4 border-blue-500' : 'border-1 border-gray-300'}
    `
  }

  const getBorderStyles = (colIndex: number, rowIndex: number) => {
    return `
      ${colIndex === 0 ? '' : 'border-l'}
      ${colIndex % 3 === 0 && colIndex !== 0 ? 'border-l-2 border-l-gray-800' : 'border-l-1 border-l-gray-300'}
      ${rowIndex === 0 ? '' : 'border-t'} 
      ${rowIndex % 3 === 0 && rowIndex !== 0 ? 'border-t-2 border-t-gray-800' : 'border-t-1 border-t-gray-300'}
    `
  }

  return (
    <div
      className={`
      relative w-12 h-12
      flex items-center justify-center
      text-xl font-medium
      ${getBorderStyles(colIndex, rowIndex)}
      ${getCellStyles({ isPreFilled, isValid, isFocused })}
    `}
    >
      <div
        key={colIndex}
        tabIndex={0}
        data-position={`${rowIndex},${colIndex}`}
        onKeyDown={onKeyDown}
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
    </div>
  )
}
