import { MOVEMENT } from '../models'
import { useMemo } from 'react'

export default ({ animDirection }: { animDirection: MOVEMENT }) => {
  const isDraggingItem = useMemo(() => animDirection === MOVEMENT.dragging, [animDirection])

  return {
    isDraggingItem
  }
}
