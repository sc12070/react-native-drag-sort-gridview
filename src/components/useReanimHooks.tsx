import { useCallback, useEffect } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated'

export default ({ isEditing, shouldVibrate }: { isEditing: boolean; shouldVibrate: boolean }) => {
  const rotationOffset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [{ rotateZ: `${rotationOffset.value}deg` }]
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

  return {
    animatedStyles
  }
}
