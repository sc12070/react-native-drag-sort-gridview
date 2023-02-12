import { MOVEMENT } from '../models'
import { useCallback, useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'

export default ({
  itemWidth,
  itemHeight,
  numColumns,
  isEditing,
  isDragging,
  isDraggingItem,
  index,
  animDirection,
  animMoveDuration,
  startAnim,
  endAnim
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
  startAnim: () => void
  endAnim: () => void
}) => {
  const isMoved = useRef<boolean>(false)
  const moveXAnimRef = useRef(new Animated.Value(0))
  const moveYAnimRef = useRef(new Animated.Value(0))

  const restore = useCallback(() => {
    if (isMoved.current === false) {
      return
    }
    isMoved.current = false
    startAnim()
    Animated.parallel([
      Animated.timing(moveXAnimRef.current, {
        toValue: 0,
        duration: animMoveDuration,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      }),
      Animated.timing(moveYAnimRef.current, {
        toValue: 0,
        duration: animMoveDuration,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      })
    ]).start(endAnim)
  }, [animMoveDuration, startAnim, endAnim])

  const movePrev = useCallback(() => {
    isMoved.current = true
    startAnim()
    if (index % numColumns === 0) {
      Animated.parallel([
        Animated.timing(moveXAnimRef.current, {
          toValue: itemWidth * (numColumns - 1),
          duration: animMoveDuration,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease)
        }),
        Animated.timing(moveYAnimRef.current, {
          toValue: -itemHeight,
          duration: animMoveDuration,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease)
        })
      ]).start(endAnim)
    } else {
      Animated.timing(moveXAnimRef.current, {
        toValue: -itemWidth,
        duration: animMoveDuration,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      }).start(endAnim)
    }
  }, [index, itemWidth, itemHeight, numColumns, animMoveDuration, startAnim, endAnim])

  const moveNext = useCallback(() => {
    isMoved.current = true
    startAnim()
    if (index % numColumns === numColumns - 1) {
      Animated.parallel([
        Animated.timing(moveXAnimRef.current, {
          toValue: -itemWidth * (numColumns - 1),
          duration: animMoveDuration,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease)
        }),
        Animated.timing(moveYAnimRef.current, {
          toValue: itemHeight,
          duration: animMoveDuration,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease)
        })
      ]).start(endAnim)
    } else {
      Animated.timing(moveXAnimRef.current, {
        toValue: itemWidth,
        duration: animMoveDuration,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease)
      }).start(endAnim)
    }
  }, [index, itemWidth, itemHeight, numColumns, animMoveDuration, startAnim, endAnim])

  useEffect(() => {
    if (!isDragging) {
      moveXAnimRef.current.setValue(0)
      moveYAnimRef.current.setValue(0)
      return
    }
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
  }, [isDragging, isDraggingItem, isEditing, animDirection, moveNext, movePrev, restore])

  return {
    moveXAnim: moveXAnimRef.current,
    moveYAnim: moveYAnimRef.current
  }
}
