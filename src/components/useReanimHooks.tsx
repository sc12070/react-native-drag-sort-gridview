import { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated'

enum MOVEMENT {
  restore,
  prev,
  next
}

export default ({
  itemWidth,
  itemHeight,
  numColumns,
  isEditing,
  isDragging,
  index,
  dragItemOriginIndex,
  dragItemTargetIndex,
  animMoveDuration
}: {
  itemWidth: number
  itemHeight: number
  numColumns: number
  isEditing: boolean
  isDragging: boolean
  index: number
  dragItemOriginIndex: number | undefined
  dragItemTargetIndex: number | undefined
  animMoveDuration: number
}) => {
  const isMoved = useRef<boolean>(false)

  const movementOffset = useSharedValue({ x: 0, y: 0 })
  const rotationOffset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [
        {
          translateX: isDragging
            ? movementOffset.value.x
            : withTiming(movementOffset.value.x, {
                duration: animMoveDuration,
                easing: Easing.out(Easing.exp)
              })
        },
        {
          translateY: isDragging
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

  const movement = useMemo(() => {
    if (dragItemOriginIndex === undefined || dragItemTargetIndex === undefined) {
      return MOVEMENT.restore
    }
    if (dragItemTargetIndex < dragItemOriginIndex) {
      // drag to prev
      if (index > dragItemOriginIndex) {
        return MOVEMENT.restore
      }
      if (index >= dragItemTargetIndex) {
        return MOVEMENT.next
      }
    } else if (dragItemTargetIndex > dragItemOriginIndex) {
      // drag to next
      if (index < dragItemOriginIndex) {
        return MOVEMENT.restore
      }
      if (index <= dragItemTargetIndex) {
        return MOVEMENT.prev
      }
    }
    return MOVEMENT.restore
  }, [index, dragItemOriginIndex, dragItemTargetIndex])

  const restore = useCallback(() => {
    if (isMoved.current === false) {
      return
    }
    isMoved.current = false
    movementOffset.value = {
      x: 0,
      y: 0
    }
  }, [movementOffset])

  const movePrev = useCallback(() => {
    isMoved.current = true
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
    isMoved.current = true
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
    if (isEditing === true) {
      setTimeout(startRotate, Math.random() * 300)
    } else {
      stopRotate()
    }
  }, [isEditing, movementOffset, startRotate, stopRotate])

  useEffect(() => {
    if (isDragging || !isEditing) {
      return
    }
    switch (movement) {
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
  }, [isDragging, isEditing, movement, moveNext, movePrev, restore])

  return {
    movementOffset,
    animatedStyles
  }
}
