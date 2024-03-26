import { MOVEMENT } from '../models'
import { useMemo } from 'react'

export default ({ animDirection, isRTL }: { animDirection: MOVEMENT; isRTL: boolean }) => {
  const isDraggingItem = useMemo(() => animDirection === MOVEMENT.dragging, [animDirection])
  const multiplierRTL = useMemo(() => (isRTL ? -1 : 1), [isRTL])

  return {
    isDraggingItem,
    multiplierRTL
  }
}
