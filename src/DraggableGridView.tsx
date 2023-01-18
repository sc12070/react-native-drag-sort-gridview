import React from 'react'
import { FlatList, FlatListProps, ViewStyle } from 'react-native'
import DraggableItem from './components/DraggableItem'
import styles from './styles'
import useFlatListDraggableHooks from './useFlatListDraggableHooks'

const DraggableGridView = <T,>(
  props: FlatListProps<T> & {
    data: Array<T>
    listWidth?: number
    itemHeight?: number
    isEditing: boolean
    shouldVibrate?: boolean
    itemContainerStyle?: ViewStyle
    animMoveDuration?: number
    debounce?: number | undefined
    renderItem: ({
      item,
      index,
      separators
    }: {
      item: T
      index: number
      separators: {
        highlight: () => void
        unhighlight: () => void
        updateProps: (select: 'leading' | 'trailing', newProps: any) => void
      }
    }) => JSX.Element
    onOrderChanged: (orderedData: Array<T>, from: number, to: number) => void
  }
) => {
  const {
    style,
    data,
    isEditing,
    shouldVibrate = true,
    itemContainerStyle,
    listWidth,
    numColumns,
    itemHeight,
    animMoveDuration,
    debounce,
    onOrderChanged
  } = props

  const {
    dragIndex,
    dragToIndex,
    isEnableScroll,
    itemWidth,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  } = useFlatListDraggableHooks({ data, listWidth, numColumns, debounce, onOrderChanged })

  const renderItem = ({
    item,
    index,
    separators
  }: {
    item: T
    index: number
    separators: {
      highlight: () => void
      unhighlight: () => void
      updateProps: (select: 'leading' | 'trailing', newProps: any) => void
    }
  }) => (
    <DraggableItem
      style={itemContainerStyle}
      itemWidth={itemWidth}
      itemHeight={itemHeight || itemWidth}
      numColumns={numColumns || 1}
      dragItemOriginIndex={dragIndex}
      dragItemTargetIndex={dragToIndex}
      index={index}
      isEditing={isEditing}
      shouldVibrate={shouldVibrate}
      animMoveDuration={animMoveDuration || 1000}
      onStartDrag={onStartDrag}
      updateDragToIndex={updateDragToIndex}
      onEndDrag={onEndDrag}>
      {props.renderItem({ item, index, separators })}
    </DraggableItem>
  )

  return (
    <FlatList
      {...props}
      style={[styles.list, style, { width: listWidth }]}
      scrollEnabled={isEnableScroll}
      renderItem={renderItem}
    />
  )
}

export default DraggableGridView
