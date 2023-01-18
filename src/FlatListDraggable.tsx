import React from 'react'
import { FlatList, FlatListProps, ViewStyle } from 'react-native'
import DraggableItem from './components/DraggableItem'
import styles from './styles'
import useFlatListDraggableHooks from './useFlatListDraggableHooks'

const DragSortGridview = <T,>(
  props: FlatListProps<T> & {
    data: Array<T>
    listWidth?: number
    itemHeight?: number
    isEditing: boolean
    itemContainerStyle: ViewStyle
    animMoveDuration?: number
    debounce?: number | undefined
    renderItem: ({ item, index }: { item: T; index: number }) => JSX.Element
    onOrderChanged: (orderedData: Array<T>, from: number, to: number) => void
  }
) => {
  const {
    style,
    data,
    isEditing,
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

  const renderItem = ({ item, index }: { item: T; index: number }) => (
    <DraggableItem
      style={itemContainerStyle}
      itemWidth={itemWidth}
      itemHeight={itemHeight || itemWidth}
      numColumns={numColumns || 1}
      dragItemOriginIndex={dragIndex}
      dragItemTargetIndex={dragToIndex}
      index={index}
      isEditing={isEditing}
      animMoveDuration={animMoveDuration || 1000}
      onStartDrag={onStartDrag}
      updateDragToIndex={updateDragToIndex}
      onEndDrag={onEndDrag}>
      {props.renderItem({ item, index })}
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

export default DragSortGridview
