export const Cell = ({ value }: { value: number }) => {
  const bgColor = value ? 'bg-gray-100' : 'white'

  return (
    <div className={`w-12 h-12 ${bgColor} flex items-center justify-center`}>
      {value || ''}
    </div>
  )
}
