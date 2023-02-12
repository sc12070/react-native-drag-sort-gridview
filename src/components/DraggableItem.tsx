import { MOVEMENT } from '../models'
import React from 'react'
import { Animated, ViewStyle } from 'react-native'
import Reanimated from 'react-native-reanimated'
import styles from './styles'
import useDraggableItemHooks from './useDraggableItemHooks'
import usePanResponderViewHooks from './usePanResponderViewHooks'
import useReanimHooks from './useReanimHooks'
import useMovementHooks from './useMovementHooks'

const DraggableItem = ({
  children,
  style,
  itemWidth,
  itemHeight,
  sectionWidth,
  sectionHeight,
  numColumns,
  isEditing,
  shouldVibrate,
  shouldAnimOnRelease,
  index,
  itemLength,
  isDragging,
  animDirection,
  animMoveDuration,
  startAnim,
  endAnim,
  onStartDrag,
  updateDragToIndex,
  onEndDrag
}: {
  children?: JSX.Element
  itemWidth: number
  itemHeight: number
  sectionWidth: number
  sectionHeight: number
  numColumns: number
  style?: ViewStyle
  isEditing: boolean
  shouldVibrate: boolean
  shouldAnimOnRelease: boolean
  index: number
  itemLength: number
  isDragging: boolean
  animDirection: MOVEMENT
  animMoveDuration: number
  startAnim: () => void
  endAnim: () => void
  onStartDrag: (index: number) => void
  updateDragToIndex: (index: number | undefined) => void
  onEndDrag: (from: number, to: number) => void
}) => {
  const { isDraggingItem } = useDraggableItemHooks({
    animDirection
  })

  const { animatedStyles } = useReanimHooks({
    isEditing,
    shouldVibrate
  })

  const { moveXAnim, moveYAnim } = useMovementHooks({
    itemWidth,
    itemHeight,
    numColumns,
    isEditing,
    shouldVibrate,
    isDragging,
    isDraggingItem,
    index,
    animDirection,
    animMoveDuration,
    startAnim,
    endAnim
  })

  const { panResponder, dragXAnim, dragYAnim } = usePanResponderViewHooks({
    itemWidth,
    itemHeight,
    sectionWidth,
    sectionHeight,
    numColumns,
    index,
    itemLength,
    isEditing,
    animMoveDuration,
    shouldAnimOnRelease,
    startAnim,
    endAnim,
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
              translateX: isDraggingItem ? dragXAnim : moveXAnim
            },
            {
              translateY: isDraggingItem ? dragYAnim : moveYAnim
            }
          ]
        },
        isDraggingItem && styles.dragging
      ]}>
      <Reanimated.View
        {...panResponder.panHandlers}
        style={[styles.reanimatedWrapper, animatedStyles]}>
        {children}
      </Reanimated.View>
    </Animated.View>
  )
}

export default DraggableItem
