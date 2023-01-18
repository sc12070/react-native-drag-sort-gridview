import { useMemo, useRef } from 'react'
import { Animated, PanResponder } from 'react-native'

export default ({
  itemWidth,
  itemHeight,
  numColumns,
  index,
  isEditing,
  onStartDrag,
  updateDragToIndex,
  onEndDrag
}: {
  itemWidth: number
  itemHeight: number
  numColumns: number
  index: number
  isEditing: boolean
  onStartDrag: (index: number) => void
  updateDragToIndex: (index: number | undefined) => void
  onEndDrag: (from: number, to: number) => void
}) => {
  const sectionWidth = useMemo(() => itemWidth / 2, [itemWidth])
  const sectionHeight = useMemo(() => itemHeight / 2, [itemHeight])
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
          onEndDrag(index, Math.max(0, toIndexRef.current))
          dragXAnimRef.current.setValue(0)
          dragYAnimRef.current.setValue(0)
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
      onStartDrag,
      updateDragToIndex,
      onEndDrag
    ]
  )

  return {
    panResponder: isEditing ? panResponder : dummyPanResponder,
    dragXAnim: dragXAnimRef.current,
    dragYAnim: dragYAnimRef.current
  }
}
