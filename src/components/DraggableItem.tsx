import React from 'react'
import { Animated } from 'react-native'
import Reanimated from 'react-native-reanimated'
import styles from './styles'
import useDraggableItemHooks from './useDraggableItemHooks'
import usePanResponderViewHooks from './usePanResponderViewHooks'
import useReanimHooks from './useReanimHooks'

const DraggableItem = ({
  children,
  style,
  itemWidth,
  itemHeight,
  numColumns,
  isEditing,
  index,
  dragItemOriginIndex,
  dragItemTargetIndex,
  animMoveDuration,
  onStartDrag,
  updateDragToIndex,
  onEndDrag
}: {
  children?: JSX.Element
  itemWidth: number
  itemHeight: number
  numColumns: number
  style: any
  isEditing: boolean
  index: number
  dragItemOriginIndex: number | undefined
  dragItemTargetIndex: number | undefined
  animMoveDuration: number
  onStartDrag: (index: number) => void
  updateDragToIndex: (index: number | undefined) => void
  onEndDrag: (from: number, to: number) => void
}) => {
  const { isDragging } = useDraggableItemHooks({
    index,
    dragItemOriginIndex
  })

  const { animatedStyles } = useReanimHooks({
    itemWidth,
    itemHeight,
    numColumns,
    isEditing,
    isDragging,
    index,
    dragItemOriginIndex,
    dragItemTargetIndex,
    animMoveDuration
  })

  const { panResponder, dragXAnim, dragYAnim } = usePanResponderViewHooks({
    itemWidth,
    itemHeight,
    numColumns,
    index,
    isEditing,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  })

  return (
    <Animated.View
      style={[
        style,
        styles.wrapper,
        {
          width: itemWidth,
          height: itemHeight
        },
        {
          transform: [
            {
              translateX: dragXAnim
            },
            {
              translateY: dragYAnim
            }
          ]
        },
        isDragging && styles.dragging
      ]}>
      <Reanimated.View {...panResponder.panHandlers} style={animatedStyles}>
        {children}
      </Reanimated.View>
    </Animated.View>
  )
}

export default DraggableItem
