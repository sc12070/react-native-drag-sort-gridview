import { useCallback, useMemo, useState } from 'react'
import { Dimensions } from 'react-native'
import { IItem } from './modal'

const screenWidth = Dimensions.get('window').width

const minimunPadding = 20

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

  const [componentSize, setComponentSize] = useState<number>(80)

  const itemSize = useMemo(() => componentSize + minimunPadding, [componentSize])

  const noColums = useMemo(() => Math.floor(screenWidth / itemSize), [itemSize])

  /*
   * user may scroll the list on space created by padding during editing
   */
  const paddingVertical = useMemo(() => minimunPadding / 2, [])

  const paddingHorizontal = useMemo(
    () => Math.floor((screenWidth / noColums - componentSize) / 2),
    [componentSize, noColums]
  )

  const plusWidth = useCallback(() => setComponentSize(componentSize + 10), [componentSize])

  const minusWidth = useCallback(() => setComponentSize(componentSize - 10), [componentSize])

  const onOrderChanged = useCallback((orderedData: Array<IItem>) => setData(orderedData), [])

  return {
    data,
    noColums,
    componentSize,
    itemSize,
    paddingVertical,
    paddingHorizontal,
    plusWidth,
    minusWidth,
    onOrderChanged
  }
}
