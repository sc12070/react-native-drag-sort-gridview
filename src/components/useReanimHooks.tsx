import { MOVEMENT } from '../models'
import { useCallback, useEffect } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated'

export default ({
  itemWidth,
  itemHeight,
  numColumns,
  isEditing,
  shouldVibrate,
  isDragging,
  isDraggingItem,
  index,
  animDirection,
  animMoveDuration
}: {
  itemWidth: number
  itemHeight: number
  numColumns: number
  isEditing: boolean
  shouldVibrate: boolean
  isDragging: boolean
  isDraggingItem: boolean
  index: number
  animDirection: MOVEMENT
  animMoveDuration: number
}) => {
  const movementOffset = useSharedValue({ x: 0, y: 0 })
  const rotationOffset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [
        {
          translateX:
            !isDragging || isDraggingItem
              ? movementOffset.value.x
              : withTiming(movementOffset.value.x, {
                  duration: animMoveDuration,
                  easing: Easing.out(Easing.exp)
                })
        },
        {
          translateY:
            !isDragging || isDraggingItem
              ? movementOffset.value.y
              : withTiming(movementOffset.value.y, {
                  duration: animMoveDuration,
                  easing: Easing.out(Easing.exp)
                })
        },
        { rotateZ: `${rotationOffset.value}deg` }
      ]
    }
  })

  const startRotate = useCallback(() => {
    rotationOffset.value = withSequence(
      withTiming(-3, { duration: 100 }),
      withRepeat(withTiming(3, { duration: 200, easing: Easing.out(Easing.ease) }), -1, true)
    )
  }, [rotationOffset])

  const stopRotate = useCallback(() => {
    if (rotationOffset.value === 0) {
      return
    }
    rotationOffset.value = 0
  }, [rotationOffset])

  const restore = useCallback(() => {
    movementOffset.value = {
      x: 0,
      y: 0
    }
  }, [movementOffset])

  const movePrev = useCallback(() => {
    if (index % numColumns === 0) {
      movementOffset.value = {
        x: itemWidth * (numColumns - 1),
        y: -itemHeight
      }
    } else {
      movementOffset.value = {
        x: -itemWidth,
        y: 0
      }
    }
  }, [index, itemWidth, itemHeight, numColumns, movementOffset])

  const moveNext = useCallback(() => {
    if (index % numColumns === numColumns - 1) {
      movementOffset.value = {
        x: -itemWidth * (numColumns - 1),
        y: itemHeight
      }
    } else {
      movementOffset.value = {
        x: itemWidth,
        y: 0
      }
    }
  }, [index, itemWidth, itemHeight, numColumns, movementOffset])

  useEffect(() => {
    if (shouldVibrate === false) {
      return
    }
    if (isEditing === true) {
      setTimeout(startRotate, Math.random() * 300)
    } else {
      stopRotate()
    }
  }, [isEditing, shouldVibrate, startRotate, stopRotate])

  useEffect(() => {
    if (isDraggingItem || !isEditing) {
      return
    }
    switch (animDirection) {
      case MOVEMENT.restore:
        restore()
        break
      case MOVEMENT.next:
        moveNext()
        break
      case MOVEMENT.prev:
        movePrev()
        break
    }
  }, [isDraggingItem, isEditing, animDirection, moveNext, movePrev, restore])

  return {
    movementOffset,
    animatedStyles
  }
}
