import { useCallback, useMemo, useState } from 'react'
import { Dimensions } from 'react-native'
import { componentWidth } from './constants'
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

  const itemWidth = useMemo(() => componentWidth + 20, []) // 20 stand for 10 top & 10 bottom padding from styles.itemContainer

  const noColums = useMemo(
    () => Math.floor(Dimensions.get('window').width / itemWidth),
    [itemWidth]
  )

  const itemHeight = useMemo(() => itemWidth, [itemWidth])

  const onOrderChanged = useCallback((orderedData: Array<IItem>) => setData(orderedData), [])

  return {
    data,
    noColums,
    itemHeight,
    onOrderChanged
  }
}
