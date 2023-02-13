import { useCallback, useMemo, useState } from 'react'
import { Dimensions } from 'react-native'
import { IItem } from './modal'

export default () => {
  const [data, setData] = useState<Array<IItem>>([
    { id: 0, color: '#FF0000' },
    { id: 1, color: '#00FF00' },
    { id: 2, color: '#0000FF' },
    { id: 3, color: '#FFFF00' },
    { id: 4, color: '#00FFFF' },
    { id: 5, color: '#FF00FF' },
    { id: 6, color: '#DDDDDD' },
    { id: 7, color: '#888888' },
    { id: 8, color: '#555555' }
  ])

  const [itemWidth, setItemWidth] = useState<number>(100)

  const noColums = useMemo(
    () => Math.floor(Dimensions.get('window').width / itemWidth),
    [itemWidth]
  )

  const itemHeight = useMemo(() => itemWidth + 20, [itemWidth]) // 20 stand for 10 top & 10 bottom padding from styles.itemContainer

  const plusItemWidth = useCallback(() => setItemWidth(itemWidth + 10), [itemWidth])

  const minusItemWidth = useCallback(() => setItemWidth(itemWidth - 10), [itemWidth])

  const onOrderChanged = useCallback((orderedData: Array<IItem>) => setData(orderedData), [])

  return {
    data,
    noColums,
    itemWidth,
    itemHeight,
    plusItemWidth,
    minusItemWidth,
    onOrderChanged
  }
}
