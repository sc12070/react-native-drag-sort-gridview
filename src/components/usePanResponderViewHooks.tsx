import { useCallback, useMemo, useRef } from 'react'
import { Animated, PanResponder } from 'react-native'

export default ({
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
  lockTouch,
  unlockTouch,
  onStartDrag,
  updateDragToIndex,
  onEndDrag
}: {
  itemWidth: number
  itemHeight: number
  sectionWidth: number
  sectionHeight: number
  numColumns: number
  index: number
  itemLength: number
  isEditing: boolean
  animMoveDuration: number
  shouldAnimOnRelease: boolean
  lockTouch: () => void
  unlockTouch: () => void
  onStartDrag: (index: number) => void
  updateDragToIndex: (index: number | undefined) => void
  onEndDrag: (from: number, to: number) => void
}) => {
  const duration = useMemo(() => animMoveDuration / 3, [animMoveDuration])
  const row = useMemo(() => index % numColumns, [index, numColumns])
  const column = useMemo(() => Math.floor(index / numColumns), [index, numColumns])
  const normaliseXOffset = useMemo(
    () => itemWidth * row + sectionWidth,
    [itemWidth, sectionWidth, row]
  )
  const normaliseYOffset = useMemo(
    () => itemHeight * column + sectionHeight,
    [itemHeight, sectionHeight, column]
  )
  const dummyPanResponder = useMemo(() => ({ panHandlers: {} }), [])

  const dragXAnimRef = useRef(new Animated.Value(0))
  const dragYAnimRef = useRef(new Animated.Value(0))
  const toIndexRef = useRef<number>(index)

  const onPressRelease = useCallback(
    (toIndex: number) => {
      onEndDrag(index, Math.max(0, toIndex))
      dragXAnimRef.current.setValue(0)
      dragYAnimRef.current.setValue(0)
    },
    [index, onEndDrag]
  )

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (_evt, _gestureState) => true,
        onStartShouldSetPanResponderCapture: (_evt, _gestureState) => true,
        onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
        onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => true,
        onPanResponderStart: (_evt, _gestureState) => {
          onStartDrag(index)
        },
        onPanResponderMove: (_evt, gestureState) => {
          const { dx, dy } = gestureState

          const sectionX = Math.floor((normaliseXOffset + dx) / sectionWidth / 2)
          const sectionY = Math.floor((normaliseYOffset + dy) / sectionHeight / 2)
          const newToIndex = sectionY * numColumns + sectionX
          if (newToIndex !== toIndexRef.current) {
            toIndexRef.current = newToIndex
            updateDragToIndex(newToIndex)
          }

          dragXAnimRef.current.setValue(dx)
          dragYAnimRef.current.setValue(dy)
        },
        onPanResponderTerminationRequest: (_evt, _gestureState) => false,
        onPanResponderRelease: (_evt, _gestureState) => {
          const toIndex = Math.min(Math.max(0, toIndexRef.current), itemLength - 1)
          if (shouldAnimOnRelease === false) {
            onPressRelease(toIndex)
            return
          }
          lockTouch()
          Animated.parallel([
            Animated.timing(dragXAnimRef.current, {
              toValue: ((toIndex % 3) - (index % 3)) * itemWidth,
              duration,
              useNativeDriver: true
            }),
            Animated.timing(dragYAnimRef.current, {
              toValue: (Math.floor(toIndex / 3) - Math.floor(index / 3)) * itemHeight,
              duration,
              useNativeDriver: true
            })
          ]).start(() => {
            onPressRelease(toIndex)
            unlockTouch()
          })
        },
        onPanResponderTerminate: (_evt, _gestureState) => {},
        onShouldBlockNativeResponder: (_evt, _gestureState) => {
          return true
        }
      }),
    [
      index,
      normaliseXOffset,
      normaliseYOffset,
      sectionWidth,
      sectionHeight,
      numColumns,
      itemWidth,
      itemHeight,
      itemLength,
      duration,
      shouldAnimOnRelease,
      lockTouch,
      unlockTouch,
      onPressRelease,
      onStartDrag,
      updateDragToIndex
    ]
  )

  return {
    panResponder: isEditing ? panResponder : dummyPanResponder,
    dragXAnim: dragXAnimRef.current,
    dragYAnim: dragYAnimRef.current
  }
}
