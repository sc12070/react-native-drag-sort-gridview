import { useCallback, useMemo, useRef, useState } from 'react'
import update from 'react-addons-update'
import {
  Dimensions,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView
} from 'react-native'
import { MOVEMENT } from './models'

export default <T,>({
  data,
  debounce,
  listWidth,
  propsItemHeight,
  numColumns,
  shouldAnimOnRelease,
  onOrderChanged,
  onMovingStateChanged,
  propsOnLayout,
  propsOnContentSizeChange,
  propsOnScroll
}: {
  data: Array<T>
  debounce?: number | undefined
  listWidth: number | undefined
  propsItemHeight?: number | undefined
  numColumns: number | undefined
  shouldAnimOnRelease: boolean
  onOrderChanged: (orderedData: Array<T>, from: number, to: number) => void
  onMovingStateChanged?: (isMoving: boolean) => void
  propsOnLayout?: (event: LayoutChangeEvent) => void
  propsOnContentSizeChange?: (w: number, h: number) => void
  propsOnScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}) => {
  const [isLock, setIsLock] = useState<boolean>(false)
  const [isEnableScroll, setIsEnableScroll] = useState<boolean>(true)
  const [dragIndex, setDragIndex] = useState<number | undefined>(undefined)
  const [dragToIndex, setDragToIndex] = useState<number | undefined>(undefined)
  const count = useMemo<number>(() => data.length, [data])
  const isDragging = useMemo<boolean>(() => dragIndex !== undefined, [dragIndex])
  const animDirectionArray = useMemo<Array<MOVEMENT>>(() => {
    return new Array(count).fill(0).map((_, index: number) => {
      if (dragIndex === index) {
        return MOVEMENT.dragging
      }
      if (dragIndex === undefined || dragToIndex === undefined) {
        return MOVEMENT.restore
      }
      if (dragToIndex < dragIndex) {
        // drag to prev
        if (index > dragIndex) {
          return MOVEMENT.restore
        }
        if (index >= dragToIndex) {
          return MOVEMENT.next
        }
      } else if (dragToIndex > dragIndex) {
        // drag to next
        if (index < dragIndex) {
          return MOVEMENT.restore
        }
        if (index <= dragToIndex) {
          return MOVEMENT.prev
        }
      }
      return MOVEMENT.restore
    })
  }, [count, dragIndex, dragToIndex])

  const itemWidth = useMemo(
    () => Math.floor(listWidth || Dimensions.get('screen').width) / (numColumns || 1),
    [listWidth, numColumns]
  )
  const itemHeight = useMemo(() => propsItemHeight || itemWidth, [propsItemHeight, itemWidth])
  const sectionWidth = useMemo(() => itemWidth / 2, [itemWidth])
  const sectionHeight = useMemo(() => itemHeight / 2, [itemHeight])

  const listRef = useRef<ScrollView>(null)
  const listLayoutRef = useRef<LayoutRectangle>()
  const listContentHeightRef = useRef<number>()
  const listOffsetYRef = useRef<number>()

  const debounceTimerRef = useRef<number | NodeJS.Timeout | undefined>()
  const animatingCount = useRef<number>(0)
  const pendingFrom = useRef<number | undefined>()
  const pendingTo = useRef<number | undefined>()

  const changeOrder = useCallback(
    (from: number, to: number) => {
      setIsEnableScroll(true)
      setDragIndex(undefined)
      setDragToIndex(undefined)
      if (from === to) {
        return
      }
      const temp = data[from]
      const orderedData = update(data, {
        $splice: [
          [from, 1],
          [to, 0, temp]
        ]
      })
      onOrderChanged(orderedData, from, to)
    },
    [data, onOrderChanged]
  )

  const startAnim = useCallback(() => {
    if (shouldAnimOnRelease === false) {
      return
    }
    if (animatingCount.current === 0) {
      setIsLock(true)
      onMovingStateChanged && onMovingStateChanged(true)
    }
    animatingCount.current += 1
  }, [shouldAnimOnRelease, onMovingStateChanged])

  const endAnim = useCallback(() => {
    if (shouldAnimOnRelease === false) {
      return
    }
    animatingCount.current -= 1
    if (animatingCount.current === 0) {
      setIsLock(false)
      onMovingStateChanged && onMovingStateChanged(false)
      if (pendingFrom.current !== undefined && pendingTo.current !== undefined) {
        changeOrder(pendingFrom.current, pendingTo.current)
        pendingFrom.current = undefined
        pendingTo.current = undefined
      }
    }
  }, [shouldAnimOnRelease, changeOrder, onMovingStateChanged])

  const onStartDrag = useCallback((index: number) => {
    setIsEnableScroll(false)
    setDragIndex(index)
  }, [])

  const updateDragToIndex = useCallback(
    (index: number | undefined) => {
      if (debounce === undefined) {
        setDragToIndex(index)
        return
      }
      if (debounceTimerRef.current !== undefined) {
        clearTimeout(debounceTimerRef.current)
      }
      debounceTimerRef.current = setTimeout(() => {
        setDragToIndex(index)
      }, debounce)
    },
    [debounce]
  )

  const onEndDrag = useCallback(
    (from: number, to: number) => {
      if (shouldAnimOnRelease === true && animatingCount.current > 0) {
        pendingFrom.current = from
        pendingTo.current = to
        return
      } else {
        changeOrder(from, to)
      }
    },
    [shouldAnimOnRelease, changeOrder]
  )

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      propsOnLayout && propsOnLayout(event)
      requestAnimationFrame(() =>
        // @ts-ignore
        listRef?.current?.measureInWindow((x, y, width, height) => {
          listLayoutRef.current = {
            width,
            height,
            x,
            y
          }
        })
      )
    },
    [propsOnLayout]
  )

  const onContentSizeChange = useCallback(
    (w: number, h: number) => {
      listContentHeightRef.current = h
      propsOnContentSizeChange && propsOnContentSizeChange(w, h)
    },
    [propsOnContentSizeChange]
  )

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      listOffsetYRef.current = event.nativeEvent.contentOffset.y
      propsOnScroll && propsOnScroll(event)
    },
    [propsOnScroll]
  )

  return {
    isLock,
    isDragging,
    count,
    animDirectionArray,
    isEnableScroll,
    itemWidth,
    itemHeight,
    sectionWidth,
    sectionHeight,
    listRef,
    listLayoutRef,
    listContentHeightRef,
    listOffsetYRef,
    onLayout,
    onContentSizeChange,
    onScroll,
    startAnim,
    endAnim,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  }
}
