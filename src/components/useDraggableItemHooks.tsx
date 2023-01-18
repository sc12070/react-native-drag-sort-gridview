import { useMemo } from 'react'

export default ({
  index,
  dragItemOriginIndex
}: {
  index: number | undefined
  dragItemOriginIndex: number | undefined
}) => {
  const isDragging = useMemo(() => index === dragItemOriginIndex, [index, dragItemOriginIndex])

  return {
    isDragging
  }
}
