import { useCallback, useMemo, useRef, useState } from 'react'
import update from 'react-addons-update'
import { Dimensions } from 'react-native'

export default <T,>({
  data,
  debounce,
  listWidth,
  numColumns,
  onOrderChanged
}: {
  data: Array<T>
  debounce?: number | undefined
  listWidth: number | undefined
  numColumns: number | undefined
  onOrderChanged: (orderedData: Array<T>, from: number, to: number) => void
}) => {
  const [isEnableScroll, setIsEnableScroll] = useState<boolean>(true)
  const [dragIndex, setDragIndex] = useState<number | undefined>(undefined)
  const [dragToIndex, setDragToIndex] = useState<number | undefined>(undefined)

  const timerRef = useRef<number | undefined>()

  const itemWidth = useMemo(
    () => (listWidth || Dimensions.get('screen').width) / (numColumns || 1),
    [listWidth, numColumns]
  )

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
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        setDragToIndex(index)
      }, debounce)
    },
    [debounce]
  )

  const onEndDrag = useCallback(
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

  return {
    dragIndex,
    dragToIndex,
    isEnableScroll,
    itemWidth,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  }
}
