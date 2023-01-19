import React from 'react'
import { FlatList, FlatListProps, ListRenderItemInfo, ViewStyle } from 'react-native'
import DraggableItem from './components/DraggableItem'
import styles from './styles'
import useDraggableGridViewHooks from './useDraggableGridViewHooks'

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
    renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement | null
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
    itemHeight: propsItemHeight,
    numColumns,
    animMoveDuration,
    debounce,
    onOrderChanged
  } = props

  const {
    dragIndex,
    dragToIndex,
    isEnableScroll,
    itemWidth,
    itemHeight,
    sectionWidth,
    sectionHeight,
    onStartDrag,
    updateDragToIndex,
    onEndDrag
  } = useDraggableGridViewHooks({
    data,
    listWidth,
    propsItemHeight,
    numColumns,
    debounce,
    onOrderChanged
  })

  const renderItem = (info: ListRenderItemInfo<T>) => (
    <DraggableItem
      style={itemContainerStyle}
      itemWidth={itemWidth}
      itemHeight={itemHeight}
      sectionWidth={sectionWidth}
      sectionHeight={sectionHeight}
      numColumns={numColumns || 1}
      dragItemOriginIndex={dragIndex}
      dragItemTargetIndex={dragToIndex}
      index={info.index}
      isEditing={isEditing}
      shouldVibrate={shouldVibrate}
      animMoveDuration={animMoveDuration || 1000}
      onStartDrag={onStartDrag}
      updateDragToIndex={updateDragToIndex}
      onEndDrag={onEndDrag}>
      <>{props.renderItem(info)}</>
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
