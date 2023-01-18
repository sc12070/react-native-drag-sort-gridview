import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Animated, Easing } from 'react-native'

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
  index,
  dragItemOriginIndex,
  dragItemTargetIndex,
  animMoveDuration
}: {
  itemWidth: number
  itemHeight: number
  numColumns: number
  isEditing: boolean
  index: number
  dragItemOriginIndex: number | undefined
  dragItemTargetIndex: number | undefined
  animMoveDuration: number
}) => {
  const isMoved = useRef<boolean>(false)
  const moveXAnimRef = useRef(new Animated.Value(0))
  const moveYAnimRef = useRef(new Animated.Value(0))
  const rotateAnim = useRef(new Animated.Value(0)).current
  const movement = useMemo(() => {
    if (dragItemOriginIndex === undefined || dragItemTargetIndex === undefined) {
      return MOVEMENT.restore
    }
    if (index === dragItemOriginIndex) {
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

  const animRef = useRef(
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 150,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(rotateAnim, {
          toValue: -1,
          duration: 150,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true
        })
      ])
    )
  )

  const restore = useCallback(() => {
    if (isMoved.current === false) {
      return
    }
    isMoved.current = false
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
    ]).start()
  }, [animMoveDuration])

  const movePrev = useCallback(() => {
    isMoved.current = true
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
      ]).start()
    } else {
      Animated.timing(moveXAnimRef.current, {
        toValue: -itemWidth,
        duration: animMoveDuration,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      }).start()
    }
  }, [index, itemWidth, itemHeight, numColumns, animMoveDuration])

  const moveNext = useCallback(() => {
    isMoved.current = true
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
      ]).start()
    } else {
      Animated.timing(moveXAnimRef.current, {
        toValue: itemWidth,
        duration: animMoveDuration,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      }).start()
    }
  }, [index, itemWidth, itemHeight, numColumns, animMoveDuration])

  const startRotate = useCallback(() => {
    animRef.current.reset()
    animRef.current.start()
  }, [])

  const stopRotate = useCallback(() => {
    animRef.current.stop()
  }, [])

  useEffect(() => {
    if (isEditing === true) {
      setTimeout(startRotate, Math.random() * 300)
    } else {
      stopRotate()
      rotateAnim.setValue(0)
    }
  }, [isEditing, rotateAnim, animMoveDuration, startRotate, stopRotate])

  useEffect(() => {
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
  }, [movement, moveNext, movePrev, restore])

  return {
    moveXAnim: moveXAnimRef.current,
    moveYAnim: moveYAnimRef.current,
    rotateAnim,
    startRotate
  }
}
